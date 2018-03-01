/**
 * Created by alga on 9/28/16.
 */
import request from 'request-promise';
import aap, {resolve, reject} from './AlgaAsyncProcess';

const model = {
  id: '',
  data: {}
};

export default class ApiDriver {
  constructor(props={}) {
    this.props = props;

    if (!this.props.url || !this.props.token) {
      return reject('Error url / token');
    }
  }

  async set({id, data}) {
    if (!id || !data) {
      return reject('id and data are required');
    }

    const [errGet, item] = await aap(this.get(id));
    if (errGet) {
      return reject(errGet);
    }

    const [err, saved] = await await aap(
      this.send({
        method: 'POST',
        path: `/${id}`,
        body: {
          data: Object.assign({}, item.data, data)
        }
      })
    );

    if (err) {
      return reject(err);
    }

    if (this.props.test) {
      return saved;
    }

    return true;
  }

  async get(theId) {
    if (!theId && !theId.id) {
      return reject('id is required');
    }

    const id = (typeof theId === 'string') ? theId : theId.id;

    const [err, item] = await aap(this.send({path: `/${id}`}));
    if (err) {
      return reject(err);
    }

    if (this.props.test) {
      return item;
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

    const [err, item] = await aap(this.send({
      method: 'DELETE',
      path: `/${id}`
    }));

    if (err) {
      return reject(err);
    }

    if (this.props.test) {
      return item;
    }

    return true;
  }

  send({path, body, method}) {
    const options = {
      uri: `${this.props.url}${path}`,
      headers: {
        'Content-Type': 'application/json',
        'access_token': this.props.token
      },
      method: method || 'GET',
      body
    };

    if (this.props.debug) {
      console.log('--[debug]---------------');
      console.log(options);
      console.log('------------------------');
    }

    if (this.props.test) {
      return options;
    }

    return request(options);
  }

}
