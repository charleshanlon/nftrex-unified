FROM node:18.17.1

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --verbose --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]