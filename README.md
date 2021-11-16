# Data Storage Example App

[![CircleCI](https://circleci.com/gh/nyu-software-engineering/data-storage-example-app/tree/master.svg?style=shield)](https://circleci.com/gh/nyu-software-engineering/data-storage-example-app/tree/master)

This repository contains a client app built with React and a server app built with Express.js.

The front-end and back-end code together show how to use simple Cookie and LocalStorage technologies - data storage tools available within the web browser.

We also show how to deal with login and authorization using JWT.

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

## Run the back-end

Navigate into the `back-end` directory and...

### Setup environmental variables

Copy the file named `.env.example` into a new file named simply, `.env`.

Make sure the `FRONTEND_DOMAIN` setting in this file specifies the correct domain and port where the React front-end app is running.

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

## Try it out

### Front-end

Open the front-end in your favorite web browser (most likely this will have popped open automatically). Open the browser's `Developer Tools`:

- use the `Console` tab to see any debugging output from the Javascript code running in the browser.
- use the `Network` tab to see details of all HTTP requests and responses to/from the back-end server. In particular, look at the cookie and authorization-related HTTP headers.

### Back-end

Watch the debugging output on the back-end to show incoming requests and their response codes.
