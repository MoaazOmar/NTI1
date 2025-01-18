    const mongoose = require('mongoose');
    const { connectDB, disconnectDB } = require('../Config/database.config');

    // Create the schema
    const productSchema = mongoose.Schema({
        name: String,
        image: String, 
        color: String,
        price: Number,
        description: String,
        category: String,
        gender: {
            type: [String],
            enum: ['Male', 'Female', 'All','Special']
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        stock: {
            type: Boolean,  
            default: true
        },
        comments: [{
            user: String,
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }],
    });

    // Create the model
    const Product = mongoose.model('product', productSchema);

    const getAllProducts = async (limit, skip) => {
        try {
          await connectDB();
          const products = await Product.find().skip(skip).limit(limit); 
          await disconnectDB();
          return products;
        } catch (err) {
          console.error('An error occurred while fetching products:', err);
          throw err;
        }
      };
      
    // get the product based on catagory

const getProductsByCategory = async (category) => {
    try {
        await connectDB();  // Ensure DB connection
        const filteredProducts = await Product.find({ category: category });  // Filtering by category
        await disconnectDB();  // Disconnect after fetching
        return filteredProducts;
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        throw error;
    }
};    
    const getProductByID = async (id) =>{
        try{
            await connectDB()
            const productID = await Product.findById(id)
            await disconnectDB()
            return productID
    
        }
        catch(err){
            console.error('Error fetching SingleProductID:', error);
            throw error;
        }
    };

    const getProductsByGender = async (gender, limit, skip) => {
        try {
          await connectDB();
          const filteredProducts = await Product.find({ gender: { $in: [gender] } })
                                                 .skip(skip)
                                                 .limit(limit); // Apply pagination
          await disconnectDB();
          return filteredProducts;
        } catch (error) {
          console.error('Error occurs during filtering ProductGender:', error);
          throw error;
        }
      };
        const getProductByPagination = async (pageNumber, productsPerPage) => {
        try {
            await connectDB();
            const paginationProducts = await Product.find()
                .skip((pageNumber - 1) * productsPerPage)
                .limit(productsPerPage);
            await disconnectDB();
            return paginationProducts;                                           
        } catch (error) {
            console.error('Error occurs during Pagination', error);
            throw error;
        }
    };
        // get the products filtered by genders and pagination occures same time
        const getProductByPaginationWithGenderFilter = async (gender, limit, skip) => {
            try {
                await connectDB();
                const query = gender ? { gender: { $in: [gender] } } : {}; 
                const products = await Product.find(query)
                                              .skip(skip) 
                                              .limit(limit); 
                // await disconnectDB();
                return products;
            } catch (error) {
                console.error('Error in getProductByPaginationWithGenderFilter:', error);
                throw error;
            }
        };    
        const getSuggestionsProducts = async (query) => {
            try {
                await connectDB();
                const suggestions = await Product.find({ name: { $regex: query, $options: 'i' } }).limit(10);
                await disconnectDB();
                return suggestions;
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                throw error;
            }
        };
        
    // Get most liked products for a specific gender

    const getMostLikedProducts = async (gender, limit = 3) => {
        try {
            await connectDB();
            const products = await Product.find({ gender: { $in: [gender] } })
                                          .sort({ likes: -1 })
                                          .limit(limit);
            await disconnectDB();
            return products;
        } catch (error) {
            console.error('Error fetching most liked products:', error);
            throw error;
        }
    };
        // Get most commented products for a specific gender
    const getMostCommentedProducts = async (gender, limit = 3) => {
        try {
            await connectDB();
            const products = await Product.find({ gender: { $in: [gender] } })
                                          .sort({ 'comments.length': -1 })
                                          .limit(limit);
            await disconnectDB();
            return products;
        } catch (error) {
            console.error('Error fetching most commented products:', error);
            throw error;
        }
    };
    // Get newest products for a specific gender
    const getNewestProducts = async (gender, limit = 3) => {
    try {
        await connectDB();
        const products = await Product.find({ gender: { $in: [gender] } })
                                      .sort({ _id: -1 })
                                      .limit(limit);
        await disconnectDB();
        return products;
    } catch (error) {
        console.error('Error fetching newest products:', error);
        throw error;
    }
};
    // Get a random product for a specific gender
    const getRandomProduct = async (gender) => {
        try {
            await connectDB(); // Connect to the database
            const count = await Product.countDocuments({ gender: { $in: [gender] } }); // Count the number of products for the specified gender
            const randomIndex = Math.floor(Math.random() * count); // Generate a random index between 0 and count - 1
            const product = await Product.findOne({ gender: { $in: [gender] } }).skip(randomIndex); // Find a product with the random index
            await disconnectDB(); // Disconnect from the database
            return product; // Return the random product
        } catch (error) {
            console.error('Error fetching random product:', error); // Log any errors
            throw error; // Re-throw the error
        }
    };
    // Get all products (for direct navigation to shopping route)
    const getAllProductsMixed = async () => {
    try {
        await connectDB();
        const mostLiked = await Product.find().sort({ likes: -1 }).limit(1);
        const mostCommented = await Product.find().sort({ 'comments.length': -1 }).limit(1);
        const newest = await Product.find().sort({ _id: -1 }).limit(1);
        const random = await Product.findOne().skip(Math.floor(Math.random() * await Product.countDocuments()));
        const products = [...mostLiked, ...mostCommented, ...newest, random];
        await disconnectDB();
        return products;
    } catch (error) {
        console.error('Error fetching mixed products:', error);
        throw error;
    }
};

    module.exports = {
        Product,
        getAllProducts,
        getProductsByCategory,  
        getProductByID,
        getProductsByGender,
        getProductByPagination,
        getProductByPaginationWithGenderFilter,
        getSuggestionsProducts,
        getMostLikedProducts,
        getMostCommentedProducts,
        getNewestProducts,
        getRandomProduct,
        getAllProductsMixed
        
    };

