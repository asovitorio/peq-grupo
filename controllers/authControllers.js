const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()
const fetch = require('node-fetch');
const loginApiController = require('./apis/loginApiController');
const jwtSecret = process.env.JWT_PASS 
const API_BASE = process.env.API_BASE 

const authControllers = {
    auth: async (req,res) =>{
     try {
        const login = await fetch(`${API_BASE}/login`,{
            method: "post",
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        const token = await login.json()
         //  res.redirect('/system')
       console.log(Object.keys(token)[0])
        if(Object.keys(token)[0]==='token'){
            req.session.token = token.token
            res.redirect('/system')
        }else{
            const msg = "Usuário ou senha invalidos"
            req.flash('title_msg',msg) 
           // console.log( req.flash('title_msg'))
            res.redirect('/login')
        }
     } catch (error) {
        console,log('erro')
     }
    }
} 

module.exports = authControllers