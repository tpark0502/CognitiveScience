FROM node:20 AS build

WORKDIR /my-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /my-app/dist /usr/share/nginx/html

# documentation
# EXPOSE 80

# CMD [ "nginx", "-g", "daemon off" ] this is the default when running the nginx so no need to do it