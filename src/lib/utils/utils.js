/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */

// External libs
const fs = require('fs');
const AWS = require('aws-sdk');

// Self libs
// ...

// Constants // moved to inside the function, the reason is the amount of calls
let isDev = false;
if (process.env.stage === 'local' || !process.env.stage) {
  // eslint-disable-next-line global-require
  const config = require('./../../../config/secrets.json');
  isDev = true;
  process.env.KEYID = config.AWSKEYID;
  process.env.ACCESSKEY = config.AWSKEY;
  process.env.ssm = config.ssm;
  AWS.config.update({ region: config.AWSRegion || 'us-east-1' });
}
console.log(`<env>: ${process.env.stage} isDev: ${isDev}`);
console.log(`<aws-keys>: ${process.env.KEYID} ${process.env.ACCESSKEY}`);
console.log(`<aws-ssm>: ${process.env.ssm}`);

// main
const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

function mergeArrayInArray(array) {
  // eslint-disable-next-line prefer-spread
  return [].concat.apply([], array);
}

function convertJSONToObj(json) {
  return JSON.parse(json);
}

function getSSM() {
  return new Promise((resolve, reject) => {
    let ssm = null;
    if (isDev) ssm = new AWS.SSM({ accessKeyId: process.env.KEYID, secretAccessKey: process.env.ACCESSKEY });
    else ssm = new AWS.SSM();

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

function convertCentsToAmount(value) {
  return (value / 100).toFixed(2);
}

function saveJson(data, PATH) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(`${PATH}`, jsonData, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}


module.exports = {
  AWS: {
    getSSM,
  },
  Utils: {
    convertAmountToCents,
    convertCentsToAmount,
    saveJson,
    groupBy,
    mergeArrayInArray,
  },
};
