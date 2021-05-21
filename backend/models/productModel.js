import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      avatar: { type: String },
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

const productSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: false,
         ref: 'User',
      },

      name: {
         type: String,
         required: true,
      },

      images: [
         {
            public_id: {
               type: String,
               required: false,
            },
            url: {
               type: String,
               required: false,
            },
         },
      ],

      mass: {
         type: String,
         required: false,
      },

      hdsd: {
         type: String,
         required: false,
      },

      hdbq: {
         type: String,
         required: false,
      },

      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Category',
         required: false,
      },

      supplier: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Supplier',
         required: false,
      },

      description: {
         type: String,
         required: true,
      },

      rating: {
         type: Number,
         required: true,
         default: 0,
      },

      reviews: [reviewSchema],

      numReviews: {
         type: Number,
         required: false,
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

      sold: {
         type: Number,
         required: false,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
)

const Product = mongoose.model('Product', productSchema)

export default Product
