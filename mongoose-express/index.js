const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();

app.use(bodyParser.json())

const port = 4444
const mongoDBurl = `mongodb://127.0.0.1:27017/games`

mongoose.connect(mongoDBurl, { useNewUrlParser: true })
    .then(res => console.log("MongoDB connection successfull"))
    .catch(err => console.log(err))

const userModule = {
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    }

}
const Userdetail = mongoose.model("users", userModule)

app.get("/home", (req, res) => {
    res.send("hello world!")
})

app.post("/login", (req, res) => {
    console.log(req.body);
    const Userdetail1 = new Userdetail({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        age:req.body.age
    })
    Userdetail1.save((err,result)=>{
        if(err){
            res.send("Data not saved on MongoDB")
        }else{
            res.send("Data received on MongoDB")
        }
    })
})
app.get("/fetchdata",(req,res)=>{
    Userdetail.find({},(err,docs)=>{
        err?res.send("ERROR"):res.send(docs);
    })
})
app.listen(port)