const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought, 
  addNewReaction, 
  removeReaction,
} = require('../../controller/Thought');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').put(addNewReaction);
router.route('/:thoughtId/reactions/:reactionId').put(removeReaction);

module.exports = router;
