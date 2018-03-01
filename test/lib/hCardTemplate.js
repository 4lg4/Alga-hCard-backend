/**
 * Created by www.Alga.me on 28/2/18.
 */

import assert from 'assert';
import hCardTemplate from '../../src/lib/hCardTemplate';

const vars = {
  givenName: 'Alga', surname: 'Leal', email: 'alga@alga.me', phone: '+610000000',
  houseNumber: '123', street: 'the street', suburb: 'the suburb', state: 'the state',
  postcode: '0000', country: 'Australia', photo: 'myPic.jpg'
};

const expected = `
  <div class="vcard">
    <!-- created by: Alga.me -->
    <span class="fn">${vars.givenName} ${vars.surname}</span>
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

describe(`hCardTemplate`, ()=> {
  it(`should return an hCard html template`, () => {
    assert.deepEqual(hCardTemplate(vars).replace(/\s+/gm, ''), expected.replace(/\s+/gm, ''));
  });
});
