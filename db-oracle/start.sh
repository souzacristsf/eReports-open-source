#!/bin/bash

sleep 60
echo "=> Começando..."
# sqlplus system/oracle < init.sql
sqlplus system/oracle@localhost:1521/XE @init.sql


