# Use Node.js LTS version - we're using node 24 alpine, node's official image. We picked node 24 as it is the latest LTS version
FROM node:24-alpine

# Set working directory - this is the "working directory", so the following instructions we create will run in the container at the path /app
WORKDIR /app

# Copy package files - since we set the working directory to /app, this copies our local package.json and package-lock.json files to /app/package.json and /app/package-lock.json respectively
COPY package*.json ./

# Install dependencies - installs node modules inside of the container
RUN npm install

# Copy application code - this moves all of our code in the current local directory /dockerdemo/server to the /app directory
COPY . .

# Expose the port the app runs on - this does not actually expose or publish the port, it is purely for "documentation between the person who builds the image and the person who runs the container", per Docker official documentation
EXPOSE 3000

# Start the node application
# Note that CMD is different from RUN. RUN commands are executed during the build process of the image, each RUN command creates what's called a "layer" in the docker image. However there can only be one CMD command in a Dockerfile, and this is the command that is executed when a container is started from the built docker image
CMD ["npm", "start"]
