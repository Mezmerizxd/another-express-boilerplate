FROM node:16.16.0

WORKDIR /usr/src/app

RUN npm install -g yarn

RUN yarn global add nodemon

RUN yarn global add typescript

EXPOSE 3001 5550