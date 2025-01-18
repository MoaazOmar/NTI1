const upload = require('../Config/multer.config'); // Import multer configuration
const { getOrders, Order, updateTheStatus, getOrderByStatus, getOrderByNameOfCustomer } = require('../Models/order.model');
const { connectDB } = require('../Config/database.config');
const { getAllProducts, Product } = require('../Models/products.model');

// Add a product (with file upload)
exports.postAdd = [
    upload.single('image'), 
    async (req, res, next) => { 
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Image file is required' });
            }

            req.body.image = req.file.filename;

            const { name, color, price, description, category, gender } = req.body;

            const newProduct = new Product({
                name, color, price, description, category, gender, image: req.body.image
            });

            await newProduct.save();

            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            console.error("Error Creating Product:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
];

// Get all orders or filter by status or customer name
exports.getOrders = async (req, res, next) => {
    try {
        let status = req.query.status;
        let validCategories = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
        let orders;
        let nameOfCustomer = req.query.custmorName;

        if (nameOfCustomer) {
            orders = await getOrderByNameOfCustomer(nameOfCustomer);
        } else {
            if (status && validCategories.includes(status) && status !== 'All') {
                orders = await getOrderByStatus(status);
            } else {
                orders = await getOrders();
            }
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Post an order
exports.postOrders = async (req, res, next) => {
    try {
        const { custmorName, address, name, price, productID, amount } = req.body;

        console.log('Incoming order data:', req.body);

        if (!custmorName || !address || !name || !price || !productID || !amount) {
            console.log('Invalid data:', req.body);
            return res.status(400).json({ message: 'Invalid order data. Please try again.' });
        }

        await connectDB();

        const itemsCount = Array.isArray(name) ? name.length : 1;

        for (let i = 0; i < itemsCount; i++) {
            const order = new Order({
                userID: req.session.user.id,
                username: req.session.user.username,
                custmorName,
                address,
                name: Array.isArray(name) ? name[i] : name,
                price: Array.isArray(price) ? price[i] : price,
                productID: Array.isArray(productID) ? productID[i] : productID,
                amount: Array.isArray(amount) ? amount[i] : amount,
                timestamp: Date.now()
            });

            await order.save();
            console.log('Order placed successfully!');
        }

        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error("Error during order placement:", error);
        res.status(500).json({ message: 'Failed to place the order. Please try again.' });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
    await connectDB();
    try {
        const { orderId, status } = req.body; 

        const updatedStatusOrder = await updateTheStatus(orderId, status);

        res.status(200).json({ message: 'Status of order has been updated', order: updatedStatusOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};

// Display all products
exports.getProductList = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Failed to fetch product list' });
    }
};

// Update product details
exports.updateProduct = async (req, res, next) => {
    const { productId, name, color, price, description, category, gender, stock } = req.body;
    try {
        await connectDB();
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name, color, price, description, category, gender, stock: stock === 'true'
        }, { new: true });
        
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// Add product page (API response)
exports.getAdd = (req, res, next) => {
    res.status(200).json({
        message: 'Add product page',
        isAdmin: req.session.user ? req.session.user.isAdmin : false,
        Userid: req.session.user ? req.session.user.id : null
    });
};
