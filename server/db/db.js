const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb =  new AWS.DynamoDB();
const kms = new AWS.KMS();

const dbFunctions = {
  saveUserInfo: saveUserInfo,
  encryptValue: encryptValue,
  decryptValue: decryptValue
}

function encryptValue(value) {
  const params = {
    KeyId: 'arn:aws:kms:us-east-1:277051130784:key/599a28bb-2d04-4808-9aa2-15c5f3c7a90a',
    Plaintext: value
  };
  kms.encrypt(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return value;
    }
    else {
      kms.decrypt({CiphertextBlob: data.CiphertextBlob}, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          console.log(data.Plaintext.toString('utf-8'));
        }
      });
      return data.CiphertextBlob;
    }
  });
}

function decryptValue(value) {
  console.log(value);
  const params = {
    CiphertextBlob: value
  };
  kms.decrypt(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      console.log(data);
    }
  });
}

function saveUserInfo () {
  const params = {};
}

module.exports = dbFunctions;
