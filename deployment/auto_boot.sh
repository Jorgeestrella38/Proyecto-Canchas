#!/bin/sh

# Inicializar NodeDemon 
screen -dmS server npm run --prefix /home/jmcsuite/Proyecto-Canchas start_demon

screen -dmS auto_pull /home/jmcsuite/Proyecto-Canchas/deployment/automatic_pull.sh  12h
