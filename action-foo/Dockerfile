FROM debian:9.5-slim

LABEL "com.github.actions.name"="Demo Foo Bar Action"
LABEL "com.github.actions.description"="Some Demo Foo Bar Action Description"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="yellow"

ADD entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
