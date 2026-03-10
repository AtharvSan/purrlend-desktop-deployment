#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Purr Points — Manual Snapshot Runner
# Usage: ./scripts/run-snapshot.sh
# Or add to crontab: 0 * * * * /path/to/purrlend/scripts/run-snapshot.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

# Change to project directory (update this path after deploying)
cd /home/purrlend/app

# Load environment variables
source .env.local

# Run the snapshot via API
curl -X POST \
  -H "x-cron-secret: $CRON_SECRET" \
  https://purrlend.com/api/points/snapshot \
  -w "\nStatus: %{http_code}\n" \
  >> /var/log/purr-points.log 2>&1

echo "Snapshot completed at $(date)" >> /var/log/purr-points.log