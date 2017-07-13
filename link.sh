#!/usr/bin/env bash

rm -rf ./node_modules/ku4es-kernel
mkdir ./node_modules/ku4es-kernel
cp -rf ../ku4es-kernel/dist/. ./node_modules/ku4es-kernel

rm -rf ./node_modules/ku4es-ui-testing
mkdir ./node_modules/ku4es-ui-testing
cp -rf ../ku4es-ui-testing/dist/. ./node_modules/ku4es-ui-testing
