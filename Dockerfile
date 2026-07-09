FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
ARG API_BASE_URL
ARG AUTH_TOKEN
ENV API_BASE_URL=$API_BASE_URL
ENV AUTH_TOKEN=$AUTH_TOKEN
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]
