FROM node:12.14-alpine as build
RUN mkdir -p /usr/ygo-card-ui
WORKDIR /usr/ygo-card-ui
COPY package.json .
RUN npm install --unsafe-perm
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY /docker/nginx.conf /etc/nginx/nginx.conf
COPY /docker/default.conf /etc/nginx/conf.d/default.conf
COPY /docker/routes.conf /etc/nginx/conf.d/routes/routes.conf
COPY --from=build /usr/ygo-card-ui/dist/ygo-card-ui /usr/share/nginx/html
EXPOSE 80
