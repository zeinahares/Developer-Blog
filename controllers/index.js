const router = require('express').Router();

const apiRoutes = require('./api');
const homePageRoutes = require('./homePageRoutes');
const dashboardRoutes = require('./dashboardRoutes');




router.use('/api', apiRoutes);

// to get here its just "localhost.com/blogs"
// this is to deal with all the blogRoutes
router.use('/blogs', dashboardRoutes);

// to get here its just "localhost.com/"
router.use('/', homePageRoutes);


module.exports = router;
