/**
 * Created by www.Alga.me on 28/2/18.
 */

import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import aap from '../../src/lib/AlgaAsyncProcess';
import Server from '../../src/lib/Server';
const server = new Server();

const should = chai.should();
chai.use(chaiHttp);

describe('hCard Server', function() {
    it('should update a property on /update POST', (done)=> {
        chai.request(server)
            .post('/update')
            .send({ 'name': 'Java' })
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });
});
