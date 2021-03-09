const express = require('express');
const router = express.Router();
const users = require('../controller')
const verfyUser = require('../middleware')
/* GET users listing. */
router.post('/signup',[verfyUser.verifyUser], users.UserSignup);
router.post('/login', users.UserLogin)
module.exports = router;
