import { MongoClient } from 'mongodb'
import React from 'react'

export default async function handler(req,res) {
  if(req.method === "POST"){
    const data = req.body

    const client = await MongoClient.connect("mongodb+srv://admin:6hy3BsRwMH9cRZUL@cluster0.3dcw6kq.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection("meetups")
    const result = await meetupsCollection.insertOne(data)
    console.log(result);

    client.close()

    res.status(201).json({message: "Inserted"})
  }
}
