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
  secrets = ["PORSCHE_NPM_REGISTRY_TOKEN"]
}

action "Build" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-build"]
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
