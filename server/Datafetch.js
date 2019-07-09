const express = require('express')
const app = express()
const PORT = 9000
const { Client } = require('pg')
const connectionString = 'postgres://sithis@localhost:5432/BlogWebsite';


const client = new Client({
	connectionString:connectionString
})


app.get('/', (request,response)=>{
	client.connect()
		.then(
				client.query('SELECT * FROM Users',(error,result)=>{
					if(error) throw error
						response.send(result.rows[0])
					})
			)

		
})
		

app.listen(PORT, ()=>{
	console.log('connected via port:' + PORT)
})