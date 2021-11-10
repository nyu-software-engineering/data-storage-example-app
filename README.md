# Data Storage Example App

This repository contains a client app built with React and a server app built with Express.js.

The front-end and back-end code together show how to use simple Cookie and LocalStorage technologies - data storage tools available within the web browser.

I hope to add examples of server-side storage later...

## Run the front-end

Navigate into the `front-end` directory and...

Install dependencies:

```bash
npm install
```

Start the front-end app:

```bash
npm start
```

Note the port that the React app starts on.

## Run the back-end

Navigate into the `back-end` directory and...

In the file named `app.js`, modify the following line to match the port number where your front-end is running:

```javascript
app.use(cors({ origin: "http://localhost:3002", credentials: true })) // allow incoming requests only from a "trusted" host
```

Install dependencies:

```bash
npm install
```

Install `nodemon` globally:

```bash
npm install -g nodemon
```

Start the express server using `nodemon`:

```bash
nodemon server
```
