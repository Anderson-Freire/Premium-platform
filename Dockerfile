FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install 

FROM node:20
WORKDIR /app
COPY ./dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY .env .env
EXPOSE 3000
CMD [ "node", "dist/main" ]
