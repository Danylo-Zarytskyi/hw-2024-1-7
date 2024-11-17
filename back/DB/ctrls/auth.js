import fs from 'fs/promises';
import path from 'path';
import jws from 'jws';

const alg = 'RS512';

const rootdir = process.cwd();



const priv = await fs.readFile(path.join(rootdir, 'keys/priv.key'), 'utf-8');
const pub = await fs.readFile(path.join(rootdir, 'keys/pub.key'), 'utf-8');



const createJWT = (data) => {
    const payload = JSON.stringify(data);
    const header = { alg };

    const token = jws.sign({
        header: header,
        payload: payload,
        secret: priv,
    })

    console.log(token);
    return token;
}

const checkJWT = (jwt) => {
    const result = jws.verify(jwt, alg, pub);
    return result;
}

const decodeJWT = (jwt) => {
    const result = jws.decode(jwt);
    return result;
}

export { createJWT, checkJWT, decodeJWT }