#!/bin/bash

cd /home/jmcsuite/Proyecto-Canchas
while true; do
	sleep $1
	git pull
	npm install
done
