const router = require('express').Router();
const withAuth = require('../utils/withAuth');

const { BlogPost, Comments, User } = require('../Models');

router.get('/', async (req, res) => {
    try {
        // Get all blogs and JOIN with user data

        const blogPostsData = await BlogPost.findAll({
            include: [{ model: User }],
            order: [['updatedAt', 'DESC']],
        });

        // Serialize data so the template can read it
        const blogPosts_noComments = blogPostsData.map((post) => post.get({ plain: true }));

        let commentsLength = 0;

        const blogPosts = await Promise.all(

            blogPosts_noComments.map(async (post) => {

                const blogPostID = post.id;

                const commentsData = await Comments.findAll({
                    where: {

                        blogPost_id: blogPostID,

                    },
                });

                if (commentsData) {
                    commentsLength = commentsData.length;
                } else {
                    commentsLength = 0;
                }

                return {
                    ...post,
                    commentsLength,
                };

            })
        );

        // Pass serialized data and session flag into template

        console.log(blogPosts);
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signUp', {
        logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    
    console.log(req.session.logged_in)
    try{
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('login', {
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.log(error);
    }

});

router.get('/logout', (req, res) => {

    res.redirect('/');
});


router.get('/:id', async (req, res) => {
    try {
        // Get all blogs and JOIN with user data
        const blogPostsData = await BlogPost.findByPk(req.params.id,
            {
                include: [{ model: User }],
            });

        // Serialize data so the template can read it
        const blogPosts = blogPostsData.get({ plain: true });

        console.log(blogPosts);

        const commentsData = await Comments.findAll({
            where: {
                blogPost_id: blogPosts.id,
            },
            include: [{ model: User }],
        });

        // Serialize data so the template can read it
        const commentsArray = commentsData.map((post) => post.get({ plain: true }));

        console.log(commentsArray);

        // Pass serialized data and session flag into template
        res.render('blog-one', {
            blogPosts,
            commentsArray,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});



module.exports = router;