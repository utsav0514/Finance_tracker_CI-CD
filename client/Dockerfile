FROM node:22-alpine AS builder 
WORKDIR /app 
COPY package.json /app/
COPY package-lock.json /app/
COPY .env .env
RUN npm ci
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build 

FROM nginx:stable-alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


 
