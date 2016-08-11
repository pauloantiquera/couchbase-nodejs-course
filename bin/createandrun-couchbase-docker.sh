#!/bin/bash
source docker.env
docker run -d --name $COUCHBASE_CONTAINER_NAME -p 8091-8094:8091-8094 -p 11210:11210 -v $DATA_VOLUME:$MOUNT_POINT couchbase