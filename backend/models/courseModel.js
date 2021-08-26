import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const courseSchema = mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
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
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    live: {
      type: String,
      required: true,
    },
    accepted: {
      type: Boolean,
      required: true,
      default: false
    },
    changed: {
      type: Boolean,
      required: true,
      default: true
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
    notify: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      }      
    ],
    notifyc: {
      type: Number,
      required: true,
      default: 0,
    },  
    contents: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Content',
    }],
    tweets: [{type: String}],
    domain: {
      type: String,
      required: true,
      default: 'app'
    }
  },
  {
    timestamps: true,
  }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
