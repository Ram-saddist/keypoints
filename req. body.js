const cors =require('cors');
const express=require('express');
const mysql =require('mysql');
const bodyParser= require('body-parser')

const app=express();

app.use(bodyParser.urlencoded({
	extended:true
}))


app.use(bodyParser.json())


const SELECT='SELECT * FROM student';
const connection =mysql.createConnection({

	host:'localhost',
	user:'root',
	password:'root',
	database:'first_db'
});

connection.connect(err=>{
	if(err)
		return err;
});

app.use(cors());

app.get('/',(req,res)=>{
	res.send('hello this is from server');
});

app.post('/student/add',(req,res)=>{
	console.log(req);
	const {name}=req.body;
	const insert=`INSERT INTO student(name) VALUE('${name}')`;
	connection.query(insert,(err,results)=>{
		if(err)
			return res.send(err);
		else
			return res.send('Data is added successfully');
	})
});

app.get('/student',(req,res)=>{
	connection.query(SELECT,(err,results)=>{
		if(err)
			return res.send(err)
		else{
			return res.json({
				data:results
			})
		}
	});
});


app.listen(5000,()=>{
	console.log(`Listening on port 5000`)
})

//front end
function pos(){
			//var data={name:"teja"}
			fetch("http://localhost:5000/student/add",{
				method:"POST",
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify({name:"killer"})
			}).then((res)=>console.log(res))
			.catch((err)=>console.log(err))
		}

starting multiple commands at a time

"dev": "concurrently \"react-scripts start\" \"nodemon server/server.js\""
we can use cd also to go to a specific directory

for working with .env files in node use 
require("dotenv").config(); npm install dotenv

in React
REACT_APP_NAME & process.env.REACT_APP_NAME






