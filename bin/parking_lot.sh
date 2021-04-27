#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
npm install
npm run test
if [ "$#" -ne 1 ]; 
then
	node $parent_path/server.js ./bin/parking_lot_inputs.txt
else
	node $parent_path/server.js $1
fi