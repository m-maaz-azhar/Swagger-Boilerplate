FROM node:16

WORKDIR "/app"
RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get clean \
    && echo 'Finished installing dependencies'

COPY package*.json ./
RUN npm install --production

FROM node:16-slim

WORKDIR "/app"
RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get clean \
    && echo 'Finished installing dependencies'

COPY --from=0 /app/node_modules /app/node_modules
COPY . /app

USER node
EXPOSE 3000

CMD ["npm", "start"]

