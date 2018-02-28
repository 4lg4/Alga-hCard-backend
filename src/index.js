/**
 * Created by www.Alga.me on 27/2/18.
 */


import Server from './lib/Server';
import MongoDriver from './lib/MongoDriver';
import env from './env.json';
import aap, { reject, resolve } from './lib/AlgaAsyncProcess';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './lib/App';
import htmlTemplate from './lib/htmlTemplate';


// console.log(aap, reject, resolve);

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

    console.log('getFrontend:', uid);
    console.log('getFrontend:', message);
    console.log('getFrontend:', result);

    // const body = renderToString(<div class="HcardApp" />);
    // const content = renderToString(
    //     React.createElement(
    //         window.hCard.default,
    //         hCardProps
    //     ),
    //     document.querySelector('.HcardApp')
    // );

    // var hCardProps = ${hCardProps};
    // console.log('hCardProps', hCardProps);
    //
    // (function() {
    //     ReactDOM.render(
    //         React.createElement(
    //             window.hCard.default,
    //             hCardProps
    //         ),
    //         document.querySelector('.HcardApp')
    //     );
    // })();

    // return resolve(htmlTemplate({ content }));
    return resolve(renderToString(<App />));
};


server.onUpdate = async ({ payload, uid })=>{
    const [errGet,resultGet] = await aap(db.get({ id: uid }));
    if(errGet || !resultGet){
        return reject('No user found');
    }

    const [err,result] = await aap(db.set({ id: uid, data: payload }));
    if(err){
        return reject(err);
    }

    console.log('onUpdate:', result);

    return resolve(true);
};

server.onSubmit = async ({ payload, uid })=>{
    const [err,result] = await aap(db.set({ id: uid, data: payload }));
    if(err){
        return reject(err);
    }

    console.log('onSubmit:', result);

    return resolve(true);
};
