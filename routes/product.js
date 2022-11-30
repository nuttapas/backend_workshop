var express = require('express');
var router = express.Router();
const productModel = require('../models/products')
const mongoose = require('mongoose')

router.post("/",async (req, res)=>{
    try {

        let body = req.body

let new_product = new productModel({
    product_name: body.product_name,
    price: body.price,
    amount: body.amount,
    momory: body.memory,
    color: body.color

})

    let product = await new_product.save()

    res.status(201).send({
        message: "creat success",
        data: product,
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
        let product = await productModel.find()

        res.send({
            message: "get success",
            data: product,
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
        let product = await productModel.findById(id)

        res.send({
            message: "get by id success",
            data: product,
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

        await productModel.updateOne(
            { _id: mongoose.Types.ObjectId(id)},
            {
                $set: {
                    product_name: body.product_name,
                    price: body.price,
                    amount: body.amount,
                    momory: body.memory,
                    color: body.color
                }
            }
        )

        let product = await productModel.findById(id)

        res.send({
            message: "update success",
            data: product,
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

        await productModel.deleteOne({ _id: mongoose.Types.ObjectId(id)})
        
        let product = await productModel.find()

        res.send({
            message: "delete success",
            data: product,
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