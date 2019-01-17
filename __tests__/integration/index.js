const stackOutput = require('../../.build/stack.json');

let endpoint = stackOutput.ServiceEndpoint;
if (process.env.NODE_ENV === 'local') endpoint = 'http://localhost:3000';

const request = require('supertest')(endpoint); // eslint-disable-line

// Nota: Cuando se corre en qa hay que ver cuales servicios estan disponibles para hacer pruebas
const token = '5bbbc0e525b3870b8d92b965';
const utilityIDBatch = '5bb635836a980710855e2bca';
let utilityIDOnline = null;
let itemID = null;
const utilityIDsArray = [];
jest.setTimeout(45000);

describe('/utilities routes', () => {
  // Get all Utilities
  it('GET / returns an list of utilities object', (done) => {
    request
      .get('/utilities')
      .expect(200)
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.body).toHaveProperty('utilities');
        expect(Array.isArray(res.body.utilities)).toBe(true);
        res.body.utilities.forEach((utility) => { utilityIDsArray.push(utility._id); }); // eslint-disable-line
        const theUtility = res.body.utilities
          .filter((utility) => { return utility.name === utilityName; })[0];
        utilityIDOnline = theUtility._id; // eslint-disable-line
        expect(theUtility).toHaveProperty('_id');
        expect(theUtility).toHaveProperty('image');
        expect(theUtility).toHaveProperty('name');
        expect(theUtility).toHaveProperty('company');
        expect(theUtility).toHaveProperty('legends');
        expect(theUtility).toHaveProperty('operation');
        expect(theUtility).toHaveProperty('scannable');
        done();
      });
  });
});
