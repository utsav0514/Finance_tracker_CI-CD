FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5002
CMD ["npm", "start"]
