const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_PASS;
const fetch = require('node-fetch');
require('dotenv').config()
const API_BASE = process.env.API_BASE

const systemControllers = {
  create: async (req, res) => {
    //REcebe o token que foi gerado pelo login da API
    const token = req.session.token
    
  function soNumero(str) {
      str = str.toString();
      return str.replace(/\D/g,'');
  }
  const [avatar] = req.files
  const foto = (arq) => {
    if (arq == undefined) {
      return "adm.jpg"
    } else {
      return arq.filename
    }
  }
   let image = foto(avatar)
    const {nome,dia_semana,usuario_id} = req.body
    const grupo = {
      nome,
      dia_semana,
      image,
      usuario_id:soNumero(usuario_id)
    }
  
    try {
      const cadastroGrupo = await fetch(`${API_BASE}/grupo`, {
        method: "POST",
        body: JSON.stringify(grupo),
        headers: {
         'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      const resposta = await cadastroGrupo.json()
      msg = `Grupo Cadastrado com sucesso!`
      req.flash('grupoCreate',msg)
      return  res.redirect('/system')
      
    } catch (error) {
      return res.status(400).json(error)
    }
   
  },

}
module.exports = systemControllers;