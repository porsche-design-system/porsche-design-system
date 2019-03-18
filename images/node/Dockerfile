FROM node:10.15.3-stretch@sha256:8dee5aba1bf0a2d5cf036f43d3daac165d6026bf75bff63236e5693023872a62

ENV PATH="/opt/porsche-ui-kit/bin:${PATH}"

RUN apt-get update && \
    apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils && \
    rm -rf /var/lib/apt/lists/*

COPY ./entrypoint.sh "/opt/porsche-ui-kit/entrypoint.sh"
COPY ./bin "/opt/porsche-ui-kit/bin"
COPY ./shared "/opt/porsche-ui-kit/shared"

ENTRYPOINT [ "/opt/porsche-ui-kit/entrypoint.sh" ]
