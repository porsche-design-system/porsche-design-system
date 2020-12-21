#!/bin/bash

pushd "./packages/artifacts"
  all_dirs=(*)
  echo $all_dirs

  for source in ${all_dirs[@]}; do
    dest=../${source}
    echo "Copying artifact at '${source}/*' to '${dest}'"
    cp -r ${source}/* ${dest}
  done
popd

chmod +x ./packages/assets/bin/serve-cdn.js
