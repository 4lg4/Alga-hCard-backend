/**
 * Created by www.Alga.me on 28/2/18.
 */

import assert from 'assert';
import AlgaUID from '../../src/lib/AlgaUID';

describe(`AlgaUID`, ()=> {
  it(`should return uid string like [${AlgaUID()}]`, () => {
    assert.ok(!!(AlgaUID().match(/\-\d{13}\-/g)));
  });
});
