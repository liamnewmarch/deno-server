FROM debian:jessie-slim AS deno

ARG DENO_VERSION="1.0.0"
ARG DENO_REPOSITORY="https://github.com/denoland/deno"
ARG DENO_RELEASE_ARCH="x86_64-unknown-linux-gnu"
ARG DENO_RELEASE_ASSET="deno-${DENO_RELEASE_ARCH}.zip"
ARG DENO_RELEASE_URL="${DENO_REPOSITORY}/releases/download/v${DENO_VERSION}/${DENO_RELEASE_ASSET}"
ARG DENO_INSTALL_PATH="/usr/local/bin"

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates curl && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* && \
    curl -fsSLO --compressed $DENO_RELEASE_URL && \
    gunzip -c $DENO_RELEASE_ASSET > $DENO_INSTALL_PATH/deno && \
    chmod +x $DENO_INSTALL_PATH/deno && \
    rm $DENO_RELEASE_ASSET

ARG HOST="0.0.0.0"
ARG PORT=3000
EXPOSE $PORT

WORKDIR /app/
COPY . ./

CMD ["deno", "run", "-A", "/app/src/index.ts"]
