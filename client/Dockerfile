# client/Dockerfile
FROM node:16

WORKDIR /app

# Bağımlılıklar
COPY package*.json ./
RUN npm install

# Uygulama kodları
COPY . .

# Geliştirme ortamında çalıştırmak için
EXPOSE 5173

CMD ["npm", "run", "dev"]
