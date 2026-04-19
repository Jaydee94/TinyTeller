#!/usr/bin/env bash
# Push the current HEAD to the remote repository using GH_TOKEN for auth.
# Usage: ./scripts/push-with-token.sh <branch-name>
set -euo pipefail

if [ -z "${GH_TOKEN:-}" ]; then
  echo "ERROR: GH_TOKEN is not set. Export the PAT as GH_TOKEN and retry."
  exit 2
fi

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <target-branch>" >&2
  exit 2
fi

TARGET_BRANCH="$1"

REMOTE_URL="https://github.com/Jaydee94/TinyTeller.git"

echo "Creating local branch: $TARGET_BRANCH"
git checkout -b "$TARGET_BRANCH"

echo "Pushing to remote using GH_TOKEN..."
# Use token in the remote URL for this push only (does not permanently rewrite .git/config)
PUSH_URL="https://${GH_TOKEN}@${REMOTE_URL#https://}"
git push "$PUSH_URL" HEAD:refs/heads/"$TARGET_BRANCH" -u

echo "Push complete: branch $TARGET_BRANCH updated on remote."
