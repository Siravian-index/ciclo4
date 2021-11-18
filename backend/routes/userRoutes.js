const { Router } = require('express');
const userControllers = require('../controllers/userControllers');

const router = Router();

router.post('/signup', userControllers.signup_post);
router.post('/login', userControllers.login_post);

module.exports = router;
