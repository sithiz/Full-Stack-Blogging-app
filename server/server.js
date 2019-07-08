let express = require('express')
let app = express()
let PORT = 9000






app.listen(PORT, ()=>{
	console.log(`Im listening on port ${PORT}`)
} )