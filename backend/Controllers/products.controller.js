const { Product } = require('../Models/products.model');
const { getAllProducts, getProductByID, getProductByPagination, getSuggestionsProducts , getMostLikedProducts,
    getMostCommentedProducts,
    getNewestProducts,
    getRandomProduct,
    getAllProductsMixed,
    getProductByPaginationWithGenderFilter} = require('../Models/products.model');

exports.createProduct = async (req, res, next) => {
    try {
        req.body.image = req.file.filename;
        const { name, color, price, description, category, gender } = req.body;
        const newProduct = new Product({
            name,
            color,
            price,
            description,
            category,
            gender,
            image: req.body.image
        });
        await newProduct.save();
        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error("Error creating product", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await getProductByID(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product, user: req.session.user || null, isAdmin: req.session.user?.isAdmin || false });
    } catch (error) {
        console.error("Error fetching the product", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTwelveProductsPerPage = async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.query.page, 10) || 1; // Get page from query string
        const productsPerPage = 4;
        const productsList = await getProductByPagination(pageNumber, productsPerPage);

        return res.status(200).json(productsList);
    } catch (error) {
        console.error("Error fetching paginated products", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getSuggestionsProducts = async (req, res, next) => {
    try {
        const query = req.query.query;
        const suggestions = await getSuggestionsProducts(query);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getProductsByGenderPaginated = async (req, res, next) => {
    try {
      const { gender, page, pageSize } = req.query;
      const skip = (page - 1) * parseInt(pageSize);
      const productsList = await getProductByPaginationWithGenderFilter(gender, parseInt(pageSize), skip);
      return res.status(200).json(productsList);
    } catch (error) {
      console.error("Error fetching paginated products by gender:", error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

exports.getCarouselProducts = async (req, res, next) => {
    try {
        const { gender } = req.query; // Get gender from query params
        let products;

        if (gender) {
            const mostLiked = await getMostLikedProducts(gender, 1); 
            const mostCommented = await getMostCommentedProducts(gender, 1); 
            const newest = await getNewestProducts(gender, 1);
            const random = await getRandomProduct(gender); 
            products = [...mostLiked, ...mostCommented, ...newest, random];
        } else {
            products = await getAllProductsMixed(); 
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching carousel products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};