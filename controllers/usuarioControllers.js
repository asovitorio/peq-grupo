const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_PASS;
const fetch = require('node-fetch');
require('dotenv').config()
const API_BASE = process.env.API_BASE
const bcrypt = require('bcrypt');
const senhaAdm = process.env.USER_PASS;
const moment = require('moment')
const BrM = require('br-masks');

const systemControllers = {
  index: async (req, res) => {
    //REcebe o token que foi gerado pelo login da API
    const token = req.session.token
    //Verifica o usuário dono do token
    const usuario = jwt.verify(token, jwtSecret)
    //Consome a API e concatena o token com Bearer para encaminhar a autorização da API
    const listaUsuarios = await fetch(`${API_BASE}/usuario`, {
      method: "GET",
      //  body: JSON.stringify(req.body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const listaGrupos = await fetch(`${API_BASE}/grupo`, {
      method: "GET",
      //  body: JSON.stringify(req.body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    //resposta da API Usuário
    const resposta = await listaUsuarios.json()
    //resposta da API Grupos
    const grupos = await listaGrupos.json()
    const nomeList = [];

    // teste de dados
    // console.log(grupos)
    // console.log(Object.keys(resposta)[0])

    if (Object.keys(resposta)[0] == 'err') {
      const msg = 'Usuario desativado'
      req.flash('nivel', msg)
      res.redirect('/login')
    }else if(usuario.status==2){
      const msg = 'Status USER -> Em breve estará pronto o seu acesso';
      req.flash('user', msg)
      res.redirect('/login')
    }
    else{
      resposta.forEach(nome => {
        nomeList.push(nome.pessoas.nome)
      });
    }
    const msgCadastro = req.flash('cadastro')
    const msgExcluido = req.flash('deletado')
    const msgExcluidoGrupo =  req.flash('deletadoGupo')
    const msgGrupoCreate =  req.flash('grupoCreate')
 
   msgCadastro> 0?"usuário cadastrado com sucesso":"";
   console.log( msgGrupoCreate>0?"Grupo cadastrado com sucesso":"")

  // res.send(grupos[0].usuario.pessoas.nome)
    res.render('./system/menu', {
      usuario,
      resposta,
      nomeList,
      msgCad:msgCadastro.length>0?true:false,
      msgExc:msgExcluido.length>0?true:false,
      msgExcGrupo:msgExcluidoGrupo.length>0?true:false,
      msgGrupAdd:msgGrupoCreate.length>0?true:false,
      token,
      grupos,
      BrM,
      api:API_BASE
     });
  },
 usuarioView: async (req, res) => {
   //REcebe o token que foi gerado pelo login da API
   const token = req.session.token
   //Verifica o usuário dono do token
   const usuario = jwt.verify(token, jwtSecret)
   const msgAtualizado = req.flash('atualizado')
   try {
    const usuarioView = await fetch(`${API_BASE}/usuario/${req.params.id}`, {
      method: "GET",
      //  body: JSON.stringify(req.body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    //resposta da API
    const resposta = await usuarioView.json()
    console.log(moment(resposta[0].pessoas.data_nascimento).format("DD/MM/YYYY"))
      res.render('./system/usuarioView',{
        usuario,
        resposta,
        moment,
        msgAtu:msgAtualizado.length>0?true:false,
        BrM
      });
   } catch (error) {
    res.status(400).json(error)
   }
  },
  logout: (req, res) => {
    req.session.token = "";
    res.redirect('/login')
  },
  cadastroUsuario: async (req, res) => {
    const [avatar] = req.files
    const foto = (arq) => {
      if (arq == undefined) {
        return "avatar.png"
      } else {
        return arq.filename
      }
    }
     let image = foto(avatar)
     const usuario = req.body
     usuario.image = image
     usuario.senha = bcrypt.hashSync(senhaAdm,10)
     const token = req.session.token
     try {
      const cadastroUsuario = await fetch(`${API_BASE}/usuario`, {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
         'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      const resposta = await cadastroUsuario.json()
      msg = `Usuário ${resposta.email} cadastrado com sucesso!`
      req.flash('cadastro',msg)
         res.redirect('/system')
     } catch (error) {
      res.status(400).json(error)
     }
     },
     atualizar: async (req,res) =>{
      const [avatar] = req.files
      const foto = (arq) => {
        if (arq == undefined) {
          return req.body.image
        } else {
          return arq.filename
        }
      }
       let image = foto(avatar)
       const usuario = req.body
       usuario.image = image
       usuario.id = req.params.id
       const token = req.session.token

       try {
        const cadastroUsuario = await fetch(`${API_BASE}/usuario/atualizar/${req.params.id}`, {
          method: "PUT",
          body: JSON.stringify(usuario),
          headers: {
           'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        const resposta = await cadastroUsuario.json()
        msg = `Usuário ${resposta.email} Atualizado com sucesso!`
        req.flash('atualizado',msg)
         res.redirect('/system/visualizar-usuario/' + req.params.id)
       } catch (error) {
        res.status(400).json(error)
       }
       },
       delete: async (req,res) =>{
        const token = req.session.token

        try {
         const usuario = await fetch(`${API_BASE}/usuario`, {
           method: "delete",
           body: JSON.stringify(req.params),
           headers: {
            'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
           }
         })
         const resposta = await usuario.json()
         msg = `Usuário ${resposta.email} excluido com sucesso!`
         req.flash('deletado',msg)
          res.redirect('/system')
        } catch (error) {
         res.status(400).json(error)
        }
       }
}
module.exports = systemControllers;