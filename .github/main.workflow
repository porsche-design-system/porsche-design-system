workflow "demo action on push" {
  on = "push"
  resolves = ["install dependencies"]
}

action "install dependencies" {
  uses = "./images/node/"
  runs = ["run-yarn"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

