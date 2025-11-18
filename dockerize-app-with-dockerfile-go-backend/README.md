# Go Backend Docker Tutorial

This is a simple Go backend application demonstrating how to containerize a Go application using Docker.

## Project Structure

```
dockerize-app-with-dockerfile-go-backend/
├── main.go          # Go application source code
├── go.mod           # Go module definition
├── Dockerfile       # Docker image build instructions
├── .dockerignore    # Files to exclude from Docker context
└── README.md        # This file
```

## Application Overview

This is a simple HTTP server that provides three endpoints:

- `GET /` - Welcome message
- `GET /api/hello?name=YourName` - Personalized greeting
- `GET /api/health` - Health check endpoint

## Building the Docker Image

To build the Docker image, run:

```bash
docker build -t go-backend:latest .
```

### Understanding the Build Process

The Dockerfile uses a **multi-stage build**:

1. **Build Stage**: Uses `golang:1.21-alpine` image to compile the Go application
   - Copies source code and dependencies
   - Builds a static binary with `CGO_ENABLED=0`

2. **Final Stage**: Uses minimal `alpine:latest` image
   - Copies only the compiled binary from the build stage
   - Results in a much smaller final image (typically ~10-15MB vs ~300MB+)

## Running the Container

Run the container:

```bash
docker run -p 8080:8080 go-backend:latest
```

The application will be available at `http://localhost:8080`

### Running in Detached Mode

To run the container in the background:

```bash
docker run -d -p 8080:8080 --name go-backend-app go-backend:latest
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
docker build -t go-backend:latest .

# Run the container
docker run -p 8080:8080 go-backend:latest

# List running containers
docker ps

# Stop the container
docker stop go-backend-app

# Remove the container
docker rm go-backend-app

# View container logs
docker logs go-backend-app

# Remove the image
docker rmi go-backend:latest
```

## Key Docker Concepts Demonstrated

1. **Multi-stage builds**: Reduces final image size by separating build and runtime environments
2. **Port mapping**: Maps container port 8080 to host port 8080
3. **Static compilation**: Uses `CGO_ENABLED=0` for a fully static binary that works in minimal environments
4. **.dockerignore**: Excludes unnecessary files from the build context for faster builds

## Running Locally Without Docker

You can also run the application without Docker:

```bash
go run main.go
```

Or build and run the binary:

```bash
go build -o main .
./main
```
