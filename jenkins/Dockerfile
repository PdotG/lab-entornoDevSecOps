FROM jenkins/jenkins:lts-jdk17

USER root

# Herramientas básicas
RUN apt-get update && \
    apt-get install -y curl wget gnupg ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ===== Node.js 24 + npm instalados globalmente =====
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# ===== Docker CLI (para poder usar `docker run` en las stages) =====
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

USER jenkins
