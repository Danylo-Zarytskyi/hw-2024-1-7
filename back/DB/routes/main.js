import { Router } from 'express';
import User from '../models/User.js';


const router = Router();

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/profile', async (req, res) => {
    const { uid } = req.session;
    if(!uid) {
        return res.json({ status: 'something went wrong', user: `unknown`})
    }
    res.json({ status: 'succesfull', user: `uid: ${uid}`});
});

router.get('/login', async (req, res) => {
    const UID = Math.floor(Math.random() * 100);
    req.session.uid = UID;
    res.json({ status: 'succesfull'});
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.json({ status: 'succesful', message: 'Logged out'});
});



export default router;
