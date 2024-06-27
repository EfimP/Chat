import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const connection = await client.connect();
const database = "Chat";
const db = connection.db(database);
const collection = db.collection("Projects");

export async function createDB(buf) {
  const response = await collection.insertOne(JSON.parse(buf));
  return response;
}

export async function saveDB(buf) {
  //const response = await db.collection.insertOne(JSON.parse(buf));
  //return response;
}

export async function checkDB() {
  let cnt = 0;
  const response = collection.find({});
  for await (let i of response)
    cnt++;
  return cnt;
}

