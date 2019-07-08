const { Client } = require('pg')
const connectionString = 'postgres://sithis@localhost:5432/BlogWebsite';


const client = new Client({
	connectionString:connectionString
})

client.connect();

client.query('SELECT * FROM Users', (error,response)=>{
	console.log(error ? error.message : response.rows[0])
})
