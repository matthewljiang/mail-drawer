const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb =  new AWS.DynamoDB();

function listTablesTest () {
  const params = {};
  dynamodb.listTables(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);
    }
  });
}

function createTableTest () {
  var params = {
    AttributeDefinitions: [
    {
      AttributeName: "Artist",
      AttributeType: "S"
    },
    {
      AttributeName: "SongTitle",
      AttributeType: "S"
    }
    ],
    KeySchema: [
    {
      AttributeName: "Artist",
      KeyType: "HASH"
    },
    {
      AttributeName: "SongTitle",
      KeyType: "RANGE"
    }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: "Music"
  };
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}

listTablesTest();
