const express = require('express')
const app = express()
const PORT = 4000
const expressLayouts = require('express-ejs-layouts')
const ejs = require('ejs');
const path = require('path')

const {Connectdb} = require('./config/dbConn')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const formRouter = require("./routes/formRouter")


Connectdb();


app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({origin:"http://localhost:5173"}))
app.get('/', (req, res) => {
  res.status(200).send("all ok");
});

app.use('/api/v-1', formRouter);



mongoose.connection.once("open",()=>{
  console.log("connected to  MongoDb")

app.listen(PORT,()=>{
  console.log("server started :)")
})
})