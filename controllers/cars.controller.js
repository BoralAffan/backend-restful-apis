const fs = require('fs');

exports.getAllCars= async(req,res)=>{
     
fs.readFile("cars.json", (err,data)=>{

    if(err) throw err;
    
        let carData = JSON.parse(data);
        return res.json({
            message:" cars data fetched successfully",
            carData
        });
   
});
};

exports.addCar=async(req,res)=>{
    const {brand,model,price}= req.body;

    let car={
        "id": Math.round(Math.random()*10),
        "brand": brand,
        "model":model,
        "price":price
    }

    fs.readFile("cars.json", (err,data)=>{
            if(err) throw err;

            let carData = JSON.parse(data);
            var existingData = [...carData];

             existingData.push(car);
        let newCarsData = JSON.stringify(existingData);
            fs.writeFileSync("cars.json", newCarsData)

            return res.json({

                "message": 
                "car added successfully",
                existingData
            })
        }
    )
}

exports.updateById= async (req,res)=>{
    const {id: carId}= req.query;
    const {brand: brand, model:model,price:price} = req.body;
console.log("id"+carId)
    fs.readFile("cars.json",(err,data)=>{
        if(err) throw err;

        let cars= JSON.parse(data);
        let existingData = [...cars];
     var carIndex = existingData.findIndex((car)=> car.id === +carId);
console.log('index'+carIndex);
console.log(brand);
console.log(price);
console.log(model);
     if(carIndex !==1){
        existingData[carIndex].brand= brand;
        existingData[carIndex].model= model;
        existingData[carIndex].price= price;

     }

     let d = JSON.stringify(existingData);
     fs.writeFileSync("cars.json",d)

     return res.status(200).json({
        "message": "car updated successfully",
        cars: existingData
     })

    })

};

exports.deleteById= async (req,res)=>{
    const {id: id} = req.query;

    fs.readFile("cars.json",(err,data)=>{
        if(err) throw err;

        let carsData=JSON.parse(data);
        let existingData = [...carsData];

        let filteredData = existingData.filter(
            (car)=> car.id !== +id
        );
        let newCarsData= JSON.stringify(filteredData)
        fs.writeFileSync("cars.json", newCarsData);
        return res.json({
            "message": "car deleted successfully",
            filteredData
        })
    })
}


