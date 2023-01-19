#!/bin/bash

BASE_DIR=$(dirname $(dirname "$(readlink -f "$0")"))
DB_NAME="ubershakmaty"
APPS="user_app chess_game"

function check_bin() {
    local bin=$1
    if ! command -v $bin &> /dev/null; then
        echo "\"$bin\" command can not be found"
        exit
    fi
}


if [[ -e $BASE_DIR/db.sqlite3 ]]; then
    rm -f $BASE_DIR/db.sqlite3
else
    psql -d $DB_NAME -f $BASE_DIR/bin/resetpsql.sql
    check_bin psql
fi

rm -rf $BASE_DIR/*/migrations
python $BASE_DIR/manage.py makemigrations $APPS
python $BASE_DIR/manage.py migrate
# python $BASE_DIR/manage.py loaddata products