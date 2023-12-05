FROM node:18-alpine

COPY . /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build



EXPOSE 3000

CMD ["npx", "next", "dev"]
# Expose $PORT on container.
