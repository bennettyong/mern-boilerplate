var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
//testing salt value
const SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username:{
		type : String,
		required : true,
		max : 100
	},
	email:{
		type : String,
		required : true,
		max : 100
	},
	password:{
		type : String,
		required : true,
		max : 100
	}

})
UserSchema.pre('save', function(next){
	let user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) return err;
		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) return err;
			user.password = hash;
			next();
		})
	})
})

UserSchema.methods.comparePasswords = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err) return err;
		cb(null, isMatch);
	})
}

UserSchema
.virtual('name')
.get(function(){
	return this.first_name + ", " + this.family_name
})

UserSchema
.virtual('url')
.get(function(){
	return '/api/user/' + this._id
})

var User = mongoose.model('User', UserSchema);

module.exports = User
