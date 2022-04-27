const { Schema, model, mongoose } = require('mongoose');
const format = require('../utils/helper')


// Schema to create Post model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
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
  
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



module.exports = ReactionSchema;
