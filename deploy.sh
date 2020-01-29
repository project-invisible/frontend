#!/bin/bash

if [ $TRAVIS_BRANCH == 'master' ] ; then
  echo "--- SSH"
  ssh -o StrictHostKeyChecking=no travis@invisible.f4.htw-berlin.de "pwd  ; exit"
  echo "--- Building docker file"
  docker build -f Dockerfile -t invisibleproject/in_visible:frontend .

  echo "--- docker images ---"
  docker images

  docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
  docker push invisibleproject/in_visible:frontend

  scp -o StrictHostKeyChecking=no docker-compose.yml travis@invisible.f4.htw-berlin.de:~
  
  echo "+++++ stopping docker containers"
  ssh -t -o StrictHostKeyChecking=no travis@invisible.f4.htw-berlin.de 'docker-compose down'
  
  echo "+++++ pulling and starting docker containers"
   ssh -t -o StrictHostKeyChecking=no travis@invisible.f4.htw-berlin.de 'docker-compose up -d'
else
  echo "Not deploying, since this branch isn't master"
fi
