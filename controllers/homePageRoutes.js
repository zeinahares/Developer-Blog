const router = require('express').Router();
const withAuth = require('../utils/withAuth');

const { BlogPost, Comments, User } = require('../Models');

module.exports = router;