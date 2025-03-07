const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const dot = require('dotenv')
dot.config()
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

const dbName = 'passop';
client.connect();

// get all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// save a password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.json({success : true, result : findResult})
})

// delete a password
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.json({success : true, result : findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})