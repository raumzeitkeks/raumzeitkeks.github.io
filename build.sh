#!/bin/bash
build_dir="$1"
timestamp="$(date --utc +"%Y-%m-%d %H:%M UTC")"

# Create build directory if not present
mkdir -p "$build_dir"

# Build site
echo "<!DOCTYPE html><html><head><title>${domain}</title></head><body>OK</body></html>" > "${build_dir}/index.html"
#hugo --source site --destination "$build_dir"

# Create CNAME
cname="ruoc.co"
echo "$cname" > "${build_dir}/CNAME"

# Create README
rev="$(git rev-parse --short HEAD)"
readme="Built on ${timestamp} based on revision ${rev}."
mkdir -p "${build_dir}/.github"
echo "$readme" > "${build_dir}/.github/README.md"

# Fin
echo "Done"
