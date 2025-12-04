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
- **Express Backend**: API server
- **React Frontend**: Client application

## 1. Overview of the Application

Explain:
- `server/` - Express backend with PostgreSQL connection
- `client/` - React frontend (Vite)

## 2. Create the server Dockerfile

Steps:
- Create Dockerfile in `server/` directory
- Fill out the instructions, explaining as you go

## 3. Create the Docker Compose configuration for the server and database

Steps:
- Create docker compose.yml file in root project directory
- Create the server configuration, explaining as you go
- Create the database configuration, explaining as you go

## 4. Demo the app so far

```bash
docker compose up --build
```

Explain:
- Building images for server and database
- Docker logs - shows running index.js (the server) with node
- Docker logs - shows server is running on port 3000
- Docker logs - shows database is initialized successfully
- /api/health - confirms the server is running

## 5. Create the Frontend Dockerfile

Steps:
- Create Dockerfile in `frontend/` directory
- Fill out the instructions, explaining as you go

## 6. Update the docker compose.yml with the client configuration

Steps:
- Create the client configuration, explaining as you go

## 7. Build and Run with Docker Compose

First, CTRL+C twice to stop the existing running containers. Then, rebuild with:

```bash
docker compose up --build
```

In a separate terminal:
```bash
docker compose ps
```

Explain what's happening:
- Now all three containers are running - client, server, database
- The client app is now accessable through localhost

Open browser to `http://localhost:5173`

Demonstrate:
- Add a few todo items
- Mark items as completed
- Delete items
- Show data persists (refresh page)

## 8. Demo detached mode

First, CTRL+C twice to stop the existing running containers.

Run the containers in detached mode and view logs:

```bash
docker compose up --build -d
docker compose logs
```

We can also watch logs for a specific container:

```bash
docker compose logs server
```

We can even watch logs as they appear in real time:

```bash
docker compose logs -f server
```

Let's take down the containers - we have to use a command to do it versus using CTRL+C:

```bash
docker compose down
```

Explain:
- Stops and removes containers
- Database data persists in named volume

Clean up volumes with -v flag:

```bash
docker compose down -v
```

Database data will no longer exist when rebuilt. Recreate the containers:

```bash
docker compose up --build
```

The data that was previously entered is no longer available.

## 9. Bind mounts and hot reload

First, explain what hot reloading is. Then, CTRL+C twice to stop the existing running containers. Let's add hot reloading to the server:
- Add bind mount to server service
- Explain what nodemon is and briefly go over `nodemon.json`
- Switch server Dockerfile to use `npm run dev` instead of `npm start`
- Go to server/index.js and add the timestamp line to the health check endpoint

Next, let's add hot reloading to the client.
- Add bind mount to client service
- Edit vite config to include usePolling
- Make a demo change on the client app, e.g. change the title on the page

## 10. Docker exec

Sometimes, we need to manually inspect or edit the database in our applications. The ideal solution would be to add the "pgAdmin" container and make changes through the web UI, but for a more simple solution we can just edit the database through a command line.

First, in a new terminal window, let's run `docker ps` to show that the database container is running:

```bash
docker ps
```

We can see that the database is up. Let's connect to it by using a command called `docker exec` - this lets us execute any command inside of a docker container. In this case, we will execute the `psql` command to allow us to edit the postgres database inside of the container. We'll authenticate with the database using the credentials we passed to the container in `docker-compose.yml` through environment variables:

```bash
docker compose exec db psql -U demouser -d demodb
```

"docker compose exec" - first command, executes "exec"
"db" - the container to execute the command in
"psql" - the command to execute
"-U demouser -d demodb" - arguments passed to the command, specifies a user and database for postgres

Now, let's show all tables with a postgres command:

```bash
/dt
```

Let's view our todos table:

```bash
SELECT * FROM todos;
```

Let's update a todo in the running container:

```bash
UPDATE todos SET title = 'Modified through psql' WHERE id = {id};
```

The change should have reflected in the database, let's confirm:

```bash
SELECT * FROM todos WHERE id = {id};
```

Refresh the browser and view the updated todo.

Explain:
- We can use this to create, read, update, and delete any record we have in our running database container through SQL queries
- We can add a pgAdmin service to make this more user friendly through a web interface