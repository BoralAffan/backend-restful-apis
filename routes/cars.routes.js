const express = require('express');

const { getAllCars, deleteById, addCar, updateById }  = require("../controllers/cars.controller.js");

const router = express.Router();
router.get("/all", getAllCars);
router.delete("/remove", deleteById);
router.post("/add", addCar);
router.put("/update", updateById);

module.exports= router;