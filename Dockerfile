FROM node:18-alpine

# The /app directory should act as the main application directory
# WORKDIR /app

# COPY . .

# COPY front-end/package*.json ./

# # Copy the app package and package-lock.json file
# # COPY package.json ./
# # COPY package-lock.json ../

# # Install npm dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the app
# RUN npm run build

# EXPOSE 3000

# CMD ["npx", "next", "dev"]
WORKDIR /app
COPY front-end/package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev