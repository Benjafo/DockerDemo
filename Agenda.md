# Part A: Docker Basics

### 1. Run a basic bash container

```
docker run -it ubuntu
```

### 2. Show container running status

In a separate terminal:

```
docker ps
```

The ubuntu container should appear.

### 3. Execute a few commands in the container

```
ls -l
touch /tmp/demo.file
echo "Hello!"
```

### 4. Observe docker logs

```
docker logs <container name>
```

Should see the `ls`, `touch`, and `echo` commands entered

# Part B: Docker Compose - Todo App

## Project Structure

The demo consists of three services:
- **PostgreSQL Database**: Stores todo items
- **Express Backend**: REST API server
- **React Frontend**: User interface

## 1. Overview of the Application

Show the project structure:
```bash
ls -la
```

Explain:
- `server/` - Express backend with PostgreSQL connection
- `client/` - React frontend (Vite)
- `docker-compose.yml` - Orchestrates all services

## 2. Show the Backend Dockerfile

```bash
cat server/Dockerfile
```

Highlight:
- Base image: `node:22-alpine`
- Installs dependencies
- Exposes port 3000
- Runs the Express server

## 3. Show the Frontend Dockerfile

```bash
cat client/Dockerfile
```

Highlight:
- Base image: `node:22-alpine`
- Installs dependencies
- Exposes port 5173
- Runs Vite dev server with `--host` flag

## 4. Show the docker-compose.yml

```bash
cat docker-compose.yml
```

Highlight key points:
- **db service**: PostgreSQL with environment variables and health check
- **server service**: Builds from `./server`, depends on db health
- **client service**: Builds from `./client`, connects to server
- **volumes**: Persist database data and enable hot reload

## 5. Build and Run with Docker Compose

```bash
docker-compose up --build
```

Explain what's happening:
- Building images for server and client
- Pulling PostgreSQL image
- Starting all three containers
- Database initializes automatically

## 6. Show Running Containers

In a separate terminal:
```bash
docker-compose ps
```

Should see all three services running.

## 7. Test the Application

Open browser to `http://localhost:5173`

Demonstrate:
- Add a few todo items
- Mark items as completed
- Delete items
- Show data persists (refresh page)

## 8. View Logs

```bash
docker-compose logs server
```

Show the database initialization and API requests.

## 9. Stop the Application

```bash
docker-compose down
```

Explain:
- Stops and removes containers
- Database data persists in named volume

## 10. Clean Up (Optional)

```bash
docker-compose down -v
```

Removes volumes (deletes database data).