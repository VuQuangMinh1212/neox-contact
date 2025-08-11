FROM node:18

RUN mkdir -p /tmp && chmod 1777 /tmp

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional --no-audit && npm cache clean --force

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
