### STAGE 1: RUN ###
FROM node:19
RUN apt-get update -y
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY ./app .
ENTRYPOINT ["node", "index.js"]