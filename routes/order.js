var express = require('express');
var router = express.Router();
const orderModel = require('../models/orders')
const mongoose = require('mongoose')

router.post("/",async (req, res)=>{
  try {

      let body = req.body

let new_order = new orderModel({
  orders_id: body.order_id,
  orders_user: body.user,
  orders_product: body.product,
  orders_amout: body.amount,

})

  let order = await new_order.save()

  res.status(201).send({
      message: "creat success",
      data: order,
      success: true
  })


  } catch(err) {
      res.status(500).send({
          message: err.message,
          success: false
      })
  }
})

router.get("/",async (req, res)=>{
    try{
        let order = await orderModel.find()

        res.send({
            message: "get success",
            data: order,
            success: true
        })



    }catch(err) {
        res.status(500).send({
            message: err.message,
            success: false
        })
    }
})

router.get("/:id",async (req, res)=>{
    try{
        let id = req.params.id
        let order = await orderModel.findById(id)

        res.send({
            message: "get by id success",
            data: order,
            success: true
        })



    }catch(err) {
        res.status(500).send({
            message: err.message,
            success: false
        })
    }
})

router.put("/:id",async(req, res)=>{
    

    try {
        let id = req.params.id
        let body =req.body

        await orderModel.updateOne(
            { _id: mongoose.Types.ObjectId(id)},
            {
                $set: {
                  orders_id: body.order_id,
                  orders_user: body.user,
                  orders_product: body.product,
                  orders_amout: body.amount,
                }
            }
        )

        let order = await orderModel.findById(id)

        res.send({
            message: "update success",
            data: order,
            success: true
        })

    }catch(err) {
        res.status(500).send({
            message: err.message,
            success: false
        })
    }
})

router.delete("/:id",async (req, res)=>{
    try{
        let id = req.params.id

        await orderModel.deleteOne({ _id: mongoose.Types.ObjectId(id)})
        
        let order = await orderModel.find()

        res.send({
            message: "delete success",
            data: order,
            success: true
        })
    
    }catch(err) {
        res.status(500).send({
            message: err.message,
            success: false
        })
    }
})

module.exports = router;