FROM node:20-alpine

WORKDIR /home/app/backend

# Copy only package files first (speeds up rebuilds)
COPY package*.json ./
RUN npm install --legacy-peer-deps


# Copy the rest of the backend code
COPY . .

CMD ["node", "server.js"]
