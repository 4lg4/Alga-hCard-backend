/**
 * Created by www.Alga.me on 28/2/18.
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';
import { URL } from 'url';

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
        let uid = req.cookies['__[hCard]__'] || new URL(req.headers.referer).searchParams.get('s'); // added session id as a query string because the update call wasn't sending the cookies in the headers
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

            // added session id as a query string because the update call wasn't sending the cookies in the headers
            if(!req.query.s) {
                return res.redirect(`/?s=${uid}`);
            }

            const [error, hCardProps] = await aap(this.getFrontend({ uid }));

            if(error){
                return this._error({ req, res, message: error });
            }

            if(!hCardProps) {
                return this._error({ req, res, message: 'Missing hCardProps' });
            }

            return res.render('index', { hCardProps: JSON.stringify(hCardProps) }, (error, html) => {
                if (error) {
                    return this._error({ req, res, message: error });
                }

                return this._success({ req, res, html });
            });
        });

        app.post('/update', async (req, res)=>{
            const uid = this._getUid(req, res);
            const [error, message] = await aap(this.onUpdate({ payload: req.body, uid }));

            if(error){
                return this._error({ req, res, message: error });
            }

            return this._success({ req, res, json: { message } });
        });

        app.post('/submit', async (req, res)=>{
            const uid = this._getUid(req, res);
            const [error, html] = await aap(this.onSubmit({ payload: req.body, uid }));

            if(error){
                return this._error({ req, res, message: error });
            }

            res.set('Content-Disposition', 'inline');
            res.set('Content-Disposition', 'attachment');
            res.set('Content-Disposition', `attachment; filename="${uid}.hcard"`);
            res.send(html);
        });
    }
}

