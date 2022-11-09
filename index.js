const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// this is testing purpose code
app.get('/', (req, res) => {
    res.send('server is running');
})

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)
// username:winteruser
// password:ZToJVTt6iS0C5mKl

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const UserCollection = client.db("winterShopDb").collection("registeruser");

        // send dat to the database site
        app.post('/profile', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await UserCollection.insertOne(user);
            res.send(result);
        })

        // now we take all the register data from database
        app.get('/profile', async (req, res) => {
            let query = {};
            const cursor = UserCollection.find(query);
            const users = await cursor.toArray();
            console.log(users);
            res.send(users);
        })


        // delete a single user from database
        app.delete('/userdlt/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await UserCollection.deleteOne(query);
            res.send(user);
        })


        // wildanimal project
        const AddServiceCollection = client.db("winterShopDb").collection("services");
        app.post('/services', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await AddServiceCollection.insertOne(user);
            res.send(result);
        })

        // now we take all the register data from database
        app.get('/services', async (req, res) => {
            let query = {};
            const cursor = AddServiceCollection.find(query);
            const users = await cursor.toArray();
            console.log(users);
            res.send(users);
        })

        // step:1 take single data from api
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await AddServiceCollection.findOne(query);
            res.send(user);
        })


    }
    finally {

    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
