const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  async getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  async createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  async updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  
  async deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json({ message: 'Thought deleted!' })
    )
    .catch((err) => res.status(500).json(err));
  },

  async addNewReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$addToSet:{
            reactions: req.params.reactionId
        }},
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with this id!" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },

  async removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$pull:{
            reactions: req.params.reactionId
        }},
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with this id!" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
};
