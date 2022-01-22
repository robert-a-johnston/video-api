// Requires express and instantiate express application object
const express = require('express')
const app = express()
// Uses built in http module in node
// Use create server to create server with express framework
const http = require('http')
const server = http.createServer(app)
// Use cors allows cross origin requests
const cors = require('cors')
// Use socket.io
const { Server } = require('socket.io')
const io = new Server(server, {
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



// Socket io
io.on('connection', (socket) =>{
  // Give id on front end
  socket.emit('me', socket.id)

  // Disconnect messages
  socket.on('disconnect', () =>{
    socket.broadcast.emit('callEnded')
  })

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

})


// server listening
server.listen(PORT, () => console.log(`listening on port ${PORT}`))
