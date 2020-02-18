import { Routes } from "./routes/appRoutes";

const cors = require('cors');
const http = require('http')
const express = require('express')
const app = express();

app.use(cors());

var routePrv = new Routes();
routePrv.routes(app);

http.createServer(app).listen(3000);