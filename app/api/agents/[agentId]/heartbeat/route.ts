import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const apiKey = req.headers.get('x-api-key');
    const { status, currentTask, progress } = await req.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required' },
        { status: 401 }
      );
    }
    
    // Verify agent exists and API key matches
    const agent = await prisma.agent.findFirst({
      where: { 
        id: params.agentId, 
        apiKey: apiKey 
      },
    });
    
    if (!agent) {
      return NextResponse.json(
        { error: 'Invalid agent ID or API key' },
        { status: 403 }
      );
    }
    
    // Update agent
    await prisma.agent.update({
      where: { id: params.agentId },
      data: {
        lastHeartbeat: new Date(),
        ...(status && { status }),
        ...(currentTask !== undefined && { currentTask }),
        ...(progress !== undefined && { progress }),
      },
    });
    
    // Log activity if status or task changed
    if (status || currentTask) {
      await prisma.activityLog.create({
        data: {
          agentId: params.agentId,
          type: status === 'completed' ? 'completion' : 'update',
          message: currentTask || `Status changed to ${status}`,
        },
      });
    }
    
    return NextResponse.json({ 
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Heartbeat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
