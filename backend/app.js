const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const homeRouter = require('./Routes/home.route');
const connectToDB = require('./Config/database.config');
const productRouter = require('./Routes/singleProduct.route');
const authRouter = require('./Routes/auth.route');
const cartRouter = require('./Routes/cart.route');
const adminRouter = require('./Routes/admin.route');
const productRouterAll = require('./Routes/products.route')
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const cors  = require('cors')
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON data

// Custom CORS Middleware
app.use(cors({
    origin: 'http://localhost:4200',  // Allow only the Angular frontend
    credentials: true  // Allow cookies/sessions to be sent
}));
app.options('*', cors());  // Enable OPTIONS requests for all routes


// Static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));

// Session store
const STORE = new sessionStore({
    uri: 'mongodb://127.0.0.1:27017/online-shops',
    collection: 'sessions'
});

// Session middleware
app.use(session({
    secret: 'this my secret hash express sessions to encrypt......',
    saveUninitialized: false,
    resave: false,
    store: STORE
}));

// Flash middleware
app.use(flash());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
app.use('/cart', cartRouter);
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter); // Admin routes without '/api' prefix
app.use('/products' , productRouterAll)
// Connect to the DataBase
connectToDB.connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
