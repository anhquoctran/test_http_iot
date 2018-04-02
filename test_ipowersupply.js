var dgram = require('dgram')
var ip = require('ip')

const PORT = 8088
var HOST = ip.address()

var dataRecv = JSON.stringify({
    sign: '{#}',
    ip: '127.0.0.1',
    password: ''
})

var socket = dgram.createSocket('udp4')
socket.bind(PORT, function() {
    socket.setBroadcast(true)
    socket.setMulticastTTL(128)
    //socket.addMembership('191.255.255.255')
    socket.setMulticastInterface('0.0.0.0')
});
socket.on('listening', function() {
    
    console.log("UDP Server is listening at: " + PORT)
})

socket.on('message', function(msg, client) {
    console.log("Received message from " + client.address + ":" + client.port + " at " + new Date().toLocaleString('vn'))

    if(msg.toString() === '{#}') {
        console.log("Receive get_device_config request...")
        var data = JSON.stringify({
            name: "DEVICE EXAMPLE",
            last_status: true,
            ip: HOST,
            auth: true
        })
        var message = new Buffer(data)

        socket.send(message, 0, message.length, PORT, client.address, function(err) {
            if (err) throw err

            console.log('Message has been sent to ' + client.address + ":" + PORT)
            //socket.close()
        })
    } else if(msg.toString() === '{$}') {
        socket.send(new Buffer("{A}"), 0, message.length, PORT, client.address, function(err) {
            if(err) {
                throw err
            } else {
                console.log('Message has been sent to ' + client.address + ":" + PORT)
            }
        })
    } else {
        console.log("message from: " + msg.toString())
        var data = "This is for you: " + msg.toString()
        socket.send(new Buffer(data), 0, data.length, PORT, client.address, function(err) {
            console.log("Echo success")
        })
    }
})