workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["Deploy", "Slack"]
}

action "Filter" {
  uses = "./images/node/"
  runs = ["run-filter"]
  env = {
    GIT_FILTER = "^refs/heads/(v[0-9]+|issue/[0-9]+)$"
  }
}

action "Install" {
  needs = ["Filter"]
  uses = "./images/node/"
  runs = ["run-install"]
  secrets = ["PORSCHE_NPM_REGISTRY_TOKEN", "IONIC_NPM_REGISTRY_TOKEN"]
}

action "Lint" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-lint"]
}

action "E2E" {
  needs = ["VRT", "Lint"]
  uses = "./images/node/"
  runs = ["run-e2e"]
  env = {
    SKIP_PREFLIGHT_CHECK = "true"
  }
}

action "VRT" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-vrt"]
  env = {
    SKIP_PREFLIGHT_CHECK = "true"
  }
}

action "Build" {
  needs = ["E2E"]
  uses = "./images/node/"
  runs = ["run-build"]
  env = {
    SKIP_PREFLIGHT_CHECK = "true"
  }
}

action "Deploy" {
  needs = ["Build"]
  uses = "./images/node/"
  runs = ["run-deploy"]
  secrets = ["GIT_DEPLOY_KEY"]
}

action "Slack" {
  needs = ["Deploy"]
  uses = "./images/node/"
  runs = ["run-slack"]
  secrets = ["SLACK_WEBHOOK_URL"]
}
