#!/usr/bin/env bash

# change to scripts path
# https://www.networkworld.com/article/2703490/operating-systems/unix---when-a-bash-script-asks--where-am-i--.html
cd $( cd "${BASH_SOURCE[0]%/*}" && pwd )


CORE_VERSION="..\/..\/..\/core\/ui-kit"

if [ "$1" == "--prod" ]
then
   # get current version
   CORE_VERSION=$(node -p "require('../../../core/ui-kit/package.json').version")
fi

# write version into package.json of build
# weird sed syntax is because it has to run on linux and os x
# https://stackoverflow.com/questions/2320564/i-need-my-sed-i-command-for-in-place-editing-to-work-with-both-gnu-sed-and-bsd#comment28112026_2420579
sed -i"" -e 's/^\([ \t]*"@porsche\/ui-kit-core": *"\)[^"]*/\1'${CORE_VERSION}'/' ../dist/package.json
