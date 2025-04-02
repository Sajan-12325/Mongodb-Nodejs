const { MongoClient } = require('mongodb');  // Importing MongoClient from the MongoDB driver to connect to the database

const url = 'mongodb://localhost:27017';  // MongoDB connection URL to connect to the local instance of MongoDB
const dbName = 'yourdb';  // Database name to which you want to connect (replace 'yourdb' with your actual database name)
const collectionName = 'Address';  // Name of the collection inside the database where you want to retrieve data

const client = new MongoClient(url);  // Create a new MongoClient instance to connect to the MongoDB server using the provided URL

async function viewData() {  // Define an asynchronous function to view data from the database
  try {
    await client.connect();  // Establish a connection to MongoDB using the MongoClient instance
    const db = client.db(dbName);  // Access the database with the name specified in the `dbName` variable
    const collection = db.collection(collectionName);  // Access the collection within the database

    const cursor = collection.find({}, { projection: { _id: 0 } });
    const results = await cursor.toArray();  // Convert the cursor to an array of results

    console.log(results);  // Log the retrieved results to the console
  } 
  catch (err) {  // If there's an error during the process, catch it
    console.log(err);  // Log the error to the console
  } 
  
}

viewData();  // Call the viewData function to execute the code



console.log('First function ends here');

async function viewOneData() {  // Define an asynchronous function to view one document from the database
    try {
      await client.connect();  
      const db = client.db(dbName);  
      const collection = db.collection(collectionName);  
  
      const result = await collection.findOne();  // Find one document in the collection
  
      console.log(result);  
    } 
    catch (err) {  
      console.log(err);  // Log the error to the console
    } 
    
  }
  
  viewOneData();




async function listDatabasesAndCollections() { 
  try {
    await client.connect();  // Establish a connection to MongoDB using the MongoClient instance

    // Get the list of all databases
    const databasesList = await client.db().admin().listDatabases();

    // Loop through and list its collections
    console.log('Databases and Collections:');
    for (const dbInfo of databasesList.databases) {
      const db = client.db(dbInfo.name);  // Access the current database
      const collections = await db.listCollections().toArray();  // Get collections of the current database

      console.log(`\nDatabase: ${dbInfo.name}`);
      console.log('Collections:');
      collections.forEach(collection => {
        console.log(`  - ${collection.name}`);  // Log each collection name
      });
    }
  } catch (err) {  // If there's an error during the process, catch it
    console.log('Error:', err);  // Log the error to the console
  } finally {
    client.close();  // Close the MongoDB connection once the operation is complete
  }
}

listDatabasesAndCollections();  // Call the function to execute the code
