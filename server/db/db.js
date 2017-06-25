const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb =  new AWS.DynamoDB();

const dbFunctions = {
  saveUserInfo: saveUserInfo
}

function saveUserInfo () {
  const params = {};
  dynamodb.listTables(params, function (err, data){
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}

module.exports = dbFunctions;
