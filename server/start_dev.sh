#!/bin/bash

/server/manage.py migrate
/server/manage.py loaddata test-data
honcho start dev
