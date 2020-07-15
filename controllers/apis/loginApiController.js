const jwt = require('jsonwebtoken')
const {Pessoa,Usuario,sequelize} = require('../../models/');
const bcrypt = require('bcrypt');
const Email = require('../../config/email');
require('dotenv').config()
const jwtSecret = process.env.JWT_PASS 
const loginApiController = {
    auth: async (req,res) =>{
         const {email,senha} = req.body;
         try {
            const usuario = await Usuario.findOne({
                where: {email},
                    include:{
                      association:'pessoas'
                    }});
           if(email === undefined || email!=usuario.email){
               return res.status(401).json({err:"usuário ou senha inválidos "})
           }  
           if(!bcrypt.compareSync(senha,usuario.senha)){
            return res.status(401).json({err:"usuário ou senha inválidos senha"})
           }else{  try {           
                    const usuToken = {
                        id:usuario.id,
                        email:usuario.email,
                        status:usuario.status,
                        nome:usuario.pessoas.nome,
                        avatar:usuario.pessoas.image
                    } 
                    const token = await jwt.sign(usuToken,jwtSecret,{expiresIn:'48h'})   
                    return  res.status(200).json({token:token});
           } catch (error) {
            return res.status(401).json({err:"não foi possivel gerar token -> " + error})
           }}
         
         } catch (error) {
            res.status(400).json({err:"usuário ou senha invalido ->" + error});
         }
    }
}
module.exports = loginApiController