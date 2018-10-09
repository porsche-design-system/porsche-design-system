#!/usr/bin/env bash

# change to scripts path
# https://www.networkworld.com/article/2703490/operating-systems/unix---when-a-bash-script-asks--where-am-i--.html
cd "$( cd "${BASH_SOURCE[0]%/*}" && pwd )"

mkdir -p ../generated
cat ../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss | node icon-enum-generator.js > ../generated/pui-icon.enum.ts
printf "Icon enum generated: generated/pui-icon.enum.ts\n"
