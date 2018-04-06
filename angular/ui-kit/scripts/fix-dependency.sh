#!/usr/bin/env bash

# change to scripts path
# https://www.networkworld.com/article/2703490/operating-systems/unix---when-a-bash-script-asks--where-am-i--.html
cd $( cd "${BASH_SOURCE[0]%/*}" && pwd )


CORE_VERSION="..\/..\/..\/core"

if [ "$1" == "--prod" ]
then
   # get current version
   CORE_VERSION=$(node -p "require('../../../core/package.json').version")
fi

# write version into package.json of build
sed -i 's/^\([ \t]*"porsche-stylesheets": *"\)[^"]*/\1'${CORE_VERSION}'/' ../dist/package.json
