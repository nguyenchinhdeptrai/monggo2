const mongoose = require('mongoose');


const SanPhamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:Number,
        required:true,
    }

});

const SanPhamModel = new mongoose.model('datas',SanPhamSchema);
module.exports = SanPhamModel;