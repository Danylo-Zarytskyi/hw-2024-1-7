import express, { application } from 'express';
import path from 'node:path';
import logger from 'morgan';
import cors from 'cors';
import multer from 'multer';
import createError from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import mainRouter from '../routes/main.js';
import { mongo } from 'mongoose';

const upload = multer();
const app = express();
const mongoUrl = 'mongodb://127.0.0.1:27017/hw202417';


app.set('views', path.join(process.cwd(), './views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(process.cwd(), 'public')));

app.use(session({
    secret: '08y134gd80y1230dg9238jdu9b12w80yb28bc9e7',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl: mongoUrl })
}))

app.use('/', mainRouter);

app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res) => {
    console.log(err);
    res.render('error');
})

export default app;