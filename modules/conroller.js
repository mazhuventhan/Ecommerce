const { DATETIME } = require("mysql/lib/protocol/constants/types")
const connection = require("../db")
var mydb = require("../db")



const products = (req, res) => {
    var qry = "SELECT i.id,i.name,i.price, CONCAT('images/',i.image) AS image FROM products AS i "
    connection.query(qry, function (err, result) {
        if (err) {
            res.send({
                status: 400,
                message: "error",
                data: err

            })
        }
        else (
            res.send({
                status: 200,
                message: "success",
                data: result
            })
        )

    })
}

const addtoCart = (req, res) => {
    var qry = "INSERT INTO cart_products (product_id,quantity,created_at) VALUES(?,?,?)";
    var datetime = new Date();
    connection.query(qry, [req.body.product_id, req.body.quantity, datetime], function (err, result) {
        if (err) {
            res.send({
                status: 400,
                message: "error",
                data: err

            })
        }
        else (
            res.send({
                status: 200,
                message: "added to cart successfully",
                data: result
            })
        )

    })
}

const removeCart = (req, res) => {
    var qry = "SELECT * FROM cart_products where id=?"
    connection.query(qry, [req.body.cart_id], function (err, result) {
        if (err) {
            res.send({
                status: 400,
                message: "error",
                data: err

            })
        }
        else if (result.length > 0) {
            var qry1 = "update cart_products set status=? where id=? and status=?"
            connection.query(qry1, ['1', req.body.cart_id, '0'], function (err, updatedResult) {
                if (err) {
                    res.send({
                        status: 400,
                        message: "error",
                        data: err

                    });
                }
                else if (updatedResult.affectedRows > 0) {
                    res.send({
                        status: 200,
                        message: "successfully removed from cart",
                        data: updatedResult
                    });
                } else {
                    res.send({
                        status: 200,
                        message: "success",
                        data: result
                    });
                }
            });
        }
        else {
            res.send({
                status: 400,
                message: "cart Id is not found",
                data: []
            });
        }

    })
}

const cartProducts = (req, res) => {
    var query = "SELECT c.id AS cart_id,c.product_id,c.quantity,c.`status`,c.created_at,p.id AS product_id, p.name,p.price FROM cart_products c JOIN products p ON p.id=c.product_id WHERE c.`status`=?"
    connection.query(query, ['0'], function (err, result) {
        if (err) {
            res.send({
                status: 400,
                message: "error",
                data: err

            })
        }
        else (
            res.send({
                status: 200,
                message: "Data found",
                data: result
            })
        )

    })
}

const checkoutOrders = (req, res) => {
    var order_detail = req.body.order_detail.length > 0 ? req.body.order_detail : []
    order_detail.length > 0 && order_detail.map((val, index) => {
        var qry = "INSERT INTO orders (product_id,order_no,total_price,order_status,address,created_at) VALUES(?,?,?,?,?,?)";
        var datetime = new Date();
        var order_no = Math.floor(Math.random() * 10) + 1;
        connection.query(qry, [val.product_id, 'P0' + order_no, val.total_price, 'placed', req.body.address, datetime], function (err, result) {
            if (err) {
                res.send({
                    status: 400,
                    message: "error",
                    data: err

                })
            }
            else if (result.affectedRows > 0) {
                var query = "delete from cart_products where id=?";
                connection.query(query, [val.cart_id], function (err, deleteResult) {
                    if (err) {
                        res.send({
                            status: 400,
                            message: "error",
                            data: err

                        })
                    } else if (deleteResult.affectedRows > 0) {
                        order_detail.length - 1 === index && res.send({
                            status: 200,
                            message: "order placed successfully",
                            data: []
                        })
                    } else {
                        res.send({
                            status: 400,
                            message: "order not placed",
                            data: []
                        })
                    }
                })

            } else {
                res.send({
                    status: 400,
                    message: "failed",
                    data: []
                })
            }

        })
    });

}













module.exports = { products, addtoCart, removeCart, cartProducts, checkoutOrders };


