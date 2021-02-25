FROM node:12.14-alpine as builder
WORKDIR /app/ygo-card-ui
COPY . .
RUN npm config set strict-ssl false
RUN npm install --unsafe-perm
RUN npm rebuild node-sass
RUN npm run build

FROM nginx:alpine
RUN mkdir -m o+x /usr/share/nginx/html/assets
COPY --from=builder /app/ygo-card-ui/dist/. /usr/share/nginx/html/assets/
COPY --from=builder /app/ygo-card-ui/src/assets/. /usr/share/nginx/html/assets/
COPY --from=builder /app/ygo-card-ui/docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/ygo-card-ui/docker/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
