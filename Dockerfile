FROM node:22.12.0-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/app.js"]