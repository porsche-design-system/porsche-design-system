workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["Deploy", "Slack"]
}

action "Filter" {
  uses = "actions/bin/filter@master"
  args = "branch 1.x"
}

action "Install" {
  needs = ["Filter"]
  uses = "./images/node/"
  runs = ["run-install"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

action "Lint" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-lint"]
}

action "VRT" {
  needs = ["Install"]
  uses = "./images/node/"
  runs = ["run-vrt"]
}

action "Build" {
  needs = ["Lint", "VRT"]
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
