workflow "demo action on push" {
  on = "push"
  resolves = ["build"]
}

action "install dependencies" {
  uses = "./images/node/"
  runs = ["run-yarn-with-credentials", "install"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

action "lint:ts" {
  needs = "install dependencies"
  uses = "./images/node/"
  runs = ["yarn", "lint:ts"]
}

action "build" {
  needs = "lint:ts"
  uses = "./images/node/"
  runs = ["yarn", "build"]
}
