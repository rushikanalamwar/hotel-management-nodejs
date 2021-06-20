var express = require('express')
const { check } = require('express-validator');
var authController = require("../controllers/auth.controller")
const router = express.Router();

router.post('/signup',
    [
        check('username').not().isEmpty(),
        check('eamil').isEmail().normalizeEmail(),
        check('password').isLength({ min: 6 })
    ],
    authController.signup
)

router.post('/login', authController.login)
router.get('/', authController.getAllUsers)
router.get('/allCount', authController.usersCount)
router.get('/user/:id', authController.getUser)




module.exports = router;