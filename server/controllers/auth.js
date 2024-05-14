
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

        if(isEmail(email)){
            res.status(400).json({msg: "Geçersiz email"})
        }

        const newUser = await AuthSchema.create({username, email, password: passwordHash})

        const token = jwt.sign({id: newUser._id}, "SECRET_KEY",{expiresIn:"1h"})
        
        res.status(201).json({
            status:"OK",
            newUser,
            token
        })

    }catch(err){
        return res.status(500).json({msg: error.message})
    }

}


const login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const user = await AuthSchema.findOne(email)

        if(!user){
            return res.status(404).json({msg:"Böyle bir kullanıcı bulunamadı"}) 
        }
        const passwordCompare = await bcrypt.compare(password, user.password)

        if(!passwordCompare){
            return res.status(401).json({msg:"Girdiğiniz şifre yanlış"}) 

        }

        const token = jwt.sign({id: user._id}, "SECRET_KEY",{expiresIn:"1h"})
        
        res.status(201).json({
            status:"OK",
            user,
            token
        })


    }catch(err){
        return res.status(401).json({msg: err.message})
    }

}


     function isEmail(emailAdress){  //email regex örneği.Email'in regex deseniyle örtüşüp örtüşmediğini kontrol eden bir değişken. örnek:"asdfa@gmail.com deseni" 
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
         if (emailAdress.match(regex)) 
            return true; 
               else 
            return false; 
            }




module.exports = {register,login}