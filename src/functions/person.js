// External Libraries
if (process.env.stage !== 'local') { // When is deployed (dev,qa, prod), gonna sent the information to Xray
  const awsXRay = require('aws-xray-sdk'); // eslint-disable-line
  awsXRay.captureAWS(require('aws-sdk')); // eslint-disable-line
}
// Self Libraries
const utils = require('../lib/utils/mgo.utils').AWS;
const vmo = require('../lib/utils/validations.utils');
const personController = require('../lib/controllers/person');

// Main
module.exports.getAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign
  try {
    const params = await utils.getSSM();
    personController.init(params);
    const result = await personController.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: 'fail', message: error.message }),
    };
  }
};

module.exports.getByID = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign
  try {
    const params = await utils.getSSM();
    personController.init(params);
    const result = await personController.getByID(event.pathParameters.id);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: 'fail', message: error.message }),
    };
  }
};
