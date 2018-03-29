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
            message: "this is home call",
            time: moment()
        })
    })

    //configure route
    router.get('/configure', [
        check('name').exists().withMessage("cannot be blank")
    ], (req,res) => {
        controller.setConfig({

        }).then(result => {
            return res.json({
                message: "this is configure call",
                time: moment()
            })
        })
        
    })
}