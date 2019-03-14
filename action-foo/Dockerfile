FROM alpine:latest

LABEL "com.github.actions.name"="Demo Foo Bar Action"
LABEL "com.github.actions.description"="Some Demo Foo Bar Action Description"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="yellow"

RUN apk add --no-cache \
 jq \
 git \
 bash

COPY entrypoint.sh /opt/porsche-ui-kit/entrypoint.sh

ENTRYPOINT ["/opt/porsche-ui-kit/entrypoint.sh"]
