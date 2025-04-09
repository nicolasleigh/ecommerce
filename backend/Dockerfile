FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .env ./
COPY ./ ./
EXPOSE 8083
CMD ["npm", "start"]
