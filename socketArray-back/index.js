const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origins: [
            'http://127.0.0.1:5173/',
            'http://127.0.0.1:8080/',
            'http://127.0.0.1:5175/',
            'http://127.0.0.1:5174/',

        ]
    }
})

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>')
})


io.on('connection', (socket) => {
    console.log('Usuario Conectado')

    socket.on('modifyArray', (arr) =>{
        console.log('llego:', arr)
        // hay que mandar el evento a todos menos al sender,
        // pues él hizo el cambio de manera local.
        // de no hacerlo, se actualizaría dos veces el arreglo
        io.sockets.emit('ARRAY_CHANGED', arr)
    })

    socket.on("cutWord", (word) => {
        console.log('llego la palabra', word)
        io.sockets.emit("WORD_CUT", word)
    })

    
})

http.listen(3001, () => {
    console.log('Servidor Iniciado en puerto 3001')
})

module.exports = app
