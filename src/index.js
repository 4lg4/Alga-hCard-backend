/**
 * Created by www.Alga.me on 27/2/18.
 */



import Server from './lib/Server';
import MongoDriver from './lib/MongoDriver';
import env from './env.json';
import aap, { reject, resolve } from './lib/AlgaAsyncProcess';

import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import App from './lib/App';
// const DOM = React.DOM;body = DOM.body, div = DOM.div, script = DOM.script;

// import browserify from 'browserify'
// const literalify = require('literalify')
// import * as main from './frontend/main';
// const main = require('./frontend/main');
// import Index from './frontend/index.html';
// import htmlTemplate from './lib/htmlTemplate';


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
    // let [err,result] = await aap(db.get({ id: uid }));
    // if(err){
    //     return reject(err);
    // }
    //
    // result = (result && result.data) ? result.data : {};
    // result.id = uid;

    console.log('getFrontend:', uid);
    // console.log('getFrontend:', message);
    // console.log('getFrontend:', result);

    // const body = renderToString(<div class="HcardApp" />);
    // const content = renderToString(
    //     <div class="HcardApp" />
    //     // React.createElement(
    //     //     window.hCard.default,
    //     //     hCardProps
    //     // ),
    //     // document.querySelector('.HcardApp')
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

    // browserify()
    //     .add('./frontend/main.js')
    //     .transform(literalify.configure({
    //         'react': 'window.React',
    //         'react-dom': 'window.ReactDOM',
    //     }))
    //     .bundle()
    //     .pipe((res)=>console.log('####### ', res));

    // console.log('####### ', main);
    // return resolve(htmlTemplate({ content }));
    // return resolve(renderToString(<App />));
    // const app = renderToString(React.createElement(
    //     main.hCard.default,
    //     {}
    // ));
    return resolve(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Live hCard Preview</title>
        
            <link href="css/bootstrap.min.css" rel="stylesheet" >
            <link href="css/main.css" rel="stylesheet">
        </head>
        
        <body>
            <div class="HcardApp">${''}</div>
            <script src="https://unpkg.com/react@15/dist/react.js"></script>
            <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
        </body>
        </html>
  `
    );
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
