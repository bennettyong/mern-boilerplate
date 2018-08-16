var User = require('../models/user');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
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
                    if (err) return err;
                        res.json({
                            result: result
                        })
                    })}
            else{
                res.status(404).send('Invalid Login Information')
            }
        })
}
// Display list of all users.
exports.user_list = function(req, res) {
    console.log("called")
        User.find()
        .exec(function (err, users) {
            if (err) { return next(err); } // Error in API usage.
            if (users==null) { // No results.
                var err = new Error('User not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            return res.json({
                title:'User List',
                user_list: users,
            })
    });
    /* User.find({role : 1})
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      //Successful, so render
      return res.json({ title: 'User List', user_list: list_users });
    }); */
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    User.find({_id : req.params.id})
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      //Successful, so render
      return res.json({ title: 'User', user_list: list_users });
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
            console.log(errors.array())
            res.send(errors.array());


        }
        else if (req.body.password !== req.body.repassword){
            var msg = [{
                location: "body", 
                param: "repassword", 
                msg: "Passwords do not match"
            }]
            res.send(msg);
        }
        else {
            User.find({email : req.body.email})
            .exec(function (err, list_users) {
            if (err) { next(err) }
              //Successful, so render
            else if(list_users.length !== 0){
            return res.json([{ 
                location: 'body', 
                param: "email",
                msg: "Email has been registered" }]);
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
                return res.json({
                    result: 'success',
                    user : user
                })
            })
            }
            });
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            
        }}
]
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