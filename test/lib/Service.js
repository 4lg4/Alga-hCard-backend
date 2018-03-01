/**
 * Created by www.Alga.me on 28/2/18.
 */

import assert from 'assert';
import {update, genCard, getIndex} from '../../src/lib/Service';
import aap, {reject, resolve} from '../../src/lib/AlgaAsyncProcess';

const id = 12;
const data = {
  id,
  givenName: 'Alga',
  surname: 'Me',
};

const db = {
  get() {
    return Object.assign({}, {id}, {data});
  },
  set() {
    return true;
  },
  destroy() {
    return true;
  }
};

const expected = `
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
      <div class="HcardApp" />
  
      <script src="https://unpkg.com/react@15/dist/react.js"></script>
      <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
      <script src="main.js"></script>
      <script>
          var hCardProps = ${JSON.stringify(data)};
  
          (function() {
              ReactDOM.render(
                  React.createElement(
                      window.hCard.default,
                      hCardProps
                  ),
                  document.querySelector('.HcardApp')
              );
          })();
      </script>
  
  </body>
  </html>
`;

const vars = {};
const expectedHcard = `
  <div class="vcard">
    <!-- created by: Alga.me -->
    <span class="fn">${data.givenName} ${data.surname}</span>
    ${(vars.photo) ? `<img class="photo" src="${vars.photo}"/>` : ''}
    <a class="email" href="mailto:${vars.email}">${vars.email}</a>
    <div class="tel">${vars.phone}</div>
    <div class="adr">
      <div class="street-address">${vars.houseNumber} ${vars.street}</div>
      <span class="locality">${vars.suburb}</span>,
      <abbr class="region" title="${vars.state}">${vars.state}</abbr>,
      <span class="postal-code">${vars.postcode}</span>
      <div class="country-name">${vars.country}</div>
    </div>
  </div>
`;

describe(`Service`, ()=> {

  describe('getIndex', ()=> {
    it(`should return a rendered index page`, async () => {
      const [err, result] = await aap(getIndex({id, db}));
      assert.deepEqual(result.replace(/\s+|\n+/gm, ''), expected.replace(/\s+|\n+/gm, ''));
    });
  });

  describe('update', ()=> {
    it(`should return string OK`, async () => {
      const [err, result] = await aap(update({id, payload: data, db}));
      assert.equal(result, 'OK');
    });
  });

  describe('genCard', ()=> {
    it(`should return a rendered hCard html`, async () => {
      const [err, result] = await aap(genCard({id, payload: data, db}));
      assert.deepEqual(result.replace(/\s+/gm, ''), expectedHcard.replace(/\s+/gm, ''));
    });
  });

});
