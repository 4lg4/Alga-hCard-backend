/**
 * Created by www.Alga.me on 28/2/18.
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';

import aap from './AlgaAsyncProcess';
import auid from './AlgaUID';


const app = express();
const defaults = {
    port: 3000
};

export default class Server {
    constructor(props = {}) {
        this.props = props;
        this.props.port = this.props.port || defaults.port;
        // console.log('PROPS ', defaults);
        // console.log('PROPS ', props);
        // console.log('PROPS ', this.props);

        this._initializeServer();
    }

    // private
    _error({ req, res, message }) {
        return res.status(500).send({ message });
    }

    _success(data) {
        const { req, res, json, status, html } = data;
        const send = (html) ? html : json;
        return res.status(status | 200).send(send);
    }

    _initializeServer(){

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        // frontend serving config
        app.use('/', express.static(path.join(__dirname, '../frontend')));
        app.set('views', path.join(__dirname, '../frontend'));
        app.set('view engine', 'ejs');

        this._initializeServerRoutes();

        app.listen(this.props.port, ()=>{
            console.log(`App listening on port ${this.props.port}!`);
        });
    }

    _getUid(req, res){
        // cookie session id
        let uid = req.cookies['__[hCard]__'];
        if(!uid) {
            uid = auid();
            res.cookie('__[hCard]__', uid, {
                expires: new Date(new Date().getTime() + (35000 * 24 * 60 * 60 * 1000)),
                // httpOnly: true
            }); // 100 years
        }

        return uid;
    }

    _initializeServerRoutes(){
        app.get('/', async (req, res)=>{
            const uid = this._getUid(req, res);
            const [error, html] = await aap(this.getFrontend({ uid }));

            console.log('_initializeServerRoutes', error, html);

            if(error){
                return this._error({ req, res, message: error });
            }

            if(!html) {
                return this._error({ req, res, message: 'Missing html' });
            }

            return this._success({ req, res, html });
        });

        app.post('/update', async (req, res)=>{
            console.log('\n\n\n');
            console.log('onUpdate headers', req.headers);
            console.log('onUpdate query', req.query);
            console.log('onUpdate body', req.body);


            const uid = this._getUid(req, res);
            const [error, message] = await aap(this.onUpdate({ payload: req.body, uid }));

            if(error){
                return this._error({ req, res, message: error });
            }

            return this._success({ req, res, json: { message } });
        });

        app.post('/submit', async (req, res)=>{
            console.log('\n\n\n');
            console.log('onSubmit headers', req.headers);
            console.log('onSubmit query', req.query);
            console.log('onSubmit body', req.body);

            const uid = this._getUid(req, res);
            const [error, message] = await aap(this.onSubmit({ payload: req.body, uid }));

            if(error){
                return this._error({ req, res, message: error });
            }

            // return this.getFrontend(message);
            res.redirect('/');
        });
    }
}

