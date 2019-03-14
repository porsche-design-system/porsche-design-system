FROM alpine:latest

LABEL "com.github.actions.name"="git-commit-message-check"
LABEL "com.github.actions.description"="Check the quality of the git commit message"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="yellow"

RUN apk add --no-cache \
    jq \
    curl \
    git

COPY "run-git-message-check.sh" /usr/bin/run-git-message-check

CMD ["sh", "/usr/bin/run-git-message-check"]
