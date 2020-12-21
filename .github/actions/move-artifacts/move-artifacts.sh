#!/bin/bash

pushd "./packages/artifacts"
  all_artifacts=(*)

  for artifact in ${all_artifacts[@]}; do
    source=${artifact}/*
    dest=../${artifact}
    echo "Copying artifact from '${source}' to '${dest}'"
    cp -r ${source} ${dest}
  done
popd

# need to make file executable again after it was extracted from artifact
chmod +x ./packages/assets/bin/serve-cdn.js
