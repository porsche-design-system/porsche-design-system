workflow "Porsche UI Kit" {
  on = "push"
  resolves = ["Deploy", "Slack"]
}

action "Filter" {
  uses = "./docker/node/"
  runs = ["run-filter"]
  env = {
    GIT_FILTER = "^refs/heads/(v[0-9]+|issue/[0-9]+)$"
  }
}

action "Install" {
  needs = ["Filter"]
  uses = "./docker/node/"
  runs = ["run-install"]
  secrets = ["PORSCHE_NPM_REGISTRY_TOKEN", "IONIC_NPM_REGISTRY_TOKEN"]
}

action "Lint: UI Kit JS" {
  needs = ["Install"]
  uses = "./docker/node/"
  runs = ["run-lint", "--ui-kit-js"]
}

action "Test Unit: UI Kit JS" {
  needs = ["Install"]
  uses = "./docker/node/"
  runs = ["run-test-unit", "--ui-kit-js"]
}

action "Test E2E: UI Kit JS" {
  needs = ["Install"]
  uses = "./docker/node/"
  runs = ["run-test-e2e", "--ui-kit-js"]
}

action "Test VRT: UI Kit JS" {
  needs = ["Install"]
  uses = "./docker/node/"
  runs = ["run-test-vrt", "--ui-kit-js"]
}

action "Lint: Design System" {
  needs = ["Lint: UI Kit JS", "Test Unit: UI Kit JS", "Test E2E: UI Kit JS", "Test VRT: UI Kit JS"]
  uses = "./docker/node/"
  runs = ["run-lint", "--design-system"]
}

action "Test Unit: Design System" {
  needs = ["Lint: UI Kit JS", "Test Unit: UI Kit JS", "Test E2E: UI Kit JS", "Test VRT: UI Kit JS"]
  uses = "./docker/node/"
  runs = ["run-test-unit", "--design-system"]
}

action "Test E2E: Design System" {
  needs = ["Lint: UI Kit JS", "Test Unit: UI Kit JS", "Test E2E: UI Kit JS", "Test VRT: UI Kit JS"]
  uses = "./docker/node/"
  runs = ["run-test-e2e", "--design-system"]
}

action "Test VRT: Design System" {
  needs = ["Lint: UI Kit JS", "Test Unit: UI Kit JS", "Test E2E: UI Kit JS", "Test VRT: UI Kit JS"]
  uses = "./docker/node/"
  runs = ["run-test-vrt", "--design-system"]
}

action "Test Snapshot: UI Kit React Test" {
  needs = ["Lint: UI Kit JS", "Test Unit: UI Kit JS", "Test E2E: UI Kit JS", "Test VRT: UI Kit JS"]
  uses = "./docker/node/"
  runs = ["run-test-snapshot", "--ui-kit-react-test"]
}

action "Build" {
  needs = ["Lint: Design System", "Test Unit: Design System", "Test E2E: Design System", "Test VRT: Design System"]
  uses = "./docker/node/"
  runs = ["run-build"]
}

action "Deploy" {
  needs = ["Build"]
  uses = "./docker/node/"
  runs = ["run-deploy"]
  secrets = ["GIT_DEPLOY_KEY"]
}

action "Slack" {
  needs = ["Deploy"]
  uses = "./docker/node/"
  runs = ["run-slack"]
  secrets = ["SLACK_WEBHOOK_URL"]
}
