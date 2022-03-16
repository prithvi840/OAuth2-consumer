const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    return res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout(); // available cause of passport
    res.redirect('/');
});

router.use(passport.authenticate('google', { scope: ['profile'] }));
// call the Google+ API and redirect the user to provider consent screen.
router.get('/google');

// First triggers the passport callback function & then pass it to the handler.
router.get('/google/redirect', (req, res) => {
    res.redirect('/profile');
});

module.exports = router;
