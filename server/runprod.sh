#!/bin/bash
BASE_DIR=/home/shket/projects/ubershakmaty/server
source $BASE_DIR/.venv/ubershakmaty/bin/activate
exec gunicorn config.wsgi -c $BASE_DIR/etc/gunicorn.conf.py
