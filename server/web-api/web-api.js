import express from 'express';

import questionsService from './services/questions-service';

const mongoose = require('mongoose')

const DATABASE_URL='mongodb://localhost:27017/scaleapp'

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

const app = express();

app.use(express.json())

app.get('/questions/random/{count}', (req, res) => {
    let result = questionsService.getRandomQuestions(req.count);    
    res.send(result);
});

app.get('/questions?area={area}&category={category}&searchedValue={searchedValue}', (req, res) => {
    let result = questionsService.questionsService(req.area, req.category, req.searchedValue);
    res.send(result);
});

app.get('/categories/{area}', (req, res) => {
    let result = caregoryService.getCategoriesByArea(req.area);
    res.send(result);
});

app.listen(3000, () => console.log('server started'))