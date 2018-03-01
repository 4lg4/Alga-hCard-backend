/**
 * Created by www.Alga.me on 28/2/18.
 */

import assert from 'assert';
import ApiDriver from '../../src/lib/ApiDriver';

const vars = {
  url: 'http://localhost:8080/api',
  token: 'my fake token',
  // debug: true,
  test: true
};
const apiDriver = new ApiDriver(vars);

describe(`ApiDriver this test only works with a valid api`, ()=> {

  describe('get', ()=> {
    const id = '12';
    const expected = `[GET]${vars.url}/${id}`;

    it(`should return the options object from the request [GET] ${vars.url}/${id}`, () =>
      Promise.resolve()
        .then(()=>apiDriver.get(id))
        .then((opt)=>assert.equal(`[${opt.method}]${opt.uri}`, expected))
    );
  });

  describe('set', ()=> {
    const id = '12';
    const expected = `[POST]${vars.url}/${id}`;
    const data = {a: 1, b: 2};

    it(`should return the options object from the request [POST] ${vars.url}/${id}`, () =>
      Promise.resolve()
        .then(()=>apiDriver.set({id, data}))
        .then((opt)=>assert.equal(`[${opt.method}]${opt.uri}`, expected))
    );
  });

  describe('destroy', ()=> {
    const id = '12';
    const expected = `[DELETE]${vars.url}/${id}`;

    it(`should return the options object from the request [DELETE] ${vars.url}/${id}`, () =>
      Promise.resolve()
        .then(()=>apiDriver.destroy(id))
        .then((opt)=>assert.equal(`[${opt.method}]${opt.uri}`, expected))
    );
  });
});
