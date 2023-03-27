const express = require('express')

const path = require('path')

const bodyParser = require('body-parser')

const db = require('./config')

const app = express()

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var kidsSchema = new Schema({
    name:{type:String},
    age:{type:String},
    pickupTime:{type:String},
    guardianName:{type:String}
},{versionKey:false})

//create a collection

var model = mongoose.model('kids', kidsSchema, 'kids')

app.use(bodyParser.json({limit:"5mb"}))

app.use(express(bodyParser.urlencoded({extended:true,limit:'5mb'})))

let srcpath = path.join(__dirname + "/public")

app.use(express.static('public'))

const port = 4000

//get the data
app.get('/api/getdata',(req,res) => {
    model.find({},(err,data) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

//funct to insert data

app.post('/api/savedata',(req,res) => {
    console.log(req.body)

    var mod = new model(req.body)

    mod.save(function(err, data){
        if(err){
            res.send(err)
        }
        else{
            res.send({sata:"Record has been inserted"})
        }
    })
})

//remove data

app.post('/api/getdata',(req,res) => {
    model.remove({_id:req.body.id},(err) => {
        if(err){
            res.send(err)
        }
        else{
            res.send({data:"Record has been deleted"})
        }
    })
})

app.get('/', (req, res) => {
    res.sendFile(srcpath + '/index.html')
})

app.listen(port, () => {
    console.log("App is listening on Port 4000")
})