#!/bin/bash

export GIT_DEPLOY_REPO=git@github.com:heytitle/politician-businesss.git
export GIT_DEPLOY_BRANCH=gh-pages
export GIT_DEPLOY_DIR=dist 

echo "Building and deploying for $1"

npm run build:$1 \
    && ./scripts/push-page.sh
