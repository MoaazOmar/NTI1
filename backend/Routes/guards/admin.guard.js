module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next();  
    } else {
        console.log('Not an admin');
        res.status(403).json({ message: 'Access denied. Admins only.' });  
    }
};
