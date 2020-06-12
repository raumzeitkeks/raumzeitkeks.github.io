#!/bin/bash
outdir="$1"
if [ -z "$outdir" ]; then
    echo "Usage: $0 <output_dir>"
    exit 1
fi

_headline () { echo    "$(tput setaf 4)$1$(tput sgr0)"; }
_ask      () { echo -n "$(tput setaf 5)> $1$(tput sgr0)"; }

set -e

# ---
_headline "Creating commit"

# Get info
rev=$(git rev-parse HEAD)
branch=$(git branch --show-current)

# Create commit
cd "$outdir"
git add --all
git commit -m "Deployed from ${branch}@${rev}"
cd ..

# ---
_headline "Pushing changes"
_ask "Do you want to push the output changes [y/N]?"
read answer
if [ "$answer" != "${answer#[Yy]}" ] ;then
    cd "$outdir"
    git push || git push origin $(git branch --show-current)
fi
