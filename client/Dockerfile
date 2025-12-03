# Use Node.js LTS version - we'll use node 24 again for the client
FROM node:24-alpine

# Set working directory - we'll use the /app directory again. This /app directory is different from the /app directory from the server's Dockerfile, as the client and server are being run as two different containers, each with an /app directory that contains the client or server code.
WORKDIR /app

# Copy package files - this does the same thing as it does for the server, it copies our local package.json and package-lock.json files to /app/package.json and /app/package-lock.json respectively
COPY package*.json ./

# Install dependencies - again, this also just installs node modules inside of the container
RUN npm install

# Copy application code - move our code from our client directory into our container's /app directory
COPY . .

# Expose the port the app runs on - again, this is just for documentation
# Fun fact (based on time left) - vite uses port 5173 because V and I are 5 and 1 in roman numerals, and T and E look like a 7 and a 3
EXPOSE 5173

# Start the node application - this time we will run npm run dev for the frontend app. This is only for development (as the npm run dev command would suggest), in production we would build all of our client code into static files and serve that from the backend api, and we would not use a client Dockerfile or have a client service in our docker-compose.yml file
CMD ["npm", "run", "dev", "--", "--host"]
