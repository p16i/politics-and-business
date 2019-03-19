#!/bin/bash

ENV=$1

export GIT_DEPLOY_DIR=dist 

if [ "$ENV" == "stage" ]; then
    export GIT_DEPLOY_REPO=git@github.com:heytitle/politician-businesss.git
    export GIT_DEPLOY_BRANCH=gh-pages
elif [ "$ENV" == "prod" ]; then
    export GIT_DEPLOY_REPO=git@gitlab.com:elect.in.th/politician-business.git
    export GIT_DEPLOY_BRANCH=deploy
else
   echo "Unknown environment $ENV"
   exit
fi

echo "Building and deploying for $ENV ($GIT_DEPLOY_REPO, $GIT_DEPLOY_BRANCH)"

npm run build:$1 \
    && GIT_DEPLOY_REPO=$GIT_DEPLOY_REPO GIT_DEPLOY_BRANCH=$GIT_DEPLOY_BRANCH \
       GIT_DEPLOY_DIR=$GIT_DEPLOY_DIR ./scripts/push-page.sh
