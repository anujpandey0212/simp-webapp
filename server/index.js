const Mongoose =require("mongoose");
const express = require("express");
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
  }
});

const User = Mongoose.model('records', UserSchema);

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