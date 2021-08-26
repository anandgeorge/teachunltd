import mongoose from 'mongoose'

const contentSchema = mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    accepted: {
      type: Boolean,
      required: true,
      default: false
    },
    subscribers: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }],
    coins: {
      type: Number,
      required: true,
      default: 10
    },    
    collected: {
      type: Number,
      required: true,
      default: 0
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      }      
    ],
    likesc: {
      type: Number,
      required: true,
      default: 0,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  {
    timestamps: true,
  }
)

const Content = mongoose.model('Content', contentSchema)

export default Content
