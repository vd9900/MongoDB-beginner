const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express();
const PORT = 4444
const MongoDBUrl = "mongodb://127.0.0.1/Articles"

app.use(bodyParser.json())

mongoose.connect(MongoDBUrl)
    .then(res => console.log("Sever connected to MongoDB"))
    .catch(err => console.log(err))

const articleModule = {
    name: {
        type: String
    },
    title: {
        type: String
    },
    Description: {
        type: String
    },
    Date: {
        type: Number,
        default: Date.now()
    }
}
// making blueprint of  module
const makeArticle = mongoose.model("articles", articleModule)

app.get("/", (req, res) => {
    res.send(`
    <h1>welcome to add article or read article</h1>
    <a href="localhost:4444/showarticle">Our Articles</a>
     ` )
})
app.post("/addArticle", (req, res) => {
    console.log(req.body);
    const NewArticle = new makeArticle({
        name: req.body.name,
        title: req.body.title,
        Description: req.body.description
    })
    NewArticle.save((err, result) => {
        err ? res.send(err) : res.send("data saved on DataBase")
    })

})
app.get("/showarticle", (req, res) => {
    makeArticle.find({}, (err, doc) => {
        err ? res.send(err) : res.send(doc)
    })
})
// geting the article by url of name
app.get("/showarticle/:name", (req, res) => {
    makeArticle.find({ name: req.params.name }, (err, docs) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.send(docs)
        }
    })
})
// deleting the article from database

app.get("/showarticle/delete/:name", (req, res) => {
    makeArticle.deleteOne({name: req.body.name })
        .then(res => res.send("Article deleted on DataBase"))
        .catch(err => res.send(err))
})

app.listen(PORT)