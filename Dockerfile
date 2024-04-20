ARG NODE_VERSION=18.18.1

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /app

COPY tsconfig.json package*.json ./

# install pnpm 
RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 8080

CMD "pnpm dev"