const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb =  new AWS.DynamoDB();
const kms = new AWS.KMS();
const docClient = new AWS.DynamoDB.DocumentClient();
const db = {};

function encryptValue(value) {
  return new Promise( (resolve,reject) => {
    const params = {
      KeyId: 'arn:aws:kms:us-east-1:277051130784:key/599a28bb-2d04-4808-9aa2-15c5f3c7a90a',
      Plaintext: value
    };
    let ret = value;
    kms.encrypt(params, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(data.CiphertextBlob.toString('base64'));
      }
    });
  });
}

function decryptValue(value) {
  return new Promise( (resolve,reject) => {
    const bufferValue = new Buffer(value, 'base64');
    const params = {
      CiphertextBlob: bufferValue
    };
    kms.decrypt(params, function (err, data) {

      if (err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

db.getUserInfo =  (username) => {
  return new Promise( (resolve, reject) =>{
    const params = {
      TableName: 'maildrawer.users',
      Key: {
        'username': username
      }
    };
    docClient.get(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        decryptValue(data.Item.encrypted_access).then((accessSuccess) => {
          decryptValue(data.Item.encrypted_refresh).then((refreshSuccess) => {
            const userObject = {
              'username': username,
              'access_token': accessSuccess.Plaintext.toString(),
              'refresh_token': refreshSuccess.Plaintext.toString()
            };
            resolve(userObject);
          }, (error) => {
            reject(error);
          });
        }, (error) => {
          reject(error);
        });
      }
    });
  });
}

db.putUserInfo = (access_token, refresh_token, successFunction) => {
  encryptValue(access_token).then(function (accessSuccess) {
    encryptValue(refresh_token).then(function (refreshSuccess) {
      const params = {
        TableName: 'maildrawer.users',
        Item:{'username': 'matthewljiang',
          'encrypted_access': accessSuccess,
          'encrypted_refresh': refreshSuccess
        }
      };
      docClient.put(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          successFunction();
        }
      });

    }, function (errorResponse) {
      console.log(errorResponse, errorResponse.stack);
    });
  }, function (errorResponse) {
    console.log(errorResponse, errorResponse.stack);
  });
}

module.exports = db;
