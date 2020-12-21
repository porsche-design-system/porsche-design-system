#!/bin/bash

pushd "./packages/artifacts"
  all_dirs=(*)
  echo $all_dirs

  for source in ${all_dirs[@]}; do
    dest=../packages/${source}
    echo "Moving '${source}/*' to '${dest}'"
    mv ${source}/* ${dest}
  done
popd

chmod +x ./packages/assets/bin/serve-cdn.js
