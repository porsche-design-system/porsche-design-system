FROM mcr.microsoft.com/playwright:v1.42.1-focal

ENV PATH="/opt/porsche-design-system/bin:${PATH}"

RUN apt-get update && \
    apt-get install -yq gconf-service \
    xvfb rsync openssh-client procps git curl unzip && \
    rm -rf /var/lib/apt/lists/*

# https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-install
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip ./aws/install

COPY ./entrypoint.sh "/opt/porsche-design-system/entrypoint.sh"
COPY ./bin "/opt/porsche-design-system/bin"
COPY ./shared "/opt/porsche-design-system/shared"

# to fix JavaScript heap out of memory exceptions
# https://github.com/actions/runner-images/issues/70#issuecomment-1191708172
ENV NODE_OPTIONS="--max_old_space_size=4096"

ENTRYPOINT [ "/opt/porsche-design-system/entrypoint.sh" ]
