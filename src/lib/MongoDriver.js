/**
 * Created by www.Alga.me on 27/2/18.
 */
import mongodb from 'mongoose';
import aap, {resolve, reject} from './AlgaAsyncProcess';

// Use native promises
mongodb.Promise = global.Promise;

const Types = mongodb.Schema.Types;
const schema = new mongodb.Schema({
  id: Types.String,
  data: Types.Mixed
});

export default class MongoDriver {
  constructor(props={}) {
    this.props = props;

    if (!this.props.host || !this.props.host || !this.props.port || !this.props.db || !this.props.collection) {
      return reject('Error host / port / db, are required. Missing');
    }

    this.props.schema = schema;
    this.model = mongodb.model(this.props.collection, this.props.schema);
  }

  async set({id, data}) {
    if (!id) {
      return reject('id is required');
    }

    await this._getConn();
    const [err, item] = await aap(this.model.findOne({id}).exec());
    if (err) {
      return reject(err);
    }

    // update record
    if (item) {
      const [errUpdateItem, updated] = await aap(
        this.model.update({id: id}, {data: Object.assign({}, item.data, data)})
      );

      if (errUpdateItem) {
        return reject(errUpdateItem);
      }

      return true;
    }

    // new record
    let newItem = new this.model({id, data});

    const [errNewItem, itemCreated] = await aap(newItem.save());
    if (errNewItem) {
      return reject(errNewItem);
    }

    return true;
  }

  async get(theId) {
    if (!theId && !theId.id) {
      return reject('id is required');
    }

    const id = (typeof theId === 'string') ? theId : theId.id;

    await this._getConn();
    const [err, item] = await aap(this.model.findOne({id}));
    if (err) {
      return reject(err);
    }

    if (!item) {
      return {};
    }

    return {id, data: item.data};
  }

  async destroy(theId) {
    if (!theId && !theId.id) {
      return reject('id is required');
    }

    const id = (typeof theId === 'string') ? theId : theId.id;

    await this._getConn();
    const [err, item] = await aap(this.model.find({id}).remove().exec());
    if (err) {
      resolve(err);
    }

    return true;
  }

  // mongodb://$user:$pwd@$host:$port/$db
  _getConnString() {
    let userCreds = '';
    if (this.props.user && this.props.pwd) {
      userCreds = `${this.props.user}:${this.props.pwd}@`;
    }

    return `mongodb://${userCreds}${this.props.host}:${this.props.port}/${this.props.db}`;
  }

  async _getConn() {
    // connection already open
    if (mongodb.connection.readyState) {
      return resolve(true);
    }

    const [err,result] = await aap(mongodb.connect(this._getConnString()));
    if (err) {
      return reject(err);
    }

    return true;
  }

}
