const Mongoose =require("mongoose");
const express = require("express");
const cors=require("cors");
bodyparser = require('body-parser')
// const model=require("User");

const db = "mongodb+srv://anuj:LemI3PfqZmMRfGPk@shikhar.fjzu8.mongodb.net/employees";

// Connect to MongoDB
Mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => {console.log('MongoDB Connected');
  })
  .catch(err => console.log(err));


const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const UserSchema = Mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  title_name:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  src:{
    type: String,
    required: true
  }

});

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const User = Mongoose.model('records', UserSchema);
app.use(cors());
User.find({ name: 'anuj'}, function (err, docs) {
  if (err){
      console.log(err);
  }
  else{
      console.log("First function call : ", docs);
  }
});


app.get("/api", (req, res) => {
  var query = req.params.query;

    User.find({
        'request': query
    }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
 
});

app.post("/api",(req,res)=>{
  console.log(req.body);
  const {name,title_name,image,src}=req.body;
const newuser=new User({
name,
title_name,
image,
src
})
newuser.save();
})