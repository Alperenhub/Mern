
const AuthSchema = require('../models/auth.js')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt.js');

const register = async(req,res) =>{

    try{
        const {username , password, email} = req.body;

        const user = await AuthSchema.findOne(email) //email adresine göre user bul. 
        if(user){ //eğer email kayıtlıysa alttaki mesajı bastır
            return res.status(409).json({msg:"Bu email zaten kayıtlı"}) 
        }
        if(password.length<6){
            return res.status(400).json({msg:"Şifreniz 6 karakterden küçük olamaz"}) 
        }

        const passwordHash = await bcrypt.hash(password, 12);

        
        
    }catch(err){

    }

}


const login = async(req,res) =>{

    try{

    }catch(err){
        
    }

}

module.exports = {register,login}