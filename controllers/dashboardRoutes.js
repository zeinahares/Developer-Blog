const router = require('express').Router();
const withAuth = require('../utils/withAuth');

const { BlogPost, Comments, User } = require('../Models');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all blogs and JOIN with user data

        const blogPostsData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id,
            },
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
        res.render('blogs-user-all', {
            blogPosts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// to edit a blog post
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogPostsData = await BlogPost.findByPk(req.params.id);

        // Serialize data so the template can read it
        const blogPosts = blogPostsData.get({ plain: true });

        console.log(blogPosts);

        // Pass serialized data and session flag into template
        res.render('blog-create-edit', {
            blogPosts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// to create a blog post
router.get('/create', withAuth, async (req, res) => {

    res.render('blog-create-edit', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
    });

});
module.exports = router;