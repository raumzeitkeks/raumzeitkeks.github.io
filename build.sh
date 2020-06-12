#!/bin/bash
outdir="$1"
if [ -z "$outdir" ]; then
    echo "Usage: $0 <output_dir>"
    exit 1
fi

timestamp="$(date --utc +"%Y-%m-%d %H:%M UTC")"

_headline () { echo "$(tput setaf 4)$1$(tput sgr0)"; }
_info     () { echo "$(tput setaf 5)> $1$(tput sgr0)"; }
_warning  () { echo "$(tput setaf 3)> $1$(tput sgr0)"; }
_error    () { echo "$(tput setaf 1)Error: $1$(tput sgr0)"; }
_ask      () { echo -n "$(tput setaf 5)> $1 $(tput sgr0)"; }

# ---
_headline "Checking working directory status"

status="$(git status --short --ignored)"
if [ -z "$status" ]; then
    _info "Source directory clean"
else
    _warning "Source directory has uncommited changes!"
    echo "$status"
fi

# ---
_headline "Preparing output directory"

exitcode=0
if [ -d "$outdir" ]; then
    _info "Removing all contents of output directory"
    _ask "Uncommited changes will be lost! Continue [Y/n]?"
    read answer
    if [ -n "$answer" ] && [ "$answer" = "${answer#[Yy]}" ];then
        exit 0
    fi
    cd "$outdir"
    rm -f $(git ls-files --cached --other -- .)
    exitcode=$?
    cd ..
else
    _info "Creating empty output directory"
    mkdir "$outdir"
    exitcode=$?
fi

if [ "$exitcode" -ne 0 ]; then
    _error "Operation failed"
    exit 1
fi

# ---
_headline "Building site"

# Build site
echo "<!DOCTYPE html><html><head><title>${domain}</title></head><body>OK</body></html>" > "${outdir}/index.html"
#hugo --source site --destination "$outdir"

# Create CNAME
cname="ruoc.co"
echo "$cname" > "${outdir}/CNAME"

# Create README
rev="$(git rev-parse --short HEAD)"
if [ -z "$status" ]; then
    readme="Build based on commit ${rev}.\n${timestamp}"
else
    readme="Build based on commit ${rev} with local changes.\n${timestamp}"
fi
mkdir -p "${outdir}/.github"
echo -e "$readme" > "${outdir}/.github/README.md"

_info "Build done"

# ---
_headline "Output overview"
_info "Following changes were done"
git status --untracked --short -- "$outdir"
