FROM node:lts-alpine@sha256:425c81a04546a543da824e67c91d4a603af16fbc3d875ee2f276acf8ec2b1577

#Runs an low footprint init system that prxoies all the signals to node runtime.
RUN apk add dumb-init

ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

# Makes the user node the owner of the copied directory
COPY --chown=node:node . /usr/src/app/

RUN npm ci --only=production

CMD ["dumb-init", "node", "src/bin/server.js"]

# docker build -t OAuth-consumer:1.0.0 -f Dockerfile.dev .

# docker run -it --name oauth-consumer:1.0.0 -p 3300:3300 --env-file ./.env oauth-consumer:1.0.0