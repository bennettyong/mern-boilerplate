var User = require('../models/user');
var async = require('async');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var util = require('../utils/response');
var message = require('../utils/messages.json');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the     
  //app/collections/models
  var u = {
   email: user.email,
   username: user.username,
   _id: user._id.toString(),
  };
  return token = jwt.sign(u, "cert"/* , { algorithm: 'RS256'}, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  } */);
}

exports.index = function(req, res) {
    res.send(util.error("", message.common_messages_error));
};

exports.user_login = function(req, res){
    var email = req.body.email
    var password =  req.body.password

    User.findOne(
        {'email':email}, 
        function(err, user){
            if(err)return next(err)
            if(user){
                user.comparePasswords(req.body.password, function(err, result){
                    if (err) 
                        res.send(util.error([], message.common_messages_error));
                    if(result){
                        req.session.session_user_id=user._id;
                        req.session.session_username=user.username;
                        req.session.session_email=user.email;

                        req.session.save()
                        var token = generateToken(user)
                        console.log("set sesstion session_user_id " + req.session.session_user_id);
                        console.log("set sesstion session_org_id" + req.session.session_username);
                        console.log("set sesstion get_client_pin" + req.session.session_email);
                        console.log("logged in")
                        res.send(util.success({
                            user: user,
                            token: token
                        }, message.common_messages_record_available));
                    }else{
                        res.send(util.error1( 
                        [{location: "body", param: "email", value: "", msg: "Incorrect Email Address or Password."}],
                        message.in_correct_email_psw_error));
                    }
                    })}
            else{
                res.send(util.error1(
                [{location: "body", param: "email", value: "", msg: "Required parameters value null or missing."}],
                message.required_parameters_null_or_missing));
            }
        })
}
// Display list of all users.
exports.user_list = function(req, res) {
    console.log("called")
        User.find()
        .exec(function (err, users) {
            if (err) { 
                res.send(util.error({
                    user: {}
                }, message.common_messages_error)); } // Error in API usage.
            if (users==null) { 
                // No results.
                var err = new Error('User not found');
                err.status = 404;
                res.send(util.error({
                    user: {}
                }, message.common_messages_error));
                /* return next(err); */
            }
            // Successful, so render.
            res.send(util.success({
                user_list: users,
            }, message.common_messages_record_available)); 
        });
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    User.find({_id : req.params.id})
    .exec(function (err, list_users) {
        if (err) { return next(err); }
      //Successful, so render
        res.send(util.success({
            list_users,
        }, message.common_messages_record_available));
    });
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user create GET');
};

// Handle user create on POST.
exports.user_create_post = [
    body('username').isLength({ min: 1 }).trim().withMessage('Username must be specified.'),
    body('email').isLength({ min: 5 }).trim().withMessage('Email must be specified.'),
    body('password').isLength({ min: 1 }).trim().withMessage('Password must be specified.'),
    body('repassword').isLength({ min: 1 }).trim().withMessage('Repassword must be specified.'),
    // Sanitize fields.
    sanitizeBody('username').trim().escape(),
    sanitizeBody('email').trim().escape(),
    sanitizeBody('password').trim().escape(),
    sanitizeBody('repassword').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            var error = errors.array()
            console.log(error)
            res.send(util.error1(error, message.required_parameters_null_or_missing));
        }
        else if (req.body.password !== req.body.repassword){
            res.send(util.error1(
                [{location: "body", param: "password", value: "", msg: "Passwords do not match."}],
                message.pass_not_same));
        }
        else {
            User.find({email : req.body.email})
            .exec(function (err, list_users) {
            if (err) { next(err) }
              //Successful, so render
            else if(list_users.length !== 0){
                res.send(util.error1(
                [{location: "body", param: "email", value: "", msg: "Email has been registered."}],
                message.email_registered));
            }
            else{
                var user = new User({
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password
                });
                user.save(function (err,user) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                req.session.session_user_id=user._id;
                req.session.session_username=user.username;
                req.session.session_email=user.email;

                req.session.save()
                var token = generateToken(user)
                console.log("set sesstion session_user_id " + req.session.session_user_id);
                console.log("set sesstion session_org_id" + req.session.session_username);
                console.log("set sesstion get_client_pin" + req.session.session_email);
                console.log("logged in")
                res.send(util.success({
                    user: user,
                    token: token
                }, message.common_messages_record_added));
            })}
            });
        }}
]

exports.user = function(req, res) {
    // check header or url parameters or post parameters for token
    var sess = req.session.session_user_id
    console.log("sess");
    if (sess == undefined){
        res.send(util.error({}, 
        message.common_messages_error));
        //res.status(401).json({message: 'Not Logged In'});
    }else{
        User.findById({
            '_id': sess
        }, function(err, user) {
            if (err) throw err;
            var real_token = generateToken(user)
            var token = req.body.token;
            if (!token) {
                res.send(util.error1({
                    user: user,
                    token: real_token}, 
                message.must_pass_token));
            }else if(real_token != token){
                res.send(util.success({
                    user: user,
                    token: real_token
                }, message.token_modified));
            }else{
                res.send(util.success({
                    user: user,
                    token: real_token
                }, message.common_messages_record_available));
            }
         });
    }
};

exports.user_logout = function(req, res) {
    req.session.destroy(function(err) {
        console.log("logged out")
    })
};

// Display user delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete POST');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user update GET');
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user update POST');
};