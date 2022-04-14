FROM node:15 as builder

WORKDIR /sources

ARG API_URL=10.10.12.166:8989

# install deps
COPY ./package* ./
RUN npm ci

# build bundle
COPY . .
RUN npm run build:prod

# nginx config
FROM nginx:alpine

ARG API_URL=10.10.12.166:8989

COPY --from=builder /sources/dist/basestation/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i -e "s|__API_URL__|$API_URL|g" /etc/nginx/nginx.conf
