/**
 * Created by www.Alga.me on 27/2/18.
 */

import Server from './lib/Server';
import MongoDriver from './lib/MongoDriver';
import {update, genCard, getIndex} from './lib/Service';

// import ApiDriver from './lib/ApiDriver'; // TODO: API driver implemented still missing the service for it

import env from './env.json';

const db = new MongoDriver(env.drivers.mongodb);
// const db = new ApiDriver(env.drivers.api); // TODO: API driver implemented still missing the service for it

const server = new Server({
  env,
  port: process.env.PORT || false
});

server.getFrontend = ({uid, payload})=> getIndex({id: uid, payload, db});
server.onUpdate = ({uid, payload})=> update({id: uid, payload, db});
server.onSubmit = ({uid, payload})=> genCard({id: uid, payload, db});
