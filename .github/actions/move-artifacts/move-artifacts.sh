#!/bin/bash

ls ./packages/artifacts
all_dirs=(./packages/artifacts)
echo $all_dirs

artifacts=( "assets/cdn" "assets/dist" "assets/bin" "components-js/dist/components-wrapper" "components-angular/projects/components-wrapper/src/lib" "components-react/projects/components-wrapper/src/lib" "partials/dist" "utilities/projects/utilities" )
for source in ${all_dirs[@]}; do
  source=./artifacts/${source}
  dest=./packages/${source}
  ls ${source}
  echo "Moving ${source} to ${dest}"
#  mv ${source} ${dest}
done
