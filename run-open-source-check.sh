#!/bin/bash

IMAGE_NAME=215495424956.dkr.ecr.eu-central-1.amazonaws.com/ort-porsche:latest
docker pull $IMAGE_NAME

RESULTS_DIR="./ort-results"
rm -rf ${RESULTS_DIR}
mkdir -p ${RESULTS_DIR}

packages=( "assets/dist" "components" "components-js/dist/components-wrapper" "components-angular/dist/components-wrapper" "components-react/dist/components-wrapper" "utilities/projects/utilities/dist" )

for dir in ${packages[@]}; do
  echo "Running open source check for package '${dir}'"

  docker run -v "$PWD:/project" $IMAGE_NAME analyze -i "/project/packages/${dir}" -o "/project/packages/${dir}" \
    --package-curations-file /curations/curations.yml \
    --package-managers yarn

  result=analyzer-result-$(echo ${dir} | cut -d'/' -f 1).yml
  mv "./packages/${dir}/analyzer-result.yml" "./ort-results/${result}"

  echo "Done"
done
