#!/usr/bin/env bash
# Simple script to verify GH_TOKEN is present and valid by calling GitHub API
set -euo pipefail

if [ -z "${GH_TOKEN:-}" ]; then
  echo "ERROR: GH_TOKEN is not set. Export the PAT as GH_TOKEN and retry."
  exit 2
fi

echo "Checking GH_TOKEN by querying the authenticated user..."
resp=$(curl -sS -H "Authorization: token ${GH_TOKEN}" -H "User-Agent: TinyTeller-Agent" https://api.github.com/user)
if echo "$resp" | grep -q 'login'; then
  echo "GH_TOKEN looks valid. Authenticated as: $(echo "$resp" | grep -m1 'login' | sed -E "s/\s*\"login\": \"([^"]+)\",?/\1/")"
  exit 0
fi

echo "Failed to validate GH_TOKEN. GitHub response:" >&2
echo "$resp" >&2
exit 3
