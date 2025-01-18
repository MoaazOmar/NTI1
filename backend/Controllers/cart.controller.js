const { validationResult } = require('express-validator');
const { addNewItem, getItemsByUser, editItem, deleteProduct } = require('../Models/cart.model');
const { Product } = require('../Models/products.model');  // Import the Product model

exports.getCart = async (req, res, next) => {
    try {
        const items = await getItemsByUser(req.session.user.id) || [];
        return res.status(200).json({
            messages: {
                error: req.flash('error'),
                success: req.flash('success')
            },
            items: items,
            isUser: true,
            Userid: req.session.user ? req.session.user.id : null,
            isAdmin: req.session.user ? req.session.user.isAdmin : false
        });
    } catch (error) {
        console.error('Error fetching cart items', error);
        return res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};

exports.postCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newItem = await addNewItem({
            amount: req.body.amount,
            name: req.body.name,
            price: req.body.price,
            productID: req.body.productID,
            userID: req.session.user.id,
            timestamp: Date.now()
        });

        return res.status(201).json({ message: 'The product was added to the cart successfully', item: newItem });
    } catch (error) {
        console.error('An error occurred while adding item to cart', error);
        return res.status(500).json({ error: 'Failed to add item to cart. Please try again.' });
    }
};

exports.postSave = async (req, res, next) => {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        try {
            const result = await editItem(req.body.cartId, { amount: req.body.amount, timestamp: Date.now() });
            return res.status(200).json({ message: 'Item updated successfully', item: result });
        } catch (error) {
            console.error('Error updating item:', error);
            return res.status(500).json({ error: 'Failed to update item. Please try again.' });
        }
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
};

exports.postDelete = async (req, res, next) => {
    try {
        const cartId = req.body.cartId;
        await deleteProduct(cartId);
        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Failed to delete the item', error);
        return res.status(500).json({ error: 'Failed to delete item. Please try again.' });
    }
};

exports.getCheckout = async (req, res) => {
    try {
        const items = await getItemsByUser(req.session.user.id) || [];
        return res.status(200).json({
            items: items,
            messages: {
                error: req.flash('error'),
                success: req.flash('success'),
            },
            isUser: true,
            Userid: req.session.user.id,
        });
    } catch (error) {
        console.error('Error fetching checkout items:', error);
        return res.status(500).json({ error: 'Failed to load checkout page.' });
    }
};
