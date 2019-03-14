workflow "demo action on push" {
  on = "push"
  resolves = ["build"]
}

action "install dependencies" {
  uses = "./images/node/"
  runs = ["run-yarn", "install"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

action "build" {
  needs = "install dependencies"
  uses = "./images/node/"
  runs = ["run-yarn", "build"]
}
