# Running a Docker Container for a Vite-React App

This `README` provides instructions on how to build the Docker image and run the container for a React app created for POD using vite.

## Steps

### Using Docker

1. **Build the Docker image**: In a terminal, navigate to the root of your project directory and execute the command `docker build -t react-vite-pod .` to build the Docker image. This will create a new image using the `Dockerfile` and tag it with the specified `[image-name]`.

2. **Run the container**: To run the container, execute the command `docker run -p 5173:5173 --name proof-of-delivery --rm -d react-vite-pod`. This will start a container running the React app, mapping `[host-port]` on your local machine to `[container-port]` in the container (which should be the same as the port you specified in the `vite.config` file and `Dockerfile`). You can then access the app by navigating to `http://localhost:[host-port]` in your browser.

3. **Stop the container**: Run `docker stop proof-of-delivery`

### Using NPM
1. **Run a Vite Server**: `npm run dev`