/**
 * Created by www.Alga.me on 27/2/18.
 */

import Server from './lib/Server';
import MongoDriver from './lib/MongoDriver';
import env from './env.json';
import aap, { reject, resolve } from './lib/AlgaAsyncProcess';
import hCardTemplate from './lib/hCardTemplate';

// if(env) {
//
// }

const db = new MongoDriver(env.drivers.mongodb);

const server = new Server({
    env,
    port: process.env.PORT || false
});

server.getFrontend = async ({ uid, message })=>{
    let [err,result] = await aap(db.get({ id: uid }));
    if(err){
        return reject(err);
    }

    result = (result && result.data) ? result.data : {};
    result.id = uid;

    return resolve(result);
};


server.onUpdate = async ({ payload, uid })=>{
    const [err,result] = await aap(db.set({ id: uid, data: payload }));

    if(err){
        return reject(err);
    }

    return resolve('OK');
};

server.onSubmit = async ({ payload, uid })=>{
    const [err,result] = await aap(db.set({ id: uid, data: payload }));
    if(err){
        return reject(err);
    }

    const [errGet,resultGet] = await aap(db.get({ id: uid }));
    if(errGet || !resultGet){
        return reject('No user found');
    }

    return resolve(hCardTemplate(resultGet.data));
};
