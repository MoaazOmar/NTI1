const { getAllProducts, getProductsByGender } = require('../Models/products.model');

exports.getHome = async (req, res, next) => {
  try {
    const gender = req.query.gender;
    const limit = parseInt(req.query.limit) || 3; 
    const skip = parseInt(req.query.skip) || 0;   

    let validGenders = ['Male', 'Female', 'Special'];
    let products;

    if (gender && validGenders.includes(gender) && gender !== 'all') {
      products = await getProductsByGender(gender, limit, skip);
    } else {
      products = await getAllProducts(limit, skip);
    }

    return res.status(200).json({ products });
  } catch (err) {
    console.error('Failed to fetch products', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

