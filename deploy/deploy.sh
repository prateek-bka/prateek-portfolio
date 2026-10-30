#!/usr/bin/env bash
# Runs on tara. The GitHub deploy key for this repo is locked (authorized_keys
# command=) to this script only, so the workflow can't do anything else on the VM.
# Usage: deploy.sh <commit-sha>   (sha arrives via SSH_ORIGINAL_COMMAND)
set -euo pipefail
DIR=/srv/projects/prateek-portfolio
SHA="${1:-${SSH_ORIGINAL_COMMAND:-origin/main}}"
[[ "$SHA" =~ ^[0-9a-f]{7,40}$|^origin/main$ ]] || { echo "bad ref"; exit 2; }
exec 9>/tmp/prateek-portfolio-deploy.lock; flock 9

git -C "$DIR/app" fetch -q origin main
git -C "$DIR/app" reset -q --hard "$SHA"
echo "Deploying $(git -C "$DIR/app" log -1 --format='%h — %s')"

cd "$DIR"
docker build -q --network host -t prateek-portfolio:latest app >/dev/null
docker compose up -d prateek-portfolio-app
docker image prune -f >/dev/null
sleep 3
curl -fsS -o /dev/null -w "Live: HTTP %{http_code}\n" https://prateekagrawal.com
