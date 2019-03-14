FROM node:10.15.3-alpine@sha256:b85a3b0ef76f5543b3f467e8a25694e72594d2c2bfcf140fa584d4f40ace4130

ENV PATH="/opt/porsche-ui-kit/bin:${PATH}"

RUN apk add --no-cache bash

COPY ./entrypoint.sh "/opt/porsche-ui-kit/entrypoint.sh"
COPY ./bin "/opt/porsche-ui-kit/bin"
COPY ./shared "/opt/porsche-ui-kit/shared"

ENTRYPOINT [ "/opt/porsche-ui-kit/entrypoint.sh" ]
