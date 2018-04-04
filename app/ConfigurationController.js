var loki = require('lokijs')
var path = require('path')
var device = require('../device')
var fs = require('fs')
var db = new loki(path.join(__dirname, "..", "users.json"))
db.autosave = true
var users = db.addCollection("users")

function ConfigurationController() {

    this.reset = function () {
        resetInternal()
    }

    function resetInternal() {
        device.name = "Device example"
        device.ssid = "example ssid"
        device.admin_password = "1234"
        device.password = "1234"
        device.parameter1 = ""
        device.paramater2 = ""
        device.last_status = true
    }

    this.setConfig = function (data, cb) {

        if (data) {
            device.name = data.name
            device.ssid = data.ssid
            device.admin_password = data.admin_password
            device.password = data.password
            device.parameter1 = data.parameter1
            device.paramater2 = data.paramater2
            device.last_status = data.last_status

            var deviceData = JSON.stringify(device)
            fs.writeFile('../device.json', deviceData, function (err) {
                if (err) cb(err, false)
                else {
                    cb(null, true)
                }
            });
        } else {
            return cb("Data cannot be blank", false)
        }

    }

    function setConfigInternal(data, cb) {


    }

    this.addUser = function (user, cb) {
        var user = {
            id: user.id,
            username: user.username,
            password: user.password
        }
        var count = users.count({})
        console.log(count.toString())
        if (count < 10) {
            
            users.insert(user)

            db.save(function (err) {
                if (err) {
                    return cb(err, null)
                } else {
                    return res.json(null, {
                        message: "SAVE_OK",
                        success: true,
                        status: 200
                    })
                }
            })
        } else {
            return cb("Maximum number of users allowed", null)
        }

    }
}

module.exports = new ConfigurationController()