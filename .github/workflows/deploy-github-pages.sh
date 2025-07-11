#!/usr/bin/env bash

set -o errexit
set -o pipefail

add_deployment_version() {
  echo "task: [$(date)] \"add_deployment_version\""
  echo "${GITHUB_SHA}" > "./packages/storefront/dist/version.md"
}

prepare_deployment() {
  echo "task: [$(date)] \"prepare_deployment\" (${1})"
  rm -rf "./gh-pages/${1}"
}

copy_storefront() {
  echo "task: [$(date)] \"copy_storefront\" (${1})"
  mkdir -p "./gh-pages/${1}"
  cp -r "./packages/storefront/dist/." "./gh-pages/${1}"
}

deploy_to_gh_pages() {
  echo "task: [$(date)] \"deploy_to_gh_pages\""
  pushd "./gh-pages"
    git config --global user.name "${GITHUB_ACTOR}"
    git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"
    git add -A
    git commit -m "Automated deployment to GitHub Pages (${1}): ${GITHUB_SHA}" --allow-empty
    git push origin main --force
  popd
}

update_algolia_index(){
  echo "task: [$(date)] \"update_algolia_index\" (${1})"
  result=$(P_CURRENT_BRANCH=${1} yarn updateAlgolia)
  echo $result | sed "s/.*updateAlgoliaIndex\\.ts' //g"
}

if [[ "${GITHUB_REF_TYPE}" == "branch" ]]; then
  add_deployment_version
  if [[ "${GITHUB_REF_NAME}" == "main" ]]; then
    prepare_deployment "nightly"
    copy_storefront "nightly"
    deploy_to_gh_pages "nightly"
    update_algolia_index "nightly"
  else
    prepare_deployment "${GITHUB_REF_NAME}"
    copy_storefront "${GITHUB_REF_NAME}"
    deploy_to_gh_pages "${GITHUB_REF_NAME}"
    if [[ "${GITHUB_REF_NAME}" == v* ]]; then
      update_algolia_index "${GITHUB_REF_NAME}"
    fi
  fi
fi
