import { Routes } from "./routes/appRoutes";
import { ConfigService } from "./services/configService";
// const path = require('path');

// const configDirectoryPath = path.join(__dirname, '../../config/');
// console.log("NODE_APP_INSTANCE: " + process.env.NODE_APP_INSTANCE)
// console.log("Dir name: " + configDirectoryPath)
// process.env['NODE_CONFIG_DIR'] = configDirectoryPath;

const cors = require('cors');
const http = require('http')
const express = require('express')
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../config/swagger.json');

app.use(cors());
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routePrv = new Routes();
const config = new ConfigService();
routePrv.routes(app);

console.log("Server started at Port: " + config.getServerPort());
console.log("Environment: " + process.env.NODE_ENV);

http.createServer(app).listen(config.getServerPort());