const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
//const { ObjectId } = require("bson");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lkoox.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
    res.send("Hello, It is working");
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const articleCollection = client.db("newsPortal").collection("articles");

  app.post("/addArticle", (req, res) => {
    const data = req.body;
    articleCollection.insertOne(data).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/article", (req, res) => {
    articleCollection.find({}).toArray((err, items) => {
      console.log(err);
      res.send(items);
    });
  });

});

app.listen(process.env.PORT || port);