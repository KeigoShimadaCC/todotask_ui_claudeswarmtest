import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, type } = await req.json();
    
    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }
    
    const apiKey = randomBytes(32).toString('hex');
    
    const agent = await prisma.agent.create({
      data: { 
        name, 
        type, 
        status: 'idle', 
        apiKey 
      },
    });
    
    // Log registration
    await prisma.activityLog.create({
      data: {
        agentId: agent.id,
        type: 'registration',
        message: `Agent ${name} registered`,
      },
    });
    
    return NextResponse.json({
      agentId: agent.id,
      apiKey: agent.apiKey,
      message: 'Agent registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
