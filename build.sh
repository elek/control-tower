#!/usr/bin/env bash

###
# Create the docker image
###
build(){
   yarn build
   docker build -t flokkr/control-tower .
}

###
# Deploy the docker image to the docker hub
###
deploy(){
   docker push flokkr/control-tower
}

$@

