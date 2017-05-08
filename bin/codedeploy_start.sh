#/!bin/bash

cd /opt/hubot
sudo npm install
bin/hubot -a slack --require build
