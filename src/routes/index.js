const router = require('express').Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);
router.use('/profile', require('./profile'))

module.exports = router;
