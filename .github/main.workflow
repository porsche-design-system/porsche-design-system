workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["Build"]
}

action "Install" {
  uses = "./images/node/"
  runs = ["run-yarn-with-credentials", "install"]
  secrets = ["ARTIFACTORY_TOKEN"]
}

action "Lint 'TS'" {
  needs = "Install"
  uses = "./images/node/"
  runs = ["yarn", "lint:ts"]
}

action "Lint 'SCSS'" {
  needs = "Install"
  uses = "./images/node/"
  runs = ["yarn", "lint:scss"]
}

action "Build" {
  needs = ["Lint 'TS'", "Lint 'SCSS'"]
  uses = "./images/node/"
  runs = ["yarn", "build"]
}
