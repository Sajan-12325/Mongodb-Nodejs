const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'yourdb';
const collectionName = 'Address';

const client = new MongoClient(url);




async function viewfind() {  
    try {
      await client.connect();  
      const db = client.db(dbName);  
      const collection = db.collection(collectionName);  
      const query = {address: 'Ocean blvd 2'}
      const cursor = collection.find(query);  // Find one document in the collection
      const results = await cursor.toArray();
      console.log(results);  
    } 
    catch (err) {  
      console.log(err);  // Log the error to the console
    } 
}

viewfind()

async function viewOneData() {  // Define an asynchronous function to view one document from the database
    try {
      await client.connect();  
      const db = client.db(dbName);  
      const collection = db.collection(collectionName);  
      const query = {address: /^S/}
      const cursor = collection.find(query);  // Find one document in the collection
      const results = await cursor.toArray();
      console.log(results);  
    } 
    catch (err) {  
      console.log(err);  // Log the error to the console
    } 
    finally{
        client.close()
    }
    
  }
  
  viewOneData();


