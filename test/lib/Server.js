/**
 * Created by www.Alga.me on 28/2/18.
 */

import request from 'request-promise';
import assert from 'assert';
import Server, {app} from '../../src/lib/Server';
import aap, {reject, resolve} from '../../src/lib/AlgaAsyncProcess';

import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const should = chai.should();

const id = 12;
const data = {
  id,
  givenName: 'Alga',
  surname: 'Me',
};
const port = 3333;
const url = `http://localhost`;
const server = new Server({port});

const waitServerLoads = (promise)=> {
  return new Promise((resolve, reject)=> {
    setTimeout(()=>resolve(promise), 2000);
  });
};

describe('Server', function() {

  it('should return 200 and a html / GET', (done) => {
    waitServerLoads(
      chai.request(app).get(`/?s=${id}`)
    ).then((res) => {
      res.should.have.status(200);
      done();
    });
  }).timeout(5000);

  it('should update a property {message: OK} on /update POST', (done) => {
    chai.request(app)
      .post(`/update?s=${id}`)
      .send({givenName: data.givenName})
      .then((res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  }).timeout(2000);

  it('should return 200 and a html /submit POST', (done) => {
    chai.request(app)
      .post(`/submit?s=${id}`)
      .send({givenName: data.givenName})
      .then((res) => {
        res.should.have.status(200);
        // res.headers.should.have.property('Content-Disposition');
        // res.body.should.have.property('message');
        done();
      });
  }).timeout(2000);
});
