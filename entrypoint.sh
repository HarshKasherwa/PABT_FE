#!/bin/sh

banner ARTICLE BOOKMARK TOOL

echo "checking for node_modules directory"
if  [ ! -d "/home/pabt/frontend/node_modules" ] ; then
  echo "Node modules not found. Installing..."
  pwd
  npm install
fi


echo "********* STARTING REACT UI APP *********"
npm start

# Keep the script running
tail -f /dev/null

exec "$@"

# EOF (end-of-file)