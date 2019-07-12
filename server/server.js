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
			client.query('SELECT * FROM Users',
				(error,result)=>{
				errorHandling(error)
					response.send(result.rows)
				})			
})
app.get('/Users/:email', (request,response)=>{
			let email = request.params.email
			client.query('SELECT * FROM Users WHERE email = $1', 
				[email], 
				(error,result)=>{
				errorHandling(error)
					response.send(result.rows)
			})
})
app.get('/Posts', (request,response)=>{
			client.query('SELECT Username, Post_body FROM Posts', 
				(error,result)=>{
				errorHandling(error)
					response.send(result.rows)
			})		
})	
app.get('/Posts/:postUserName',(request,response)=>{
			let postUserName = request.params.postUserName
			client.query('SELECT * FROM Posts WHERE Username = $1', 
				[postUserName], 
				(error,result)=>{
				errorHandling(error)
					response.send(result.rows)
			})
})
app.post('/NewUser',(request,response)=>{
			let newData = {
				username:request.body.username,
				email:request.body.email
			}
			client.query('INSERT INTO Users(username,email) VALUES ($1,$2)', 
				[newData.username,newData.email], 
				(error,result)=>{
				errorHandling(error)
					response.send('Data Sent')
			})
			
})
app.post('/NewPost', (request,response)=>{
			let newData = {
				username:request.body.username,
				post_title:request.body.post_title,
				post_body:request.body.post_body,
				tags:request.body.tags,
				categories:request.body.categories,
			} 
			client.query('INSERT INTO Posts(username,post_title,post_body,tags,categories,post_ID) VALUES($1,$2,$3,$4,$5)', 
				[newData.username,newData.post_title,newData.post_body,newData.tags,newData.categories], 
				(error,result)=>{
				console.log(newData.post_ID)
				errorHandling(error)
					response.send('Data Sent')
			})
})
app.put('/UpdatingUser', (request,response)=>{
			let updatedData = {
				username:request.body.username,
				email:request.body.email
			}
			client.query('UPDATE Users SET email = ($1) WHERE username = ($2)',
				[updatedData.email,updatedData.username], (error,result)=>{
				errorHandling(error)
					response.send('Data sent')
			})
})	
app.put('/UpdatingPost',(request,response)=>{
			let updatedData ={
				username:request.body.username,
				post_title:request.body.post_title,
				post_body:request.body.post_body
			}
			client.query('UPDATE Posts SET post_body = ($1) WHERE username = ($2) AND post_title = ($3)',
				[updatedData.post_body,updatedData.username,updatedData.post_title], 
				(error,result)=>{
				errorHandling(error)
					response.send('Data Sent')
			})
})



app.listen(PORT, ()=>{
	console.log('connected via port:' + PORT)
})


