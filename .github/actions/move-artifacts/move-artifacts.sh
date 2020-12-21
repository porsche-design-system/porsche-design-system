#!/bin/bash

pushd "./packages/artifacts"
  ls
  all_dirs=(./*)
  echo $all_dirs

  for source in ${all_dirs[@]}; do
  #  source=./artifacts/${source}
    dest=../packages/${source}
    ls ${source}
    echo "Moving ${source} to ${dest}"
    mv ${source} ${dest}
  done
popd

chmod +x ./packages/assets/bin/serve-cdn.js
