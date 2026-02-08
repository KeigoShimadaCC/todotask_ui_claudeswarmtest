import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const apiKey = req.headers.get('x-api-key');
    const { description, priority = 'medium' } = await req.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required' },
        { status: 401 }
      );
    }
    
    // Verify agent
    const agent = await prisma.agent.findFirst({
      where: { id: params.agentId, apiKey },
    });
    
    if (!agent) {
      return NextResponse.json(
        { error: 'Invalid agent ID or API key' },
        { status: 403 }
      );
    }
    
    const task = await prisma.task.create({
      data: {
        agentId: params.agentId,
        description,
        priority,
        status: 'pending',
      },
    });
    
    await prisma.activityLog.create({
      data: {
        agentId: params.agentId,
        type: 'task_created',
        message: `Task created: ${description}`,
      },
    });
    
    return NextResponse.json({ task });
  } catch (error) {
    console.error('Task creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
