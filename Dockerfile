FROM node:lts-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base as dev
COPY . .
CMD [ "npm", "run",  "dev" ]
