workflow "demo action on push" {
  on = "push"
  resolves = ["action foo"]
}

action "action foo" {
  uses = "./action-foo/"
}
