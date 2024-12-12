#!/bin/sh

#Stop running container
docker stop $(docker ps -a -q  --filter ancestor=synchrox/backend_pgsql_gen)

# Build container
docker build -t synchrox/backend_pgsql_gen .

# Run container
docker run -p 5030:5030 -d synchrox/backend_pgsql_gen