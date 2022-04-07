FROM node:latest

COPY ["./debts-microservice/package.json", "./debts-microservice/package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY ["./debts-microservice/*", "/usr/src/"]

EXPOSE 3001

CMD ["npm", "start"]