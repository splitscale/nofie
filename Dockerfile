# Create the production image
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

COPY .env .env

EXPOSE 3000

CMD ["node", "bot.js"]
