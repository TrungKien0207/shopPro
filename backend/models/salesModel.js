import mongoose from 'mongoose'

const saleSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
         minlength: [1, 'Quá ngắn'],
         maxlength: [32, 'Quá dài'],
         text: true,
      },
      slug: {
         type: String,
         trim: true,
         unique: true,
         lowercase: true,
         index: true,
      },
   },
   { timestamps: true }
)

const Sale = mongoose.model('Sale', saleSchema)
export default Sale
