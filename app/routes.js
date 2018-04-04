var express = require('express')
var moment = require('moment')
const {
    check,
    validationResult
} = require('express-validator/check');

var controller = require('./ConfigurationController')
/**
 * Define RESTful API main router
 * 
 * @param {any} app 
 * @param {any} router 
 */
module.exports = function (app) {

    app.get('/favicon.ico', function (req, res) {
        res.status(204);
    });

    //index route
    app.get('/', (req, res) => {
        return res.json({
            message: "welcome",
            time: moment()
        })
    })

    //configure route
    app.post('/configure', [
        check('device_name').exists().trim().withMessage("cannot be blank"),
        check('ssid').exists().trim().withMessage("cannot be blank")
    ], (req, res) => {
        var errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.error("Error data validation")
            return res.status(400).send({
                message: "VALIDATION_FAILED",
                status: 400,
                success: false
            })
        }
        
        var body = req.body
        console.log("Received new config >> " )
        console.log(JSON.stringify(body))
        controller.setConfig({
            name: body.device_name,
            ssid: body.ssid,
            admin_password: body.admin_password,
            password: body.passwd,
            parameter1: body.param1,
            parameter2: body.param2
        }, (err, result) => {
            if (result == true) {
                return res.json({
                    status: 200,
			        msg: "SUCCESS"
                })
            } else {
                return res.status(500).send({
                    status: 500,
                    message: "CONFIG_FAILED",
                    
                })
            }
        })

    })

    app.get('/add_user', [
        check("name").exists().trim()
    ], (req, res) => {
        controller.addUser(req.body.user, (err, result) => {
            if (err) console.error(err)
            else {
                console.log("Added user!")
            }
        })
    })
}