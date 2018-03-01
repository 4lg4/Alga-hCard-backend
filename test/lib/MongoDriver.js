/**
 * Created by www.Alga.me on 28/2/18.
 */

import assert from 'assert';
import MongoDriver from '../../src/lib/MongoDriver';
import aap from '../../src/lib/AlgaAsyncProcess';

const connectionVars = {
    port: '32768',
    host: 'localhost',
    db: 'hCard'
};
// const mongoDriver = new MongoDriver(connectionVars);

describe(`MongoDriver this test only works with a valid Mongo DB ${JSON.stringify(connectionVars)}`, ()=> {

    describe('_getConnString', ()=> {
        const mongoDriver = new MongoDriver(connectionVars);
        const expected = `mongodb://${connectionVars.host}:${connectionVars.port}/${connectionVars.db}`;

        it(`should return a connection string ${expected}`, () => {
            assert.equal(mongoDriver._getConnString(), expected);
        });

        const connectionVarsWithUser = Object.assign({}, connectionVars,{ user: 'alga', pwd: '123' });
        const mongoDriverWithUser = new MongoDriver(connectionVarsWithUser);
        const expectedWithUser = `mongodb://${connectionVarsWithUser.user}:${connectionVarsWithUser.pwd}@${connectionVars.host}:${connectionVars.port}/${connectionVars.db}`;

        it(`should return a connection string with user and pass ${expectedWithUser}`, () => {
            assert.equal(mongoDriverWithUser._getConnString(), expectedWithUser);
        });
    });


    describe('_getConn', ()=> {
        it(`should return true after open connection`, async () => {
            const mongoDriver = new MongoDriver(connectionVars);
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
            const mongoDriver = new MongoDriver(connectionVars);

            // const [errDestroy, resultDestroy] = await aap(mongoDriver.destroy({ id }));
            // const [errSet, resultSet] = await aap(mongoDriver.set({ id, data }));
            // const [errGet, resultGet] = await aap(mongoDriver.get({ id }));
            // const [err, res] = await aap(assert.deepEqual(resultGet,{ id, data }));

            Promise
                .resolve()
                .then(()=>mongoDriver.set({ id, data }))
                .then(()=>mongoDriver.get({ id }))
                .then((result)=>{
                    assert.deepEqual(result,{ id, data });
                    done();
                })
        });
    });

    // describe('set', (done)=> {
    //     it(`should add new record and return true`, async () => {
    //         const mongoDriver = new MongoDriver(connectionVars);
    //         const id = '12';
    //         const data = {
    //             id,
    //             giveName: 'Adriano',
    //             lastName: 'Leal'
    //         };
    //
    //         const [errDestroy, resultDestroy] = await aap(mongoDriver.destroy({ id }));
    //         const [errSet, resultSet] = await aap(mongoDriver.set({ id, data }));
    //         const [errGet, resultGet] = await aap(mongoDriver.get({ id }));
    //         done(assert.deepEqual(resultGet,{ id, data }));
    //     });
    //
    //     it(`should update an existing record and return true`, async (done) => {
    //         const mongoDriver = new MongoDriver(connectionVars);
    //         const id = '12';
    //         const data = {
    //             id,
    //             org: 'Alga.Me'
    //         };
    //
    //         const [errDestroy, resultDestroy] = await aap(mongoDriver.destroy({ id }));
    //         const [errSet, resultSet] = await aap(mongoDriver.set({ id, data }));
    //         const [errGet, resultGet] = await aap(mongoDriver.get({ id }));
    //         done(assert.deepEqual(resultGet,{ id, data }));
    //     });
    // });
    //
    // describe('destroy', ()=> {
    //     it(`should return true`, () => {
    //         assert.equal(false,true);
    //     });
    // });
});

// (async ()=>{
//     const [err,result] = await aap(mongoDriver._getConn());
//     console.log('\n\nshould return an opened connection');
//     console.log('1ERR', err);
//     console.log('1result', result);
//     // process.exit();
// })();
//
//
//
// (async ()=>{
//     console.log('\n\nshould return an object from the db');
//     const id = '1';
//     const [err,result] = await aap(mongoDriver.get({ id }));
//     console.log('2ERR', err);
//     console.log('2result', result);
// })();
//
//
// (async ()=>{
//     const id = '12';
//     const data = {
//         id,
//         giveName: 'Adriano',
//         lastName: 'Leal'
//     };
//     const [err,result] = await aap(mongoDriver.set(data));
//     console.log('\n\nshould return true if created');
//     console.log('3ERR', err);
//     console.log('3result', result);
//     process.exit();
// })();
//
//
// (async ()=>{
//     console.log('\n\nshould return true if destroyed');
//     const id = '12';
//     // const [err,result] = await aap(mongoDriver.destroy(id));
//     // console.log('4ERR', err);
//     // console.log('4result', result);
//     // process.exit();
// // })();
//
// Promise.resolve().then(()=>mongoDriver.destroy(id)).then((a)=>console.log('success',a)).catch((a)=>console.log('error',a));
