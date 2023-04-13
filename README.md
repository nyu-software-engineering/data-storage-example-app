# Data Storage Example App

<!-- [![CircleCI](https://circleci.com/gh/nyu-software-engineering/data-storage-example-app/tree/master.svg?style=shield)](https://circleci.com/gh/nyu-software-engineering/data-storage-example-app/tree/master) -->

![Back-end badge](https://github.com/nyu-software-engineering/data-storage-example-app/actions/workflows/build-back.yaml/badge.svg)
![Front-end badge](https://github.com/nyu-software-engineering/data-storage-example-app/actions/workflows/build-front.yaml/badge.svg)

This repository contains a client app built with React and a server app built with Express.js.

The front-end and back-end code together show how to use simple Cookie and LocalStorage technologies - data storage tools available within the web browser. We also show how to deal with login and authorization using JWT.

Both the front-end and back-end are optionally containerized using Docker.

## Run the database

To quickly set up a MongoDB database for use with this app, we use [Docker](https://www.docker.com), which must be

- install and run [docker desktop](https://www.docker.com/get-started)
- create a [dockerhub](https://hub.docker.com/signup) account

Start up a MongoDB database:

- run command, `docker run --name mongodb_dockerhub -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest`

You now have a MongoDB database running on `localhost` port `27017`, with an `admin` user account with password, `password`

## Run the front-end

Navigate into the `front-end` directory and...

### Setup environmental variables

Copy the file named `.env.example` into a new file named simply, `.env`.

Make sure the `REACT_APP_BACKEND` setting in this file specifies the correct domain and port where the Express back-end app is running.

```javascript
REACT_APP_BACKEND=http://localhost:3000
```

Note that the React server will have to be completely stopped and re-started if you change these variables while it is running.

### Install dependencies

```bash
npm install
```

### Start the front-end app

```bash
npm start
```

Note the port that the React app starts on... you'll need this in setting up environmental variables for the back-end.

#### Potential OpenSSL error

Depending on your version of Node.js, you may see an error mentioning something about "digital envelop routines" when running `npm start`. This error can be resolved by setting an environment variable to support legacy OpenSSL providers prior to running `npm start`. See [this discussion](https://stackoverflow.com/questions/74726224/opensslerrorstack-error03000086digital-envelope-routinesinitialization-e) for details.

### Start the front-end app as a container

Alternatively, the front-end can be started as a Docker container.

First, make sure Docker has been installed locally, and then run:

```bash
docker run -p 4000:4000 -d bloombar/data-storage-example-app-front-end
```

The containerized front-end app should now be running as a background daemon on `http://localhost:4000`.

## Run the back-end

Navigate into the `back-end` directory and...

### Setup environmental variables

Copy the file named `.env.example` into a new file named simply, `.env`.

Make sure the `FRONT_END_DOMAIN` setting in this file specifies the correct domain and port where the React front-end app is running.

```javascript
FRONT_END_DOMAIN=http://localhost:3001
```

### Install dependencies

```bash
npm install
```

### Install nodemon

Use the `-g` flag to install nodemon globally:

```bash
npm install -g nodemon
```

### Start the back-end app

Start the express server using `nodemon`:

```bash
nodemon server
```

### Start the front-end app as a container

Alternatively, the back-end can be started as a Docker container.

First, make sure Docker has been installed locally, and then run:

```bash
docker run -p 3000:3000 --restart unless-stopped -d bloombar/data-storage-example-app-back-end
```

The containerized back-end app should now be running as a background daemon on `http://localhost:3000`.

## Try it out

### Front-end

Open the front-end (`http://localhost:4000`) in your favorite web browser (this should have popped open automatically, unless running the containerized version of the app). Open the browser's `Developer Tools`:

- use the `Console` tab to see any debugging output from the Javascript code running in the browser.
- use the `Network` tab to see details of all HTTP requests and responses to/from the back-end server. In particular, look at the cookie and authorization-related HTTP headers.

### Back-end

Watch the debugging output on the back-end to show incoming requests and their response codes.

## Test it

Unit tests built with [mocha](https://mochajs.org/) and the [chai](https://www.chaijs.com/) assertion library (with the [chai-http](https://www.chaijs.com/plugins/chai-http/) plugin to simplify testing back-end routes) are included for the back-end. Code coverage analysis is provided by the `nyc` module. The `package.json` file contains scripts to run both.

Run unit tests:

```bash
npx mocha
```

Run code coverage:

```bash
npm run coverage
```
