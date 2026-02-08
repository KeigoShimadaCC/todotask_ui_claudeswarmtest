#!/usr/bin/env ts-node

/**
 * Check Stale Agents Script
 * 
 * This script identifies agents that have stopped sending heartbeats
 * and marks them as stale. Run this periodically (e.g., via cron job)
 * to keep agent statuses accurate.
 * 
 * Usage:
 *   npx ts-node scripts/check-stale-agents.ts
 *   npm run check-stale-agents
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

// Initialize Prisma Client with SQLite adapter
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL?.replace('file:', '') || './dev.db',
});

const prisma = new PrismaClient({
  adapter,
});

// Configurable timeout in milliseconds (default: 2 minutes)
const STALE_TIMEOUT_MS = parseInt(process.env.AGENT_STALE_TIMEOUT || '120000', 10);

async function checkStaleAgents() {
  const now = new Date();
  const staleThreshold = new Date(now.getTime() - STALE_TIMEOUT_MS);
  
  console.log(`🔍 Checking for stale agents...`);
  console.log(`   Current time: ${now.toISOString()}`);
  console.log(`   Stale threshold: ${staleThreshold.toISOString()}`);
  console.log(`   Timeout: ${STALE_TIMEOUT_MS / 1000}s\n`);
  
  try {
    // Find agents that are working or blocked but haven't sent heartbeat recently
    const staleAgents = await prisma.agent.findMany({
      where: {
        status: { in: ['working', 'blocked'] },
        lastHeartbeat: { lt: staleThreshold }
      },
      select: {
        id: true,
        name: true,
        status: true,
        lastHeartbeat: true,
        currentTask: true,
      }
    });
    
    if (staleAgents.length === 0) {
      console.log('✅ No stale agents found. All agents are healthy!');
      return;
    }
    
    console.log(`⚠️  Found ${staleAgents.length} stale agent(s):\n`);
    
    // Display stale agents
    for (const agent of staleAgents) {
      const timeSinceHeartbeat = Math.floor((now.getTime() - agent.lastHeartbeat.getTime()) / 1000);
      console.log(`   • ${agent.name} (${agent.id})`);
      console.log(`     Status: ${agent.status}`);
      console.log(`     Current task: ${agent.currentTask || 'None'}`);
      console.log(`     Last heartbeat: ${agent.lastHeartbeat.toISOString()}`);
      console.log(`     Time since: ${timeSinceHeartbeat}s ago\n`);
    }
    
    // Update stale agents to 'error' status
    const result = await prisma.agent.updateMany({
      where: {
        id: { in: staleAgents.map(a => a.id) }
      },
      data: {
        status: 'error',
        currentTask: null,
      }
    });
    
    console.log(`✓ Updated ${result.count} agent(s) to 'error' status`);
    
    // Log the state change in activity log
    for (const agent of staleAgents) {
      await prisma.activityLog.create({
        data: {
          agentId: agent.id,
          type: 'error',
          message: `Agent marked as stale (no heartbeat for ${STALE_TIMEOUT_MS / 1000}s)`,
        }
      });
    }
    
    console.log('✓ Activity logs created for stale agents');
    
  } catch (error) {
    console.error('❌ Error checking stale agents:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkStaleAgents()
  .then(() => {
    console.log('\n✅ Stale agent check completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
