# Sử dụng Node.js làm môi trường build
FROM node:14 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và yarn.lock trước khi cài đặt dependencies
COPY package.json yarn.lock ./

# Cài đặt dependencies với Yarn
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code vào container
COPY . .

# Build ứng dụng ReactJS
RUN yarn build
