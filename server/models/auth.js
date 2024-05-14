const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    email :{
        type: String,
        required: true,
        unique:true //aynı e maille bir daha kayıt olamasın
    },
    password :{
        type: String,
        required: true
    },
    date :{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('auth', AuthSchema) //tüm veritabanı etkileşimlerini kapsayacak şekilde 'mongoose.model()' fonksiyonu kullanılması