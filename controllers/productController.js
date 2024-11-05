exports.getAllProducts = catchAsync(async (req, res) => {
    // Advanced query features
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
  
    const products = await features.query;
  
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  });
  
  exports.createProduct = catchAsync(async (req, res) => {
    // Image upload handling
    const images = req.files.map(file => file.filename);
    
    const newProduct = await Product.create({
      ...req.body,
      seller: req.user.id,
      images
    });
  
    // Send email notification to followers
    await sendNewProductEmail(req.user, newProduct);
  
    res.status(201).json({
      status: 'success',
      data: { product: newProduct }
    });
  });