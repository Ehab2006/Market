const mongoose = require('mongoose')
const Url = "mongodb+srv://HOoBs:HOoBs@hoobs.pgvx1or.mongodb.net/?retryWrites=true&w=majority&appName=HOoBs"
mongoose.connect(Url).then(() => console.log('DataBase is running !')).catch((err)=>{
    console.log('error')
})

const Schema = mongoose.Schema;
const Items =  new Schema({
    name : String ,
    price : Number,
    amount : Number ,
    code : String ,
    img : String
})

const Data = mongoose.model('Item', Items);

module.exports = Data