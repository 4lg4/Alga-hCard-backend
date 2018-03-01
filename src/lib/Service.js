/**
 * Created by www.Alga.me on 1/3/18.
 */
import ejs from 'ejs';
import path from 'path';

import aap, {reject, resolve} from './AlgaAsyncProcess';
import hCardTemplate from './hCardTemplate';

// [GET] HTML rendered file
module.exports.getIndex = async ({id, message, db}) => {
  let [err, hCardProps] = await aap(db.get(id));
  if (err) {
    return reject(err);
  }

  hCardProps = (hCardProps && hCardProps.data) ? hCardProps.data : {};
  hCardProps.id = id;
  hCardProps = JSON.stringify(hCardProps);

  let [errTemplate, resultTemplate] = await aap(
    new Promise((resolve,reject)=> {
      ejs.renderFile(path.join(__dirname, '../frontend/index.ejs'), {hCardProps}, null, (err, str)=> {
        if (err) {
          return reject(err);
        }

        resolve(str);
      });
    })
  );

  if (errTemplate) {
    return reject(errTemplate);
  }

  return resolve(resultTemplate);
};

// [POST] update single item
module.exports.update = async ({payload, id, db}) => {
  const [err, result] = await aap(db.set({id: id, data: payload}));

  if (err) {
    return reject(err);
  }

  return resolve('OK');
};

// [POST] update all fields + return rendered html hcard template
module.exports.genCard = async ({payload, id, db}) => {
  const [err, result] = await aap(db.set({id: id, data: payload}));
  if (err) {
    return reject(err);
  }

  const [errGet, resultGet] = await aap(db.get(id));
  if (errGet || !resultGet) {
    return reject('No user found');
  }

  return resolve(hCardTemplate(resultGet.data));
};
