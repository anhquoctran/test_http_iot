var dgram = require('dgram')
var ip = require('ip')

const PORT = 15000
var HOST = ip.address()
var device = require('./device')

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
    console.log("Received message from " + client.address + ":" + client.port + " at " + new Date().toLocaleString('vi'))

    if(msg.toString()[1] === '#') {

        console.log("Receive get_device_config request...")

        device.ip = ip.address()

        var data = JSON.stringify({
            "status": 200,
            "device_name": "example device",
            "device_ip": "192.168.1.5",
            "last_status": true
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
    } else if(msg.toString() === "clear" || msg.toString() === "cls" || msg.toString() === "reset") {
        console.reset()
    } else {
        console.log("Message: " + msg.toString())
        console.log("HEX message: " + displayHex(msg))
        var data = msg.toString()
        socket.send(new Buffer(data), 0, data.length, PORT, client.address, function(err) {
            console.log("Data not valid format. Send echo fallback at " + new Date().toLocaleString('vi'))
        })
    }
})

function displayHex(buffer) {
    var strBuff = buffer.toString('hex').toUpperCase()
    var tmp1 = ""
    var arr = Array.from(strBuff)
    for(var i = 0; i < arr.length; i++) {
        try {
            tmp1 += arr[0+i+i].toString() + arr[1+i+i].toString() + " ";
        } catch (err) {
            tmp1 = tmp1.replaceAt(tmp1.length - 1, '');
            break;
        }
    }
    return tmp1.trim()
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

console.reset = function() {
    return process.stdout.write('\033c');
}