import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/metrics/agent-trends
 * Fetch historical agent count trends
 * Query params:
 *   - hours: number of hours to look back (default: 24)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = parseInt(searchParams.get('hours') || '24', 10);
    
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const metrics = await prisma.agentMetrics.findMany({
      where: {
        timestamp: { gte: startTime }
      },
      orderBy: { timestamp: 'asc' }
    });
    
    return NextResponse.json({
      metrics,
      timeRange: {
        start: startTime.toISOString(),
        end: new Date().toISOString(),
        hours
      }
    });
  } catch (error) {
    console.error('Fetch agent trends error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/metrics/agent-trends
 * Record current agent metrics snapshot
 */
export async function POST() {
  try {
    // Get current agent statistics
    const agents = await prisma.agent.findMany({
      select: { status: true }
    });
    
    const stats = {
      totalAgents: agents.length,
      workingAgents: agents.filter(a => a.status === 'working').length,
      idleAgents: agents.filter(a => a.status === 'idle').length,
      blockedAgents: agents.filter(a => a.status === 'blocked').length,
      completedAgents: agents.filter(a => a.status === 'completed').length,
      errorAgents: agents.filter(a => a.status === 'error').length,
    };
    
    // Create metrics snapshot
    const metric = await prisma.agentMetrics.create({
      data: stats
    });
    
    return NextResponse.json({
      success: true,
      metric
    });
  } catch (error) {
    console.error('Record agent metrics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
