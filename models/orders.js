const mongoose = require('mongoose')
const orders = new mongoose.Schema({
   orders_id : String,
   orders_user : String,
   orders_product: String,
   orders_amount: String
})

module.exports = mongoose.model("orders",orders)