const express = require('express')
const app = express()
const PORT = 9000
const { Client } = require('pg')
const connectionString = 'postgres://sithis@localhost:5432/BlogWebsite';


const client = new Client({
	connectionString:connectionString
})

client.connect()

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/Users', (request,response)=>{
			client.query('SELECT * FROM Users',(error,result)=>{
				if(error) throw error
					response.send(result.rows[0])
				})			
})
app.get('/Posts', (request,response)=>{
			client.query('SELECT Username, Post_body FROM Posts', (error,result)=>{
				if(error) throw error
					response.send(result.rows)
					console.log(result)
			})		
})	

app.listen(PORT, ()=>{
	console.log('connected via port:' + PORT)
})