#!/bin/bash

BASE_DIR=$(dirname $(dirname "$(readlink -f "$0")"))
DB_NAME="ubershakmaty"
APPS="app_auth chess_game"

function check_bin() {
    local bin=$1
    if ! command -v $bin &> /dev/null; then
        echo "\"$bin\" command can not be found"
        exit
    fi
}

function reset_db() {
    psql -d $DB_NAME -f $BASE_DIR/bin/resetdb.sql
    rm -rf $BASE_DIR/*/migrations
    python $BASE_DIR/manage.py makemigrations $APPS
    python $BASE_DIR/manage.py migrate
    # python $BASE_DIR/manage.py loaddata products
}

check_bin psql
check_bin python
reset_db