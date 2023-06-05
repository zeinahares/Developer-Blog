const router = require('express').Router();
const { BlogPost } = require('../../Models');


router.post('/', async (req, res) => {

    try {
        // create a new blogpost
        const newBlog = await BlogPost.create(req.body);
        res.status(200).json(newBlog);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

});

router.put('/:id', async (req, res) => {

    try {
        // update a blog by its `id` value
        const updatedBlog = await BlogPost.update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json(updatedBlog);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    // delete blog by its `id` value
    try {
        const deletedBlog = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(deletedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
