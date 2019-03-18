FROM node:10.15.3-alpine@sha256:b85a3b0ef76f5543b3f467e8a25694e72594d2c2bfcf140fa584d4f40ace4130

ENV PATH="/opt/porsche-ui-kit/bin:${PATH}"

RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache bash \
      chromium@edge \
      harfbuzz@edge \
      nss@edge

COPY ./entrypoint.sh "/opt/porsche-ui-kit/entrypoint.sh"
COPY ./bin "/opt/porsche-ui-kit/bin"
COPY ./shared "/opt/porsche-ui-kit/shared"

ENTRYPOINT [ "/opt/porsche-ui-kit/entrypoint.sh" ]
