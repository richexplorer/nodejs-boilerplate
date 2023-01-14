const mongoose = require('mongoose');
const titlize = require('mongoose-title-case');
const unique = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');

const validators = require('./validators.js');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: validators.nameValidator
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: validators.emailValidator
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    validate: validators.usernameValidator
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    validate: validators.passwordValidator
  }
});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

// Make the name capitalization consistent
UserSchema.plugin(titlize, { paths: ['name'], trim: false });

// Encrypt the password before saving
UserSchema.pre('save', function (next) {

  const user = this;
  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

const User = module.exports = mongoose.model('user', UserSchema);
