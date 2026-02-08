-- CreateTable
CREATE TABLE "AgentMetrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAgents" INTEGER NOT NULL,
    "activeAgents" INTEGER NOT NULL,
    "idleAgents" INTEGER NOT NULL,
    "blockedAgents" INTEGER NOT NULL,
    "completedAgents" INTEGER NOT NULL,
    "errorAgents" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "AgentMetrics_timestamp_idx" ON "AgentMetrics"("timestamp");
