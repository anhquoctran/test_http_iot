var express = require('express')
var moment = require('moment')
const { check, validationResult } = require('express-validator/check');

var controller = require('./ConfigurationController')
/**
 * Define RESTful API main router
 * 
 * @param {any} app 
 * @param {any} router 
 */
module.exports = function(app, router) {
    app.use('/', router)

    //index route
    router.route('/').get((req,res) => {
        return res.json({
            message: "welcome",
            time: moment()
        })
    })

    //configure route
    router.get('/configure', [
        check('name').exists().trim().withMessage("cannot be blank")
    ], (req,res) => {
        var body = req.body

        controller.setConfig({
            name = body.name,
            ssid = body.ssid,
            admin_password = body.admin_password,
            password = body.password,
            parameter1 = body.parameter1,
            parameter2 = body.parameter2,
            last_status = body.last_status
        }, (res) => {

        })
        
    })

    router.get('/add_user', [
        check("name").exists().trim()
    ], (req, res) => {
        controller.addUser(req.body.user, (err, result) => {
            if(err) console.error(err)
            else {
                console.log("Added user!")
            }
        })
    })
}