import { Routes } from "./routes/appRoutes";
import { ConfigService } from "./services/configService";
const path = require('path');

const configDirectoryPath = path.relative(__dirname, '/config');
console.log("Dir name: " + configDirectoryPath)
process.env['NODE_CONFIG_DIR'] = configDirectoryPath;

const cors = require('cors');
const http = require('http')
const express = require('express')
const app = express();

app.use(cors());

const routePrv = new Routes();
const config = new ConfigService();
routePrv.routes(app);

console.log("Configuration: " + JSON.stringify(config))
console.log("Config Port: " + config.getServerPort())

http.createServer(app).listen(config.getServerPort());