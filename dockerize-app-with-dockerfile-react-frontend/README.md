# React Frontend Docker Tutorial

This is a simple React frontend application demonstrating how to containerize a React application using Docker with nginx for production deployment.

## Project Structure

```
dockerize-app-with-dockerfile-react-frontend/
├── public/
│   └── index.html       # HTML template
├── src/
│   ├── App.js          # Main React component
│   ├── App.css         # Styling
│   └── index.js        # React entry point
├── package.json        # Node.js dependencies and scripts
├── nginx.conf          # Nginx configuration for production
├── Dockerfile          # Docker image build instructions
├── .dockerignore       # Files to exclude from Docker context
└── README.md           # This file
```

## Application Overview

This React application provides a user interface to test backend API endpoints:

- **Home Endpoint Test**: Calls `GET /` on the backend
- **Hello Endpoint Test**: Calls `GET /api/hello?name=YourName` with customizable name
- **Health Check Test**: Calls `GET /api/health` on the backend

**Note**: The app expects a backend running on `http://localhost:8080` (like the Go or Node.js backends in this tutorial).

## Building the Docker Image

To build the Docker image, run:

```bash
docker build -t react-frontend:latest .
```

### Understanding the Build Process

The Dockerfile uses a **multi-stage build** approach:

1. **Build Stage**: Uses `node:18-alpine` image
   - Installs all dependencies (including dev dependencies)
   - Builds the React app using `npm run build`
   - Creates optimized production bundle in `/app/build`

2. **Production Stage**: Uses `nginx:alpine` image
   - Copies custom nginx configuration (listening on port 3000)
   - Copies only the built static files from build stage
   - Results in a very small final image (typically ~25-30MB)
   - No Node.js runtime needed - just nginx serving static files

## Running the Container

Run the container:

```bash
docker run -p 3000:3000 react-frontend:latest
```

The application will be available at `http://localhost:3000`

### Running in Detached Mode

To run the container in the background:

```bash
docker run -d -p 3000:3000 --name react-frontend-app react-frontend:latest
```

## Testing the Application

1. **Start a backend server** (Go or Node.js backend on port 8080):
   ```bash
   # In another terminal, run either:
   cd ../dockerize-app-with-dockerfile-go-backend
   docker run -p 8080:8080 go-backend:latest

   # OR
   cd ../dockerize-app-with-dockerfile-node-backend
   docker run -p 8080:8080 node-backend:latest
   ```

2. **Open the React app** in your browser:
   ```
   http://localhost:3000
   ```

3. **Test the endpoints** using the UI buttons

**CORS Note**: When running the frontend and backend in separate containers, you may encounter CORS issues. For production, you would typically:
- Run both frontend and backend behind a reverse proxy
- Configure CORS headers on the backend
- Or deploy them to the same domain

## Docker Commands Cheat Sheet

```bash
# Build the image
docker build -t react-frontend:latest .

# Run the container
docker run -p 3000:3000 react-frontend:latest

# List running containers
docker ps

# Stop the container
docker stop react-frontend-app

# Remove the container
docker rm react-frontend-app

# View container logs
docker logs react-frontend-app

# Remove the image
docker rmi react-frontend:latest
```

## Key Docker Concepts Demonstrated

1. **Multi-stage builds**: Build stage (Node.js) + Production stage (nginx)
2. **Static file serving**: Using nginx to serve built React files
3. **Custom nginx config**: Configured to listen on port 3000 instead of default 80
4. **Minimal final image**: Only contains nginx and static files, no Node.js runtime
5. **Production optimization**: React build creates optimized, minified bundles
6. **.dockerignore**: Excludes node_modules and build artifacts for faster builds

## Running Locally Without Docker

You can also run the application without Docker:

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000 by default)
npm start
```

Or build for production:

```bash
# Build the app
npm run build

# Serve the build folder using a static server
npx serve -s build -l 3000
```

## Port Configuration

- **Frontend**: Port 3000
- **Backend**: Port 8080 (Go or Node.js)

This separation makes it clear which service you're connecting to when testing.

## Comparing to Backend Examples

This React frontend demonstrates different Docker patterns compared to the backends:

| Aspect | Go/Node Backend | React Frontend |
|--------|----------------|----------------|
| **Runtime in final image** | Yes (binary/Node.js) | No (just static files) |
| **Web server** | Built-in HTTP server | nginx |
| **Build complexity** | Simple compilation/install | Build + transpile + bundle |
| **Final image size** | Go: ~10-15MB, Node: ~120MB | ~25-30MB |
| **Port** | 8080 | 3000 |

The frontend showcases how to:
- Build a JavaScript application inside Docker
- Serve static files with nginx
- Create extremely small production images
- Separate build-time from runtime dependencies
