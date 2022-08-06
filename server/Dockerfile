FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7000
EXPOSE 8000
CMD [ "node", "index.js" ]
