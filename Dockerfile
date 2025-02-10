# Sử dụng Node.js làm môi trường build
FROM node:14 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước khi cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng ReactJS
RUN npm run build
