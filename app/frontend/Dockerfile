### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8 as builder

LABEL maintainer="Michel Ferreira Souza <souza_crists@hotmail.com>"

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

## Build the vuejs app in production mode and store the artifacts in dist folder
RUN npm run build

# RUN echo $(npm bin)

# RUN ls -la

### STAGE 2: Setup ###
FROM nginx:latest

COPY nginx.conf /etc/nginx/

## Copy our default nginx config
COPY default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

