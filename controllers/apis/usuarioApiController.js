const {Op} = require('sequelize');
const jwt = require('jsonwebtoken')
const {Pessoa,Usuario,sequelize} = require('../../models/');
const bcrypt = require('bcrypt');
const Email = require('../../config/email');
require('dotenv').config()
const twtSecret = process.env.JWT_PASS 
const textoEmails = require('../../helpers/textoEmail');
const { senha } = require('../pagesControllers');
const usuarioApiController = {
    index: async (req,res) =>{
   if(Object.keys(req.params).length === 0 && Object.keys(req.query).length===0){
     try {
       const usuarios = await Usuario.findAll({
        attributes:[
          'id','email','status','pessoa_id'
        ],
       order:[
        [{model: Pessoa, as: 'pessoas'}, 'nome', 'ASC'],
       ],  
       include:{
         association:'pessoas'
       }
      })
       return res.status(200).json(usuarios)
     } catch (error) {
      return res.status(400).json(error)
     }
   }else if(Object.keys(req.params).length>0){
    try {
      const usuarios = await Usuario.findAll({
        attributes:[
          'id','email','status','pessoa_id'
        ],
        where:{
          id:req.params.id
        },
      include:{
        association:'pessoas'
      }
     })
      return res.status(200).json(usuarios)
    } catch (error) {
     return res.status(400).json(error)
    }
   }else{
    const fieldName = Object.keys(req.query)[0]
    const queryValue = req.query[fieldName]

    try {
       const usuarios = await Usuario.findAll({
        attributes:[
          'id','email','status','pessoa_id'
        ],
        where:{
          [fieldName]: {
            [Op.like]: `%${queryValue}%`
        }
        },
      include:{
        association:'pessoas'
      }
     })
      return res.status(200).json(usuarios)
    } catch (error) {
     return res.status(400).json(error)
    }
   }

    },
    create: async (req,res) =>{
    let {nome,data_nascimento,sexo,telefone,image,cep,logradouro,numero,complemento,bairro,cidade,uf,email,senha,status} = req.body
    let pessoa = {nome,data_nascimento,sexo,telefone,image,cep,logradouro,numero,complemento,bairro,cidade,uf}
    const senhaHash = bcrypt.hashSync(senha,10)
          try {
            const result = await sequelize.transaction(async (t) =>{
                const pessoaCadastro =await Pessoa.findOrCreate({
                    where: {
                      nome: pessoa.nome,
                    },
                    defaults: pessoa,
                    transaction: t
                  });   
                let usuario = {
                    email,
                    senha:senhaHash,
                    status,
                    pessoa_id:pessoaCadastro[0].id}
                    const usuarioCadastro = await Usuario.findOrCreate({
                        where: {
                          email:usuario.email,
                        },
                        defaults: usuario,
                        transaction: t
                      });   
                    console.log(usuario)
                  const pessoaUsuario = {
                        pessoaCadastro,
                        usuarioCadastro
                      }
                      return pessoaUsuario;
         })
        
         try {
           const token = await jwt.sign({id:result.usuarioCadastro[0].id,email:result.usuarioCadastro[0].email,status:result.usuarioCadastro[0].status},twtSecret,{expiresIn:"10d"})
           let enviarEmail = {
            from:`${process.env.EMAIL_USER}`,
            to:`${result.usuarioCadastro[0].email}`,
            subject:'Sistema Pequeno Grupo',
            html:textoEmails.alterarSenha(token)
        }
       
         Email.sendMail(enviarEmail,(erro)=>{
             if(erro){
                 console.log('error: ' + erro );
             }
         });
           console.log(token)
           
         } catch (error) {
           console.log(error)
         }
         return res.status(201).json(result);
       } catch (error) {
             return res.status(400).json(error);
       }
    },
    update: async (req,res) =>{
      let id
      let dados
  
      if(Object.keys(req.params).length === 0) {
          //Permite alterações enviando todas informações pelo body
          id = req.body.id;
          dados = req.body;
          dados.senha = bcrypt.hashSync(dados.senha,10)
              
      } else if(Object.keys(req.query).length === 0) {
          //Permite alterações enviando id pelo endpoint e informações pelo body [/usuarios/:id]
          id = req.params.id;
          dados = req.body;
         dados.senha = bcrypt.hashSync(dados.senha,10)
      } else {
          //Permite alterações enviando id pelo endpoint e informações por query [/usuarios/:id?atributo=valorAtualizado]
          id = req.params.id;
          dados = req.query;
         dados.senha = bcrypt.hashSync(dados.senha,10)
      }

       const usu = await Usuario.findByPk(id);
    const  usuario = {
        id,
        email:dados.email,
        senha:dados.senha,
        status:dados.status
      }

    const pessoas = {
      id:usu.pessoa_id,
      nome:dados.nome,
      data_nascimento:dados.data_nascimento,
      sexo:dados.sexo,
      telefone:dados.telefone,
      image:dados.image,
      cep:dados.cep,
      logradouro:dados.logradouro,
      numero:dados.numero,
      complemento:dados.complemento,
      bairro:dados.bairro,
      cidade:dados.cidade,
      uf:dados.uf
          }
          const usuPes = {
            usuario,
            pessoas
          }

      try {
        await sequelize.transaction(async (t) => {
           
          await Pessoa.update(pessoas,{
                where: {
                    id
                },
                transaction: t
            });
            return;
        })
        await sequelize.transaction(async (t) => {
           
          await Usuario.update(usuario,{
                where: {
                    id
                },
                transaction: t
            });
            return;
        })

        
      //const result = await Usuario.findByPk(id);
    
           return res.status(200).json(usuPes);
        } catch (error) {
           return res.status(400).json(error);
        };
    },
   
   delete: async (req,res) =>{
    let id
    if(Object.keys(req.params).length === 0) {
        //Permite deletar enviando id pelo body
        id = req.body.id;
    } else {
        //Permite deletar enviando id pelo endpoint [/usuarios/:id]
        id = req.params.id;
    }
    try {
      await sequelize.transaction(async (t) => {
          await Usuario.destroy({
              where: {
                  id
              },
              transaction: t
          });
          return;
      })
      const result = await Usuario.findByPk(id, {paranoid:false});
      return res.status(200).json(result);
  } catch (error) {
      return res.status(400).json(error);
  };
    },

  
}


module.exports = usuarioApiController;