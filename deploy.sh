#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  npm run build
  rsync -rq --delete --rsync-path="mkdir -p frontend && rsync" \
  $TRAVIS_BUILD_DIR/public travis@invisible.f4.htw-berlin.de:frontend
  echo $TRAVIS_BUILD_DIR
else
  echo "Not deploying, since this branch isn't master"
fi
