import express, { application } from 'express';
import path from 'node:path';
import logger from 'morgan';
import cors from 'cors';
import multer from 'multer';
import createError from 'http-errors';

import mainRouter from '../routes/main.js';

const upload = multer();
const app = express();


app.set('views', path.join(process.cwd(), './views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', mainRouter);

app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res) => {
    console.log(err);
    res.render('error');
})

export default app;