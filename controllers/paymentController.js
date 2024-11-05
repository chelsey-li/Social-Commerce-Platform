exports.createCheckoutSession = catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.productId);
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.images
          },
          unit_amount: product.price * 100
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/orders/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/products/${product.id}`
    });
  
    res.status(200).json({
      status: 'success',
      session
    });
  });
