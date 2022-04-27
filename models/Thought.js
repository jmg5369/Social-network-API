const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
const format = require('../utils/helper')

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (time) {
        format(time)
      }
    },
    username: {
      type: String,
      required: true,
    },
  
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an Thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
