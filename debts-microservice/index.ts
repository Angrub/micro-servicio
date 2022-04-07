import express from 'express';
import mongoose from 'mongoose';
import { debtRouter } from './debts/router';

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || '';

app.use(express.json());
app.use('/debts', debtRouter);  

mongoose.connect(MONGO_URL, (err) => {
    if(err) console.error(err);
    else console.log('db mc connected :D');
});

app.listen(PORT, () => {
    console.log(`microservice on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('my first microservice on docker :D');
});