const express = require('express');

const router = express.Router();

const { signUp, login } = require('./../controllers/authController');

router.route('/signup').post(signUp);
router.route('/login').post(login);

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
