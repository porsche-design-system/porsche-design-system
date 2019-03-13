workflow "Say hello on push" {
  on = "push"
  resolves = ["actions/bin/sh@master"]
}

action "actions/bin/sh@master" {
  uses = "actions/bin/sh@master"
  args = ["echo Hello $GITHUB_ACTOR"]
}
