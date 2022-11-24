const { Schema, model } = require('mongoose');
const reactionSchema = require('./ReactionSchema');
const moment = require('moment')


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date,
      default: moment().format('L'),

    },
    username:[
        {
          type: String,
          required: true,
        }
    ],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get( function(){
    return this.reactions.length;
})



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
