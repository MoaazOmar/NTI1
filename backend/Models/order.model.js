const mongoose = require('mongoose');
const {
    connectDB,
    disconnectDB
} = require('../Config/database.config');

// create schema 
const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    username: String,
    userID: String,
    productID: String,
    orderID: String,
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    custmorName: String,  
    address: String       
});

const Order = mongoose.model('Order', orderSchema);

// Function To get  the Orders 

const getOrders = async () => {
    await connectDB();
    try {
        const orders = await Order.find();
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    } 
};


const updateTheStatus = async (orderId, status) => {
    await connectDB();
    try {
        const updatedStatusOrder = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
        return updatedStatusOrder;
    } catch (error) {
        console.error('Error occures during status update:', error);
        throw error;
    }
};

const getOrderByStatus = async(status) => {
    await connectDB()
    try{
        const filteredStatusOrders = await Order.find({status:status})
        return  filteredStatusOrders
    }
    catch(error){
        console.error('Error occures during filtering:', error);
        throw error;

    }
}

const getOrderByNameOfCustomer = async(name) => {
    await connectDB()
    try{
        const filteredNameOrders = await Order.find({
            custmorName: { $regex: `^${name}`, $options: 'i' }
        });
        return filteredNameOrders
    }
    catch{
        console.error('Error occures during Searching name:', error);
        throw error;
    }
}

module.exports = {
    Order,
    getOrders,
    updateTheStatus,
    getOrderByStatus,
    getOrderByNameOfCustomer
};
