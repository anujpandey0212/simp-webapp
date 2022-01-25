const Mongoose =require("mongoose");
const express = require("express");
const cors=require("cors");
const path=require("path");
bodyparser = require('body-parser')
const app = express();

//---------------------------------Mongoose things-----------------------------------------------------

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

//---------------------------------Express things-----------------------------------------------------

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors());

//---------------------------------Defining Schemas-----------------------------------------------------

const SimulationSchema = Mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  topic_name:{
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
  },
  description:{
    type: String,
    required:true
  },
  ragistration_required:{
    type:String,
    required:true
  }

});

const Categoriesshema=Mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  tags:{
    type:Array,
    required:true
  }
});

const UserSchema = Mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  password:{
    type: String,
    required: true
  },
  ragistered:{
    type:Boolean,
    required:true
  }
});

//---------------------------------Handeling the collections of database-----------------------------------------------------

const Simulations = Mongoose.model('records', SimulationSchema);
const Categories=Mongoose.model('categories',Categoriesshema);
const Users =Mongoose.model('users',UserSchema);

Users.find({ name: 'anuj'}, function (err, docs) {
  if (err){
      console.log(err);
  }
  else{
      console.log("First function call : ", docs);
  }
});

//---------------------------------Handling get and post request-----------------------------------------------------


//all get request comes here only
app.get("/api", (req, res) => {
  var query = req.params.query;
    Simulations.find({
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

app.get("/category",(req,res)=>{
  var query=req.params.query;
  Categories.find({
    "request":query
  },function(err,result){
    if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
  })
})

app.get("/signin",(req,res)=>{
  var query=req.params.query;

  Users.find({
    'request':query
  },function(err,result){
    if(err) throw err;
    if (result){
      res.json(result)
    }else{
      res.send(JSON.stringify({
        error:'Error'
      }))
    }
  })
});

//do not touch this 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//all post request comes here
app.post("/api",(req,res)=>{
  console.log(req.body);
  const {name,topic_name,image,src,description,ragistration_required}=req.body;
const newsimulation=new Simulations({
name,
topic_name,
image,
src,
description,
ragistration_required
})
newsimulation.save();
})

app.post('/signin',(req,res)=>{
  const {name,password,ragistered}=req.body;
  const newuser=new Users({
    name,
    password,
    ragistered
  })
  newuser.save();
});