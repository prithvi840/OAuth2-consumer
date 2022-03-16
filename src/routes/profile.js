const { Router } = require('express');

const router = Router();

const verify = (req, res, next) => {
    if (!req.user) return res.redirect('/auth/login');
    next();
};

router.get('/', verify, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;
