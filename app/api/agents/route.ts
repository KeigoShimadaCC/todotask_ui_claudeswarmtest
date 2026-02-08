import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: {
        tasks: { 
          orderBy: { startedAt: 'desc' }, 
          take: 5 
        },
        logs: { 
          orderBy: { timestamp: 'desc' }, 
          take: 10 
        },
      },
      orderBy: { lastHeartbeat: 'desc' },
    });
    
    // Calculate summary statistics
    const stats = {
      total: agents.length,
      active: agents.filter(a => a.status === 'working').length,
      idle: agents.filter(a => a.status === 'idle').length,
      blocked: agents.filter(a => a.status === 'blocked').length,
      completed: agents.filter(a => a.status === 'completed').length,
      error: agents.filter(a => a.status === 'error').length,
    };
    
    return NextResponse.json({ 
      agents,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Fetch agents error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
