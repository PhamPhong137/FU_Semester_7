const mongoose = require("mongoose");
const Department = require("./models/department.model");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/SE1762_Mongoose");

connect.then((db) => {
    const newDepart = new Department({ name: "IT", location: { floor: 2, room: "A2-01" } });
    newDepart.save().then((depart) => {
        console.log("Saved department:", depart);
    }).catch(console.error);
}).catch(console.error);