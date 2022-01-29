const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");


// Create Product -- Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    // req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  

// get all products
exports.getAllProducts = asyncHandler(async (req, res) =>{
   
      
      const products = await Product.find();
   
      res.status(200).json({
        success: true,
        products,
      });
     
    })

//get Product details
exports.getProductDetails = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return  res.status(500).json({
            success: false,
            message:"product not found",
            // productsCount
        })
        
    }
    res.status(200).json({
        success:true,
        product
    })
})

//update product 

exports.updateProduct = asyncHandler(async(req, res) =>{
    
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success: false,
            message:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,
          {new:true, runValidators:true, useFindAndModify:false}
    )
     res.status(200).json({
         success:true,
         product
     })
})

// Delete Product

exports.deleteProduct = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success: false,
            message:"Product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Removed successfully"
    })
})
  