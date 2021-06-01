### Important General Information

- Don't use env vars to store secrets
    - See Docker [blog post](https://diogomonica.com/2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/)
- Use docker scan to scan containers for vulns

    `docker scan <image-name>`

### Running a container:

`docker run -dp 3000:3000 docker/getting-started`

where **-d** is for detached mode to run the container in the background, **-p 3000:3000** is for mapping ports 3000 on the host to port 3000 in the container, and **docker/getting-started** is the image to use. The referenced image can be <source>/<imagename>:<version> (e.g., jftorres/getting-started:latest)

### Working with images and containers:

- Create a Dockerfile

```jsx
FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
```

We instructed the builder that we wanted to start from the `node:12-alpine` image. But, since we didn't have that on our machine, that image needed to be downloaded.

After the image was downloaded, we copied in our application and used `yarn` to install our application's dependencies. The `CMD` directive specifies the default command to run when starting a container from this image.

The Dockerfile in the above example has an issue though; yarn dependencies are reinstalled every time the image is rebuilt. To fix this, the Dockerfile should be restructured. For Node-based apps, dependencies are defined in `package.json`, meaning that file can be copied in first, dependencies can be installed, and then everything else can be copied in. Dependencies for yarn are only created when `package.json` is changed:

```jsx
FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "src/index.js"]
```

A file named `.dockerignore` should be created in the same directory as `Dockerfile` with the following contents:

```jsx
node_modules
```

This means `node_modules` will be omitted in the second `COPY` step.

These changes will speed up image build time because dependencies will be cached upon each rebuild.

- Build the image

    `docker build -t <tag> .`

    Notes:

    The `-t` flag tags our image. Think of this simply as a human-readable name for the final image. Since we named the image `getting-started`, we can refer to that image when we run a container.

    The `.` at the end of the `docker build` command tells that Docker should look for the `Dockerfile` in the current directory.

- Stopping & removing containers and images

    *Note: Containers and images can be removed from the Docker Dashboard*

    Containers must be stopped/removed prior to removing the referenced image.

    - List containers

        `docker container ls`

    - Stop the container

        `docker stop <container_id>`

    - Stop and remove the container

        `docker rm -f <container_id>`

    - Remove the image

        `docker remove <image_id>`

- Pushing images
    - Login to docker

        `docker login -u <docker_username>`

    - Tag the image

        `docker tag <local_image_name> <docker_username>/<image_name_to_publish>`

    - Push the image

        `docker push <docker_username>/<image_name_to_publish>`

    - Run the image

        `docker run -dp 3000:3000 <docker_username>/<published_imagename>`

- Executing commands

    `docker exec <container_id> ls /etc/hosts`

### Persisting data:

There are two ways to persist data, Named Volumes and Bind Mounts. The table below highlights the main differences:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/053e200c-425e-4778-a41b-eecf6dfbb296/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/053e200c-425e-4778-a41b-eecf6dfbb296/Untitled.png)

**Named Volumes**

- Create a named volume

    `docker volume create <volume_name>`

- Mount a volume to a container

    `docker run -dp 3000:3000 -v <volume_name>:/path/to/directory/incontainer <container_name>`

    Note: A volume is created on the host machine which persists data written in the path within the container specified in the above command. This means the container can be removed, but data will persist for when the container is rebuilt and reran.

**Bind Mounts**

With **bind mounts**, we control the exact mountpoint on the host. We can use this to persist data, but is often used to provide additional data into containers. When working on an application, we can use a bind mount to mount our source code into the container to let it see code changes, respond, and let us see the changes right away.

For Node-based applications, [nodemon](https://npmjs.com/package/nodemon) is a great tool to watch for file changes and then restart the application. There are equivalent tools in most other languages and frameworks.

- Run a container with a bind mount

```jsx
docker run -dp 3000:3000 \
    -w /app -v "$(pwd):/app" \
    node:12-alpine \
    sh -c "yarn install && yarn run dev"
```

- `dp 3000:3000` - run in detached (background) mode and create a port mapping
- `w /app` - sets the "working directory" or the current directory that the command will run from
- `v "$(pwd):/app"` - bind mount the current directory from the host in the container into the `/app` directory
- `node:12-alpine` - the image to use
- `sh -c "yarn install && yarn run dev"` - we're starting a shell using `sh` (alpine doesn't have `bash`) and running `yarn install` to install *all* dependencies and then running `yarn run dev`. If we look in the `package.json`, we'll see that the `dev` script is starting `nodemon`

### Multi-Container Apps

**Container networking**

Create a network

`docker network create todo-app`

Start a container and attach it to the network

```jsx
docker run -d \
    --network todo-app --network-alias mysql \
    -v todo-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=todos \
    mysql:5.7
```

### Using Docker Compose

Check docker compose version (necessary for creating compose file)

`docker-compose version`

Creating a compose file

See [Compose File reference](https://docs.docker.com/compose/compose-file/)

```yaml
version: "3.7"

services:
  app:
    image: node:12-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:5.7
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```

Note: When defining the volume in `volumes`, by not specifying a mountpoint, Docker uses the default options. See [this](https://docs.docker.com/compose/compose-file/#volume-configuration-reference) for more options.

A Docker compose file basically combines docker run commands and allows for the building of multi-container apps with one command. In the example above, the following commands are translated into to Docker compose syntax:

Creating the main app container:

```jsx
docker run -dp 3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:12-alpine \
  sh -c "yarn install && yarn run dev"
```

Creating a MySQL container:

```jsx
docker run -d \
  --network todo-app --network-alias mysql \
  -v todo-mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=todos \
  mysql:5.7
```

Starting the app:

`docker-compose up -d`

*Note: The app stack can be seen in Docker Dashboard*

Tearing down the app:

`docker-compose down`

*Note: named volumes are not removed when running docker-compose down, add the `--*volumes` *flag to remove volumes.*

### Troubleshooting

Viewing logs (can also be viewed in Docker Dashboard)

`docker logs -f <container_id>`

Troubleshooting/debugging networking issues

`docker run -it --network todo-app nicolaka/netshoot`

where `--network` refers to a docker network with the containers to troubleshoot

Troubleshooting docker-compose

`docker-compose logs -f`

Troubleshooting images

`docker image history <image-name>`
