/**
 * Created by www.Alga.me on 28/2/18.
 */


import MongoDriver from '../../src/lib/MongoDriver';
import aap from '../../src/lib/AlgaAsyncProcess';

const mongoDriver = new MongoDriver({
    port: '32768',
    host: 'localhost',
    db: 'hCard'
});

console.log('\n\nshould return a connection string');
console.log(mongoDriver._getConnString());

(async ()=>{
    const [err,result] = await aap(mongoDriver._getConn());
    console.log('\n\nshould return an opened connection');
    console.log('1ERR', err);
    console.log('1result', result);
    // process.exit();
})();



(async ()=>{
    const id = '1';
    const [err,result] = await aap(mongoDriver.get({ id }));
    console.log('\n\nshould return an object from the db');
    console.log('2ERR', err);
    console.log('2result', result);
})();


(async ()=>{
    const id = '12';
    const data = {
        id,
        giveName: 'Adriano',
        lastName: 'Leal'
    };
    const [err,result] = await aap(mongoDriver.set(data));
    console.log('\n\nshould return true if created');
    console.log('3ERR', err);
    console.log('3result', result);
    process.exit();
})();


(async ()=>{
    const id = '10';
    const [err,result] = await aap(mongoDriver.destroy(id));
    console.log('\n\nshould return true if destroyed');
    console.log('4ERR', err);
    console.log('4result', result);
    process.exit();
})();
