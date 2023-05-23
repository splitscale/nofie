# Create the production image
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

CMD ["node", "bot.js"]
