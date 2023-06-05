const router = require('express').Router();

const userRoutes = require('./userAPIRoutes');
const blogPostAPIRoutes = require('./blogPostAPIRoutes');
const commentsRoutes = require('./commentsAPIRoutes');

// to get here it's "localhost.com/api/"

router.use('/users', userRoutes);
router.use('/blogPost', blogPostAPIRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;