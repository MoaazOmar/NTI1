const router = require('express').Router();
const { getSingleProduct } = require('../Controllers/products.controller');

// Add dynamic ID in the route
router.get('/:id', getSingleProduct);

module.exports = router;
