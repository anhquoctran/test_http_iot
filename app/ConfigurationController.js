const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('../device.json')
const db = low(adapter)

function ConfigurationController() {
    
    this.reset = function() {
        return new Promise((resolve, reject) => {
            db.defaults({}).write()
            resolve(true)
        })
    }

    this.setConfig = function(data) {
        return new Promise((resolve, reject) => {
            db.set('name', data.name)
            .set('ssid', data.ssid)
            .set('admin_password', data.admin_password)
            .set('password', data.password)
            .set('parameter1', data.parameter1)
            .set('parameter2', data.parameter2)
            .write(resolve)
        })
    }
}

module.exports = new ConfigurationController()