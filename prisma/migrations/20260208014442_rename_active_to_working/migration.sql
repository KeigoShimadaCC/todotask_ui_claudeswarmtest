/*
  Warnings:

  - You are about to drop the column `activeAgents` on the `AgentMetrics` table. All the data in the column will be lost.
  - Added the required column `workingAgents` to the `AgentMetrics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgentMetrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAgents" INTEGER NOT NULL,
    "workingAgents" INTEGER NOT NULL,
    "idleAgents" INTEGER NOT NULL,
    "blockedAgents" INTEGER NOT NULL,
    "completedAgents" INTEGER NOT NULL,
    "errorAgents" INTEGER NOT NULL
);
INSERT INTO "new_AgentMetrics" ("blockedAgents", "completedAgents", "errorAgents", "id", "idleAgents", "timestamp", "totalAgents") SELECT "blockedAgents", "completedAgents", "errorAgents", "id", "idleAgents", "timestamp", "totalAgents" FROM "AgentMetrics";
DROP TABLE "AgentMetrics";
ALTER TABLE "new_AgentMetrics" RENAME TO "AgentMetrics";
CREATE INDEX "AgentMetrics_timestamp_idx" ON "AgentMetrics"("timestamp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
