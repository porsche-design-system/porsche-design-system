#!/bin/bash

if [[ -z "${1}" || "${1}" != "components-angular" && "${1}" != "components-react" && "${1}" != "utilities" ]]; then
  echo "Please provide a valid package name, e.g. 'components-angular'"
  exit 1
fi

if [[ -z "${2}" ]]; then
  echo "Please provide a target version, e.g. '1.2.3'"
  exit 1
fi

samples=( "angular" "react" "gatsby" "nextjs" "vanillajs" )

for dir in ${samples[@]}; do
	echo "Updating '${1}' to '${2}' in 'sample-integration-${dir}'"

	pushd "../sample-integration-${dir}"
    sed -i '' -E -e 's$("@porsche-design-system/'${1}'": )(".*")$\1"'${2}'"$' package.json
    yarn
  popd
done
