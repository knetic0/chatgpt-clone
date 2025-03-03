# server/Dockerfile
FROM node:16

WORKDIR /app

# Bağımlılıklar
COPY package*.json ./
RUN npm install

# Uygulama kodları
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
