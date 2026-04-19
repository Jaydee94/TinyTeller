#!/usr/bin/env bash
set -euo pipefail

# Create Paperclip issues from plans/tasks/*.md
# Usage:
#   DRY_RUN=true ./plans/create_paperclip_issues.sh   # prints payloads but does not POST
#   DRY_RUN=false ./plans/create_paperclip_issues.sh  # actually creates issues (requires PAPERCLIP_API_KEY)

API_URL=${PAPERCLIP_API_URL:-http://localhost:3100}
API_KEY=${PAPERCLIP_API_KEY:-}
RUN_ID=${PAPERCLIP_RUN_ID:-}
COMPANY_ID=${PAPERCLIP_COMPANY_ID:-}
AGENT_ID=${PAPERCLIP_AGENT_ID:-}

DRY_RUN=${DRY_RUN:-true}

if [ -z "$COMPANY_ID" ] || [ -z "$AGENT_ID" ]; then
  echo "ERROR: PAPERCLIP_COMPANY_ID and PAPERCLIP_AGENT_ID must be set in the environment"
  exit 1
fi

echo "Paperclip API URL: $API_URL"
echo "Dry run: $DRY_RUN"

for md in plans/tasks/*.md; do
  title=$(head -n1 "$md" | sed 's/^#\+//; s/^\s*//')
  body=$(sed -n '1,$p' "$md")

  payload=$(jq -n --arg t "$title" --arg b "$body" --arg cid "$COMPANY_ID" --arg aid "$AGENT_ID" '{title: $t, description: $b, companyId: $cid, assigneeAgentId: $aid, runId: env.RUN_ID}')

  if [ "$DRY_RUN" = "true" ]; then
    echo "---\nWould POST to $API_URL/api/issues with payload:\n$payload\n"
  else
    if [ -z "$API_KEY" ]; then
      echo "ERROR: PAPERCLIP_API_KEY must be set to create issues"
      exit 1
    fi
    echo "Creating issue: $title"
    resp=$(curl -s -X POST "$API_URL/api/issues" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $API_KEY" \
      -d "$payload")
    echo "Response: $resp"
  fi
done

echo "Done"
