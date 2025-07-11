#!/usr/bin/env bash

set -o errexit
set -o pipefail

if [ -d "${1}" ]; then
  rclone copy "${1}" "linode:porsche-design-system/porsche-design-system/${2}" --config=./rclone.conf --ignore-existing -v --exclude=font-face.css
  echo "matching files in directory '${1}' have been uploaded to cdn ✅"
else
  echo "directory '${1}' does not exist, skipping upload ❌️️"
fi
