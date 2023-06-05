const router = require('express').Router();
const { comments } = require('../../Models');


router.post('/', async (req, res) => {

    try {
        // create a new comment
        const newComment = await comments.create(req.body);
        res.status(200).json(newComment);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.put('/:id', async (req, res) => {

    try {
        // update a comment by its `id` value
        const updatedComment = await comments.update(
            {
                comment_body: req.body.comment_body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json(updatedComment);

    } catch (err) {
  
        res.status(500).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    // delete comment by its `id` value
    try {
        const deletedComment = await comments.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(deletedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
