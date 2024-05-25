//ServerModule
const express = require('express')
const app = express()
const path = require('path')

app.use(express.json());
const cors = require('cors')
let corsOptions = { 
    origin : ['https://market-246t.onrender.com'], 
 } 
   
 app.use(cors(corsOptions))
//DataBaseModule
const Data = require("./DataBase")

//AuthModule
const { auth , requiresAuth } = require('express-openid-connect')
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'https://market-246t.onrender.com',
    clientID: '8zucliP8RVJMubHeUoBKWwcjKTmbmdM6',
    issuerBaseURL: 'https://dev-s2d5hsgmg3na6xuq.eu.auth0.com',
    secret: 'Fngv9vJmx8A3dqGUvaMbESaimgRVviYR52wg_FQZyMdnuB4754n82yTIvTphM561'
};
app.use(auth(config));

app.use(express.static(path.join(__dirname , '../build')))

app.get('/' , (req , res)=>{
    try{
        res.sendFile(path.join(__dirname , '../build' , 'index.html'))
    }catch(err){
        res.send(err)
    }   
})

app.get('/state' , (req, res) => {
    let check =  req.oidc.isAuthenticated()
    res.send( check ? 'Logged in' : 'Logged out')
})

app.get('/profile' , requiresAuth() ,  (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
})



app.get('/items' , requiresAuth() , async (req , res)=>{
    try{
        const allData = await Data.find()
        res.json(allData)
    }catch(err){
        res.send(err)
    }   
})

app.post('/items' , async(req , res)=>{
    try{
        const newData = new Data()

        const name = req.body.name
        const price = req.body.price
        const amount = req.body.amount
        const code = req.body.code
        const img = req.body.img
    
        newData.name = name
        newData.price = price
        newData.amount = amount
        newData.code = code
        newData.img = img
    
        await newData.save()
        res.json(newData)
    }catch(err){
        res.send(err)
    }
})

app.get('/item/:id' , async(req , res)=>{
    try{
        const id = req.params.id

        const Item = await Data.findById(id)

        res.json(Item)
    }catch(err){
        res.send(err)
    }

})

app.put('/item/:id', requiresAuth() , async(req , res)=>{
    try{
        const id = req.params.id

        const name = req.body.name
        const price = req.body.price
        const amount = req.body.amount
        const code = req.body.code
        const img = req.body.img
    
        const Item = await Data.findByIdAndUpdate(id , {
            name : name ,
            price : price , 
            amount : amount ,
            code : code ,
            img : img
        })
    
        res.json(Item)
    }catch(err){
        res.send(err)
    }
})

app.delete('/item/:id' , async(req , res)=>{
    try{
        const id = req.params.id

        const Item = await Data.findByIdAndDelete(id)

        res.json(Item)
    }catch(err){
        res.send(err)
    }
})

app.listen(3000 || "https://market-246t.onrender.com" , ()=>{
    console.log("Server is running !")
})


