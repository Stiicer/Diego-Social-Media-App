const { Schema, model, Types } = require('mongoose');
const moment = require('moment')


const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new Types.ObjectId
      },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date,
      default: moment().format('L'),
      

    },
    username:{
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

module.exports = reactionSchema;
