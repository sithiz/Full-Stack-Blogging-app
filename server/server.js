const express = require('express')
const app = express()
const PORT = 9000
const { Client } = require('pg')
const connectionString = 'postgres://sithis@localhost:5432/BlogWebsite';


const client = new Client({
	connectionString:connectionString
})
const errorHandling = (error) => {
	if(error) return error.stack
}

client.connect()

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/Users', (request,response)=>{
			client.query('SELECT * FROM Users',(error,result)=>{
				errorHandling(error)
					response.send(result.rows)
				})			
})
app.get('/Users/:email', (request,response)=>{
			let email = request.params.email
			client.query('SELECT * FROM Users WHERE email = $1', [email], (error,result)=>{
				errorHandling(error)
					response.send(result.rows)
			})
})
app.get('/Posts', (request,response)=>{
			client.query('SELECT Username, Post_body FROM Posts', (error,result)=>{
				errorHandling(error)
					response.send(result.rows)
			})		
})	
app.get('/Posts/:postUserName',(request,response)=>{
			let postUserName = request.params.postUserName
			client.query('SELECT * FROM Posts WHERE Username = $1', [postUserName], (error,result)=>{
				errorHandling(error)
					response.send(result.rows)
			})
})
app.post('/NewUser',(request,response)=>{
			let data = {
				username:request.body.username,
				email:request.body.email
			}
			client.query('INSERT INTO Users(username,email) VALUES ($1,$2)', [data.username,data.email], (error,result)=>{
				errorHandling(error)
				response.send('success')
			})
			
})







app.listen(PORT, ()=>{
	console.log('connected via port:' + PORT)
})



