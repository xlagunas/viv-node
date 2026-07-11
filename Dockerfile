# Servidor Socket.IO. Escolta a 0.0.0.0:3000 dins el contenidor
# (app.listen(3000) a index.js) → Caddy hi arriba per la xarxa "web".
FROM node:22-alpine

WORKDIR /app

# Instal·lació reproduïble des del lockfile, només deps de producció.
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "index.js"]
