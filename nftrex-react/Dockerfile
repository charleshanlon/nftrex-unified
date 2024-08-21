FROM node:18.17.1

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --verbose --legacy-peer-deps

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]