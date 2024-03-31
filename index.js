
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
require("dotenv").config();     

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb+srv://aryanrana150303:"+
process.env.MONGO_PASSWORD +
"@cluster0.6bozywn.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error',()=> console.log("Error in Connecting to Database"));
db.on('open',()=> console.log("Connected to Database"));
app.post('/sign_up',(req,res)=>{
    var name = req.body.name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var gender = req.body.gender;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "last_name": last_name,
        "email": email,
        "gender": gender,
        "phno": phno,
        "password": password,
    }
    db.collection('mydb').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    // res.send("Hello From Server")
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");
