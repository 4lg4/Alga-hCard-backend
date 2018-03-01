/**
 * Created by www.Alga.me on 28/2/18.
 */

import assert from 'assert';
import MongoDriver from '../../src/lib/MongoDriver';
import aap from '../../src/lib/AlgaAsyncProcess';
import env from '../../src/env.json';

const connectionVars = env.drivers.mongodb;
const mongoDriver = new MongoDriver(connectionVars);

describe(`MongoDriver this test only works with a valid Mongo DB`, ()=> {

  describe('_getConnString', ()=> {
    const expected = `mongodb://${connectionVars.host}:${connectionVars.port}/${connectionVars.db}`;
    const connectionVarsWithoutUser = Object.assign({}, connectionVars, {user:'', pwd:''});
    const mongoDriverWithoutUser = new MongoDriver(connectionVarsWithoutUser);

    it(`should return a connection string ${expected}`, () => {
      assert.equal(mongoDriverWithoutUser._getConnString(), expected);
    });

    const expectedWithUser = `mongodb://${connectionVars.user}:${connectionVars.pwd}@${connectionVars.host}:${connectionVars.port}/${connectionVars.db}`;
    it(`should return a connection string with user and pass ${expectedWithUser}`, () => {
      assert.equal(mongoDriver._getConnString(), expectedWithUser);
    });
  });

  describe('_getConn', ()=> {
    it(`should return true after open connection`, async () => {
      const [err, result] = await aap(mongoDriver._getConn());
      assert.equal(result,true);
    });
  });

  describe('get', ()=> {
    const id = '12';
    const data = {
      id,
      giveName: 'Adriano',
      lastName: 'Leal'
    };

    it(`should return an object from the db`, (done) => {
      Promise.resolve()
        .then(()=>mongoDriver.set({id, data}))
        .then(()=>mongoDriver.get(id))
        .then((result)=> {
          assert.deepEqual(result, {id, data});
          return done();
        })
        .catch((e)=>done());
    });
  });

  describe('set', ()=> {
    const id = '12';

    it(`should add new record and return true`, (done) => {
      const data = {
        id,
        giveName: 'Adriano',
        lastName: 'Leal'
      };

      Promise.resolve()
        .then(()=>mongoDriver.destroy(id))
        .then(()=>mongoDriver.set({id, data}))
        .then(()=>mongoDriver.get(id))
        .then((result)=> {
          assert.deepEqual(result, {id, data});
          return done();
        })
        .catch((e)=>done());
    });

    it(`should update an existing record and return true`, (done) => {
      const data = {
        id,
        org: 'Alga.Me'
      };

      Promise.resolve()
        .then(()=>mongoDriver.set({id, data}))
        .then(()=>mongoDriver.get(id))
        .then((result)=> {
          assert.deepEqual(result, {id, data});
          return done();
        })
        .catch((e)=>done());
    });
  });

  describe('destroy', ()=> {
    it(`should return true`, (done) => {
      const id = '12';

      Promise.resolve()
        .then(()=>mongoDriver.destroy(id))
        .then((result)=> {
          assert.ok(result);
          done();
        })
        .catch((e)=>done());
    });
  });

});
