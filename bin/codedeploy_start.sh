#/!bin/bash

cd /opt/hubot
npm install && bin/hubot -a slack --require build
