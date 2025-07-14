#!/usr/bin/env bash

set -o errexit
set -o pipefail

SCRIPT_DIR="$(cd `dirname ${0}` && pwd)"

# source "${SCRIPT_DIR}/run-check-version"

# set new version in components
pushd "./packages/components"
  yarn version --no-git-tag-version --new-version "${1}"
  sed -i -e "s/## \[Unreleased\]/## \[Unreleased\]\n\n## \[${1}\] - $(date +'%F')/" "./CHANGELOG.md"
popd

# set new version in components-js
pushd "./packages/components-js/projects/components-wrapper"
  yarn version --no-git-tag-version --new-version "${1}"
popd

# update "components" in "components-js"
pushd "./packages/components-js"
  sed -i -E -e 's$("@porsche-design-system/components": )(".*")$\1"'${1}'"$' package.json
popd

# set new version in framework wrapper projects and update "components-js"
packages=( "angular" "react" "vue" )
for pkg in ${packages[@]}; do
  pushd "./packages/components-${pkg}/projects/${pkg}-wrapper"
    yarn version --no-git-tag-version --new-version "${1}"
    sed -i -E -e 's$("@porsche-design-system/components-js": )(".*")$\1"'${1}'"$' package.json
  popd
done

# update "components-js" in uxpin-wrapper project
pushd "./packages/components-react/projects/uxpin-wrapper"
  sed -i -E -e 's$("@porsche-design-system/components-js": )(".*")$\1"'${1}'"$' package.json
popd

# update "components-react" in nextjs project
pushd "./packages/components-react/projects/nextjs"
  sed -i -E -e 's$("@porsche-design-system/components-react": )(".*")$\1"'${1}'"$' package.json
popd

# update "components-react" in remix project
pushd "./packages/components-react/projects/remix"
  sed -i -E -e 's$("@porsche-design-system/components-react": )(".*")$\1"'${1}'"$' package.json
popd

# update "components-react" in storefront project
pushd "./packages/storefront"
  sed -i -E -e 's$("@porsche-design-system/components-react": )(".*")$\1"'${1}'"$' package.json
popd

# update framework wrapper packages in base projects
packages=( "components-angular" "components-react" "components-vue" )
for pkg in ${packages[@]}; do
  pushd "./packages/${pkg}"
    sed -i -E -e 's$("@porsche-design-system/'${pkg}'": )(".*")$\1"'${1}'"$' package.json
  popd
done

# update "components-js" in base projects
packages=( "components-js" "crawler" )
for pkg in ${packages[@]}; do
  pushd "./packages/${pkg}"
    sed -i -E -e 's$("@porsche-design-system/components-js": )(".*")$\1"'${1}'"$' package.json
  popd
done