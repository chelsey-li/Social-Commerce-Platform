const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price']
    },
    description: String,
    images: [String],
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Product must belong to a seller']
    },
    likes: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });
  
  // Compound index for efficient querying
  productSchema.index({ price: 1, likes: -1 });
