#!/bin/bash

# Default options
pub_branch=""
build_dir=""

# Print helper
_info () { echo "$(tput setaf 3)$1$(tput sgr0)"; }
_msg  () { echo "$(tput setaf 5)$1$(tput sgr0)"; }
_err  () { echo "$(tput setaf 1)Error: $1$(tput sgr0)"; }

# Read options from command line
_print_usage () { echo "Usage: $0 [-p <publish_branch>] [-b <build_dir>]"; }
while getopts ":hp:b:" opt; do
  case $opt in
    h)  _print_usage; exit 0;;
    p)  pub_branch="$OPTARG";;
    b)  build_dir="$OPTARG";;
    :)  _err "Missing argument for -${OPTARG}"; _print_usage; exit 1;;
    \?) _err "Unknown option: -${OPTARG}"; _print_usage; exit 1;;
  esac
done
if [ -z "$pub_branch" ]; then
    _err "Missing publish_branch parameter (no default available)"
    _print_usage
    exit 1
fi
if [ -z "$build_dir" ]; then
    _err "Missing build_dir parameter (no default available)"
    _print_usage
    exit 1
fi

# Print used options
_info "Publishing to branch: $pub_branch"
_info "Using build directory: $build_dir"

# Stash changes
_msg "Stashing local changes"
git stash push --all

# Prepare
_msg "Preparing build directory"
if [ -e "$build_dir" ]; then
    _err "Build directory exists already"
    exit 1
fi
git worktree add "$build_dir" "$pub_branch"
if [ $? -ne 0 ]; then
    _err "Preparing build directory failed"
    exit 1
fi

# Build
_msg "Running build"
build_rev=$(git rev-parse HEAD)
build_branch=$(git branch --show-current)
(source "./build.sh" "$build_dir")
build_exit=$?

# Commit
if [ $build_exit -eq 0 ]
then
    _msg "Committing build output to branch $pub_branch"
    cd "$build_dir"
    git add --all
    git commit -m "Built from ${build_branch}@${build_rev}"
    cd ..
else
    _err "Build failed with exit code $build_exit - skipping commit step"
fi

# Clean up
_msg "Removing build directory"
git worktree remove --force "$build_dir"
if [ $? -eq 0 ]; then
    echo "Done"
fi

# Restore
_msg "Reapplying stashed changes"
git stash pop
