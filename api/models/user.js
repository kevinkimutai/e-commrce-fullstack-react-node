const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Field must contain first name']
  },
  lname: {
    type: String,
    required: [true, 'Field must contain last name']
  },
  email: {
    type: String,
    required: [true, 'Field must contain an email value'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Enter a valid email']
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  password: {
    type: String,
    required: [true, 'Provide a password'],
    minLength: [8, 'Password must be more than 8 characters'],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm password'],
    validate: {
      validator: function(item) {
        return item === this.password;
      },
      message: 'Passwords do not match!'
    }
  },
  active: { type: Boolean, default: true, select: false },
  passwordChangedAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date }
});

//1.HASH PASSWORD BEFORE SAVE TO DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  //save hashed password to db
  this.password = await bcrypt.hash(this.password, 10);

  this.confirmPassword = undefined;
});

//2.COMPARE PASSWORDS FOR LOGIN
userSchema.methods.comparePasswords = function(userPass, dbPass) {
  return bcrypt.compare(userPass, dbPass);
};

// ////BEFORE SAVING TO DB,HASH PASSWORD
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);

//   this.confirmPassword = undefined;
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password') || this.isNew) {
//     return next();
//   }
//   this.passwordChangedAt = Date.now - 1000;
//   next();
// });

// //  Do not show disactive/Deleted Users
// userSchema.pre(/^find/, function(next) {
//   // this points to the current query
//   this.find({ active: { $ne: false } });
//   next();
// });

// //Instance Method for comparing passwords auth
// userSchema.methods.comparePasswords = function(userPass, dbPass) {
//   return bcrypt.compare(userPass, dbPass);
// };

// //instance method to check if password is changed
// userSchema.methods.checkPasswordsChanged = function(jwtTimestamp) {
//   if (this.passwordChangedAt) {
//     const passwordChangedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );

//     return jwtTimestamp < passwordChangedTimestamp;
//   }

//   return false;
// };

// //CREATE PASSWORD TOKEN
// userSchema.methods.createPasswordResetToken = function() {
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

const User = mongoose.model('user', userSchema);
module.exports = User;
