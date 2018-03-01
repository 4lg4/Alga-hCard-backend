FROM node:8.9.1-alpine

RUN addgroup -S app && adduser -S -g app app

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production

ADD ./dist /app
RUN chown app:app -R /app && chmod 777 /tmp
WORKDIR /app

RUN NODE_ENV=production npm install
#CMD ["npm", "install"]
CMD ["npm", "start"]
