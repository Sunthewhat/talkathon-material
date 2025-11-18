# Node.js Backend Docker Tutorial

This is a simple Node.js/Express backend application demonstrating how to containerize a Node.js application using Docker.

## Project Structure

```
dockerize-app-with-dockerfile-node-backend/
├── server.js        # Express application source code
├── package.json     # Node.js dependencies and scripts
├── Dockerfile       # Docker image build instructions
├── .dockerignore    # Files to exclude from Docker context
└── README.md        # This file
```

## Application Overview

This is a simple HTTP server built with Express that provides three endpoints:

- `GET /` - Welcome message
- `GET /api/hello?name=YourName` - Personalized greeting
- `GET /api/health` - Health check endpoint

## Building the Docker Image

To build the Docker image, run:

```bash
docker build -t node-backend:latest .
```

### Understanding the Build Process

The Dockerfile uses a **multi-stage build**:

1. **Build Stage**: Uses `node:18-alpine` image
   - Copies package.json and package-lock.json
   - Installs production dependencies using `npm ci`

2. **Final Stage**: Uses fresh `node:18-alpine` image
   - Copies only node_modules from build stage
   - Copies application code
   - Results in a smaller, optimized image (typically ~120-150MB)

## Running the Container

Run the container:

```bash
docker run -p 8080:8080 node-backend:latest
```

The application will be available at `http://localhost:8080`

### Running in Detached Mode

To run the container in the background:

```bash
docker run -d -p 8080:8080 --name node-backend-app node-backend:latest
```

## Testing the Application

Once the container is running, test the endpoints:

```bash
# Test the home endpoint
curl http://localhost:8080/

# Test the hello endpoint
curl http://localhost:8080/api/hello?name=Docker

# Test the health endpoint
curl http://localhost:8080/api/health
```

## Docker Commands Cheat Sheet

```bash
# Build the image
docker build -t node-backend:latest .

# Run the container
docker run -p 8080:8080 node-backend:latest

# List running containers
docker ps

# Stop the container
docker stop node-backend-app

# Remove the container
docker rm node-backend-app

# View container logs
docker logs node-backend-app

# Remove the image
docker rmi node-backend:latest
```

## Key Docker Concepts Demonstrated

1. **Multi-stage builds**: Separates dependency installation from final image for optimization
2. **Port mapping**: Maps container port 8080 to host port 8080
3. **npm ci**: Uses `npm ci` for cleaner, faster, and more reliable installs in CI/CD
4. **.dockerignore**: Excludes node_modules and other unnecessary files for faster builds
5. **Alpine Linux**: Uses lightweight Alpine base image to reduce image size

## Running Locally Without Docker

You can also run the application without Docker:

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Or run directly with Node:

```bash
node server.js
```

## Comparing to Other Languages

This Node.js backend is structured similarly to the Go backend example, making it easy to compare:

- **Go backend**: Compiles to a single binary, very small final image (~10-15MB)
- **Node.js backend**: Requires Node runtime, larger image (~120-150MB) but still optimized
- **Same endpoints**: Both implement identical API endpoints for easy comparison
- **Same port**: Both run on port 8080
