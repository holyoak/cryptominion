const assert = require('assert')
const chalk = require('chalk')
const MongoClient = require('mongodb').MongoClient
const data = require('./userAuth.json')

// dB connection URL
const url = 'mongodb://localhost:27017'

// dB Name
const dbName = 'users'

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err)
  console.log(chalk.green('Connected successfully to ' + dbName + ' database'))
  const dB = client.db(dbName)
    const collection = dB.collection(data.name)
    // commit the data
    collection.insertOne(data)    
})
