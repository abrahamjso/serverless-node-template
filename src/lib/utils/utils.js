const AWS = require('aws-sdk');

// Constants
let ssm = null;
console.log(process.env.stage);
if (process.env.stage === 'local') ssm = new AWS.SSM({ accessKeyId: process.env.KEYID, secretAccessKey: process.env.ACCESSKEY });
else ssm = new AWS.SSM();

function convertJSONToObj(json) {
  return JSON.parse(json);
}

function getSSM() {
  return new Promise((resolve, reject) => {
    const params = { Names: [process.env.ssm], WithDecryption: true || false };
    ssm.getParameters((params), (err, data) => {
      if (err) reject(err);
      else {
        const theObj = convertJSONToObj(data.Parameters[0].Value);
        resolve(theObj);
      }
    });
  });
}

function convertAmountToCents(value) {
  return parseInt(`${value}00`, 10);
}

module.exports = {
  AWS: {
    getSSM,
  },
  Utils: {
    convertAmountToCents,
  },
};
