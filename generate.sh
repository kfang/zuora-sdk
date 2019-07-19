#!/bin/bash

SWAGGER_URL=https://assets.zuora.com/zuora-documentation/swagger.yaml

java -jar swagger-codegen-cli.jar generate \
  -i $SWAGGER_URL \
  -l typescript-node \
  -o zuora-sdk-ts \
  --additional-properties supportsES6=true

cd zuora-sdk-ts
rm git_push.sh
yarn install
yarn prepublish

