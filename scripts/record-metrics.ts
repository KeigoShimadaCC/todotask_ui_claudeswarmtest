#!/usr/bin/env ts-node

/**
 * Record Agent Metrics Script
 * 
 * This script records a snapshot of current agent metrics to the database.
 * Run this periodically (e.g., every 5-15 minutes via cron job) to build
 * trend data over time.
 * 
 * Usage:
 *   npx ts-node scripts/record-metrics.ts
 *   npm run record-metrics
 * 
 * Example cron job (every 15 minutes):
 *   *\/15 * * * * cd /path/to/app && npm run record-metrics
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function recordMetrics() {
  console.log('📊 Recording agent metrics snapshot...');
  
  try {
    // Get current agent statistics
    const agents = await prisma.agent.findMany({
      select: { status: true }
    });
    
    const stats = {
      totalAgents: agents.length,
      activeAgents: agents.filter(a => a.status === 'working').length,
      idleAgents: agents.filter(a => a.status === 'idle').length,
      blockedAgents: agents.filter(a => a.status === 'blocked').length,
      completedAgents: agents.filter(a => a.status === 'completed').length,
      errorAgents: agents.filter(a => a.status === 'error').length,
    };
    
    console.log('   Current statistics:');
    console.log(`   - Total: ${stats.totalAgents}`);
    console.log(`   - Active: ${stats.activeAgents}`);
    console.log(`   - Idle: ${stats.idleAgents}`);
    console.log(`   - Blocked: ${stats.blockedAgents}`);
    console.log(`   - Completed: ${stats.completedAgents}`);
    console.log(`   - Error: ${stats.errorAgents}`);
    
    // Create metrics snapshot
    const metric = await prisma.agentMetrics.create({
      data: stats
    });
    
    console.log(`\n✅ Metrics recorded successfully at ${metric.timestamp.toISOString()}`);
    
    // Clean up old metrics (older than 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const deleted = await prisma.agentMetrics.deleteMany({
      where: {
        timestamp: { lt: thirtyDaysAgo }
      }
    });
    
    if (deleted.count > 0) {
      console.log(`   Cleaned up ${deleted.count} old metric record(s)`);
    }
    
  } catch (error) {
    console.error('❌ Error recording metrics:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the recording
recordMetrics()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
