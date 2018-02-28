/**
 * Created by www.Alga.me on 27/2/18.
 */
/**
 * Created by alga on 9/28/16.
 */

import mongodb from 'mongoose';
import aap from './AlgaAsyncProcess';

// Use native promises
mongodb.Promise = global.Promise;

const Types = mongodb.Schema.Types;
const schema = new mongodb.Schema({
    id: Types.String,
    data: Types.Mixed
});

export default class MongoDriver {
    constructor(props={}){
        this.props = props;

        if(!this.props.host || !this.props.host || !this.props.port || !this.props.db) {
            throw new Error('Error host / port / db, are required. Missing');
        }

        this.props.schema = schema;
        this.model = mongodb.model('hCard', this.props.schema);
    }

    async set({ id, data }) {
        if(err){
            throw new Error('id is required');
        }

        await this._getConn();
        const [err, item] = await aap(this.model.findOne({ id }));
        if(err){
            throw new Error(err);
        }

        // update record
        if(item) {
            const [errUpdateItem, updated] = await aap(
                this.model.update(
                    { id },
                    Object.assign({},item,data)
                )
            );

            if(errUpdateItem){
                throw new Error(errUpdateItem);
            }

            return true;
        }

        // new record
        let newItem = new this.model({ id, data });

        const [errNewItem, itemCreated] = await aap(newItem.save());
        if(errNewItem){
            throw new Error(errNewItem);
        }

        return true;
    }

    async get(data) {
        if(!data) {
            throw new Error('id is required');
        }

        const id = (typeof data === 'string') ? data : data.id;

        await this._getConn();
        const [err, item] = await aap(this.model.findOne({ id }));
        if(err){
            throw new Error(err);
        }

        if(!item) {
            return false;
        }

        return item;
    }

    // TODO: implement
    async destroy(data){
        if(!data) {
            throw new Error('id is required');
        }

        const id = (typeof data === 'string') ? data : data.id;

        const [err, item] = await aap(this.model.find({ id }).remove());
        if(err){
            throw new Error(err);
        }

        return true;
    }

    // mongodbdb://$user:$pwd@$host:$port/$db
    _getConnString(){
        let userCreds = '';
        if(this.props.user && this.props.pwd){
            userCreds = `${this.props.user}:${this.props.pwd}@`;
        }

        return `mongodb://${userCreds}${this.props.host}:${this.props.port}/${this.props.db}`;
    }

    async _getConn(){
        // connection already open
        if(mongodb.connection.readyState) {
            return Promise.resolve(true);
        }

        const [err,result] = await aap(mongodb.connect(this._getConnString()));
        if(err) {
            throw new Error(err);
        }

        return true;
    }

}
