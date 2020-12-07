# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build

# production stage
FROM nginx:stable-alpine as production-stage
ENV VUE_APP_BACKEND_URL=http://ec2-13-229-79-9.ap-southeast-1.compute.amazonaws.com:8090/
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY prod_nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]