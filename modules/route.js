const express = require('express');
const router = express.Router();
const carcontroller=require('./conroller')

router.get('/products',carcontroller.products);
router.post('/addtocart',carcontroller.addtoCart);
router.post('/removecart',carcontroller.removeCart);
router.get('/cartproducts',carcontroller.cartProducts);
router.post('/checkout',carcontroller.checkoutOrders);
module.exports = router;
