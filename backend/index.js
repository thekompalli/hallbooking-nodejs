const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const room = [];
let i = 1;
const port = process.env.PORT || 3000;
const hbsPath = path.join(__dirname, '/templates')

app.set('view engine', 'hbs');
app.set('views', hbsPath);

app.use(bodyParser.json())

app.get('', (req,res)=>{
  res.render('index')
})


app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next()
})

app.post("/room",(req, res, next) => {
        let start = parseInt(req.body["startTime"].split(":").join(""));
        let end = parseInt(req.body["endTime"].split(":").join(""));
        const rd = req.body;
        let filled = [];
        let count = 0;
        let age = 24 + Math.floor((Math.random() * 20) + 1);
        for(let i of room){
            if(i.date == rd["date"]){
                filled.push({ date: i.date, startTime: i.startTime, endTime: i.endTime})
                let checkStart = parseInt(i.startTime.split(":").join(""));
                let checkEnd = parseInt(i.endTime.split(":").join(""));
                if ((start > checkStart && start < checkEnd) || (end > checkStart && end < checkEnd) || (start == checkStart && end == checkEnd)) {
                    count = 1;
                }
            }
        }
        if (count== 1) {
            res.json({
                message: "Meeting Hall is already booked under this time slot please choose another time",
                bookingDetails: filled
            })
        } else {
            rd["room_id"] = i++;
            rd["price"] = ((end + 1100) + 1) - ((start + 1100) +1);
            rd["age"] = age
            room.push(rd);
            res.json({
                message: "The Meeting hall is booked successfully"
            })
        } 
      
   
})


app.get('/room', (req,res,next) => { 
     res.json({message: "JSON sent successfully", posts: room}) 
})


app.get('/bookedData', (req,res)=>{
    let n = 1;
    let bkd = [];
    for(p of room){
        bkd.push({room_name: `room ${n++}`, booked_status: 'Booked', customer_name: p.name, date: p.date, start_time: p.startTime,end_time: p.endTime, price: p.price})

    }
    res.json(bkd)
        
})

app.get('/customerData', (req,res) => {
    let n = 1;
    let cus = [];
    room.forEach(c => {
        cus.push({customer_name: c.name, age: c.age,room_name: `room ${n++}`, Date: c.date, start_time: c.startTime, end_time: c.endTime})
    })
    res.json(cus)
})


app.listen(port, ()=>{
    console.log("port working @"+ port)
})