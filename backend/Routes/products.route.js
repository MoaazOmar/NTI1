const express = require('express');
const router = express.Router();

const productController = require('../Controllers/products.controller')
// const upload            = require('../Config/multer.config')

// router.get('/' ,productController.getAllProducts)
// router.post('/' , upload.single('image') ,productController.createProduct)
router.get('/suggestions' , productController.getSuggestionsProducts );
router.get('/carousel', productController.getCarouselProducts);
router.get('/gender-paginated', productController.getProductsByGenderPaginated);
router.get('/paginated', productController.getTwelveProductsPerPage)
module.exports = router;