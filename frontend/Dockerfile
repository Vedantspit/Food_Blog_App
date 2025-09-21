FROM node:20-alpine

WORKDIR /home/app/frontend

# Copy only package files first
COPY package*.json ./
RUN npm install

# Copy all other frontend files
COPY . .

# Run Vite dev server
CMD ["npm", "run", "dev"]
