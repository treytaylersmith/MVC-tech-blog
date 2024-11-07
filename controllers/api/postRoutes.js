const router = require('express').Router();
const { Post } = require('../../models');
const { withApiAuth } = require('../../utils/auth')

// POST route for root endpoint that handles creating a new blog post
router.post('/', withApiAuth, async (req, res) => {
  const body = req.body
  try {
    // Sequelize function used to create a new entry in the Post table
    const newPost = await Post.create({
      ...body,
      userId: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT request that takes id as a parameter representing the ID of the post to be updated
router.put('/:id', withApiAuth, async (req, res) => {
  try 
    {
     const [affectedRows] = await Post.update(req.body, 
      { where: 
        { id: req.params.id } 
      });

      if(affectedRows > 0) {
        res.status(200).end();
      }
      else {
        res.status(400).end(); 
      }
    } catch(err) {
        res.status(500).json(err)
    };
});

// DELETE route for deleting existing blog post by its id parameter 
router.delete('/:id', withApiAuth, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(affectedRows > 0) {
      res.status(200).end();
    }
    else {
      res.status(400).end(); 
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
