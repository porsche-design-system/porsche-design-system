FROM node:10.15.3-alpine@sha256:b85a3b0ef76f5543b3f467e8a25694e72594d2c2bfcf140fa584d4f40ace4130

ENV PATH="/opt/porsche-ui-kit/bin:${PATH}"

RUN apk add --no-cache bash gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

COPY ./entrypoint.sh "/opt/porsche-ui-kit/entrypoint.sh"
COPY ./bin "/opt/porsche-ui-kit/bin"
COPY ./shared "/opt/porsche-ui-kit/shared"

ENTRYPOINT [ "/opt/porsche-ui-kit/entrypoint.sh" ]
