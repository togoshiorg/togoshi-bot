#/!bin/bash

cd /opt/hubot
yarn
bin/hubot -a slack --require build
