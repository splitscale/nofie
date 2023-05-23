# Stage 1: Build the bot
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app .
COPY .env .env
EXPOSE 3000
CMD ["node", "bot.js"]