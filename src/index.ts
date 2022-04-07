import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { errorHandler } from './middlewares/error_handler';
import { logError } from './middlewares/log_error';
import { router } from './network/router';
import swaggerUi from "swagger-ui-express";

const swaggerDocs = require('../swagger.json');
const app = express();
const PORT = config.api.port;

// auth
require('./auth');

//routes 
router(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//middlewares 
app.use(express.json());
app.use(logError);
app.use(errorHandler)

// db
mongoose.connect(config.db.uri, (err) => {
    if(err) console.error(err);
    else console.log('db connected :D')
});

app.listen(PORT, () => {
    console.log(config.db.uri)
    console.log(`server on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('App on docker container :D');
});