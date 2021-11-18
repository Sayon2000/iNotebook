const connectToDb = require('./db')

const express = require('express')

const cors = require('cors')
const app = express()
const port = 5000

connectToDb()

//middleware
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Available routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



//Starting the server
app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})