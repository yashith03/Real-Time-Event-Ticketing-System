# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# copy only what's guaranteed to exist
COPY package.json ./
# copy lock if you have it; comment this out if you don't use npm lockfiles
COPY package-lock.json ./

# install deps
RUN npm ci || npm install

# copy app and build
COPY . .
RUN npm run build

# ---- Nginx stage ----
FROM nginx:alpine
# proxy /api to backend container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy build output
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
