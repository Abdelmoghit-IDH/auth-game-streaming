const express = require('express');
const userModule = require('./index');
const http = require('http')
const app = express();
/**
 * Setup the datastore using any of the currently supported database adapters:
 *   - mongoose: for MongoDB
 *   - sequelize: for any of the other supported database engines:
 *     MySQL | MariaDB | SQLite | Microsoft SQL Server | Postgres | In-memory DB
 *     (See the section on "Built-in data stores" for supported database engines)
 */
const dbAdapter = 'sequelize'; // OR 'sequelize'
const store = userModule.getDbAdapter(dbAdapter);

// Bind the routes under [apiMountPoint] (default: ***/api/users***):
userModule.listen(app, apiMountPoint = '/api/users', customRoutes = {});

(async function() {
  const server = http.createServer(app);

  // Establish a connection to the data store
  // Ensure the db is connected before binding the server to the port
  await store.connect({
    host: "authentication-db-do-user-9691578-0.b.db.ondigitalocean.com", // optional, default: 'localhost'
    port: '25060', // optional
    user: "doadmin", // optional
    pass: "AVNS_UNRVvhaZH8MgR6X", // optional
    engine: "MySQL", // optional if the adapter is "mongoose" or if the value is "memory" and the adapter is "sequelize"; required otherwise
    dbName: "defaultdb", // optional, default: 'users'
    debug: true, // optional, default: false
  });

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;

  // Proceed with normal server initialization tasks
  server.listen(PORT);
  //server.on('error', onError);
  //server.on('listening', onListening);
 })();