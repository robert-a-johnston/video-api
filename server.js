// Requires express and instantiate express application object
const app = require('express')()
// Uses built in http module in node
// Use create server to create server with express framework
const server = require('http').createServer(app)
// Use cors allows cross origin requests
const cors = require('cors')
// Use socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET','POST']
  }
})

// define server and client ports
// used  for cors and local port declarations
const serverDevPort = 5000
const clientDevPort = 7165

app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`}))

// set port
const PORT = process.env.PORT || serverDevPort

// Route handlers
app.get('/', (req, res) =>{
  res.send('Running on port 5000')
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))
