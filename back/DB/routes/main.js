import { Router } from 'express';
import User from '../models/User.js';
import * as auth from './../ctrls/auth.js';

const router = Router();

router.get('/', async (req, res) => {
    res.render('index');
});


router.get('/login', async (req, res) => {
    const uid = 10;

    const token = auth.createJWT({ iss: uid });

    res.json({ status: 'ok', token });
});

router.get('/removeAll', async (req, res) => {
    const jwt = 'eyJhbGciOiJSUzUxMiJ9.eyJpc3MiOjEwfQ.J4hWXwLB9Suo50B8GVJZ3_wvewq3wFE3_3cvh9nUDgDxasnvM3YPjRRjPTH3zzsbWC3qvsKtLdTo8kz9Q0e-W8SuZ8sRS112KGmud3f3ER6AxhxLX-Qa59oxF-3PK62DoDMLMcwFpIf2eazBpsDq4ICP2F5tUcR7RHI-AJ092GnBgT5A84G4RTwtj2rqZXEON2ne35ecyhJeSV3hHaURhUoUqukL-M6IiB_RSjA9Ltbc8eSCz1s0xiAcxOCRAD1Dbm8X8TldPPK92Dv4MJkwsjvBqrLtveLqQoyGeN8_2294TSgf33EZcABGuTdVaKnlDj3Cy0ZPKOhawgo9atK1Zw';

    const result = auth.checkJWT(jwt);

    if(!result) {
        res.json({ status: 'invalid token'});
        return;
    } 

    const { payload } = auth.decodeJWT(jwt);
    const data = JSON.parse(payload)
    console.log(data);

    res.json({ status: 'ok', jwt });
});

router.get('/', async (req, res) => {
    
});



export default router;
