#!/usr/bin/env sh
# Installs every skill in ./skills into your Claude Code skills folder.
#   Personal (all projects):  sh install.sh
#   One project only:         sh install.sh --project /path/to/project
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/.claude/skills"

if [ "$1" = "--project" ]; then
  if [ -z "$2" ] || [ ! -d "$2" ]; then
    echo "Project folder not found: $2" >&2
    exit 1
  fi
  DEST="$2/.claude/skills"
fi

mkdir -p "$DEST"
for d in "$DIR"/skills/*/; do
  [ -d "$d" ] || continue
  name="$(basename "$d")"
  mkdir -p "$DEST/$name"
  cp -R "$d". "$DEST/$name/"
  echo "[ok] Installed $name -> $DEST/$name"
done

echo ""
echo "Done. Open a new Claude Code session and type /animated-landing"
