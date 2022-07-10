const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//SIGN UP
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({ message: 'success', data: newUser });
});

//LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1.check if user exists
  if (!email || !password)
    return next(new AppError('Enter Email and Password to log in', 400));

  //2.check if email exists
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError('Wrong email or password, Try again!', 401));
  }

  res.status(200).json({ message: 'success', data: user });
});
