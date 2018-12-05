# service-reviews

## Setup

Run 'npm install' for dependencies.

Create a .env file with the following:

- DB_TYPE: Which database you're using. _Supported options: mysql, mongo_

If using MongoDB:

- MONGODB_URI: The URI of your server.

If using MySQL:

- MYSQL_DATABASE: The name of your database.
- MYSQL_USER: Your database username.
- MYSQL_PASSWORD: Your database password.
- MYSQL_HOST: Your database URL.
- MYSQL_PORT: Your database port number.

If running the client with the server, run 'npm run build-client' to bundle the files. If bundling the server, run 'npm run build-server' to bundle the server. Both should appear as dist/bundle.js in their respective directories. (KNOWN ISSUE: Running the server from the bundle makes it unable to serve the client.)

## Running the server

Use 'node server/src/index.js' (if running from source) or 'node server/dist/bundle.js' (if running from bundle) to run the server.

Enjoy!