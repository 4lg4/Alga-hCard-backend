/**
 * Created by www.Alga.me on 27/2/18.
 */

import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';

import env from 'env.json';


if(env) {

}

// const cookieParser = require('cookie-parser');

const app = express();
// app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use('/', express.static(path.join(__dirname, 'frontend')));
app.set('views', path.join(__dirname, 'frontend'));
app.set('view engine', 'ejs');
app.get('/', (req, res)=>{
    const hCardProps = JSON.stringify({
        givenName: 'Sam',
        surname: 'Fairfax',
        email: 'sam.fairfax@fairfaxmedia.com.au',
        phone: '0292822833',
        houseNumber: '100',
        street: 'Harris Street',
        suburb: 'Pyrmont',
        state: 'NSW',
        postcode: '2009',
        country: 'Australia'
    });

    res.render('index', { hCardProps }, (error, html)=>{
        if(error){
            return res.status(500).send({ error });
        }

        res.send(html);
    });
});

app.post('/update', (req, res)=>{
    console.log(req.body);
    res.send('OK');
});

app.post('/submit', (req, res)=>{
    console.log(req.body);
    res.send('OK');
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App listening on port ${process.env.PORT || 3000}!`);
});
