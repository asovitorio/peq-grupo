const {Op} = require('sequelize');
const {Grupo,sequelize} = require('../../models/');
require('dotenv').config()
const grupoApiController ={
    index: async (req,res) =>{
        if(Object.keys(req.params).length === 0 && Object.keys(req.query).length === 0) {
            try {
                const grupos = await Grupo.findAll({
                    include: {
                        association: 'usuario',
                        attributes: ['email'],
                      include:{
                          association:"pessoas",
                          attributes: ['id','nome','telefone','cep','logradouro','numero','complemento','bairro','cidade','uf']
                      }
                    },}
                );
    
                return res.status(200).json(grupos);
            } catch (error) {
                return res.status(400).json(error);
            }
        } else if(Object.keys(req.params).length > 0) {
            try {
                const grupos = await Grupo.findAll({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        association: 'usuario',
                        attributes: ['email'],
                      include:{
                          association:"pessoas",
                          attributes: ['id','nome','telefone','cep','logradouro','numero','complemento','bairro','cidade','uf']
                      }
                    }
                });
                
                return res.status(200).json(grupos);
            } catch (error) {
                return res.status(400).json(error);
            }
        } else {
            const fieldName = Object.keys(req.query)[0]
            const queryValue = req.query[fieldName]
            try {
                const grupos = await Grupo.findAll({
                    where: {
                        [fieldName]: {
                            [Op.like]: `%${queryValue}%`
                        }
                    }
                });
                return res.status(200).json(grupos);
            } catch (error) {
                return res.status(400).json(error);                
            }
        }
      

    },
    create: async (req,res) =>{
        const {nome,dia_semana,usuario_id} = req.body
        const grupo = {
            nome,
            dia_semana,
            usuario_id
        }
        try {
            const result = await sequelize.transaction(async (t) =>{
                const grupoCreate =await Grupo.findOrCreate({
                    where: {
                      nome: grupo.nome,
                    },
                    defaults: grupo,
                    transaction: t
                  });
                  return grupoCreate
                })   
                return res.status(201).json(result);

        } catch (error) {

            return res.status(400).json(result);
            
        }
    },
    update: async (req,res) =>{
        let id
        let dados
        if(Object.keys(req.params).length === 0) {
            //Permite alterações enviando todas informações pelo body
            id = req.body.id;
            dados = req.body;
           
        } else if(Object.keys(req.query).length === 0) {
            //Permite alterações enviando id pelo endpoint e informações pelo body [/usuarios/:id]
            id = req.params.id;
            dados = req.body;
           
        } else {
            //Permite alterações enviando id pelo endpoint e informações por query [/usuarios/:id?atributo=valorAtualizado]
            id = req.params.id;
            dados = req.query;
        }
         const grupo = {
            nome:dados.nome,
            dia_semana:dados.dia_semana,
           }
       try {
        await sequelize.transaction(async (t) => {
            await Grupo.update(grupo,{
                  where: {
                      id
                  },
                  transaction: t
              });
              return;
          })
          const gru = await Grupo.findByPk(id);
          return res.status(200).json(gru);
       } catch (error) {
        return res.status(400).json(error);
       }
    },
    delete: async (req,res) =>{
        let id
        if(Object.keys(req.params).length === 0) {
            //Permite alterações enviando todas informações pelo body
            id = req.body.id;
        } else if(Object.keys(req.query).length === 0) {
            //Permite alterações enviando id pelo endpoint e informações pelo body [/usuarios/:id]
            id = req.params.id;
        } else {
            //Permite alterações enviando id pelo endpoint e informações por query [/usuarios/:id?atributo=valorAtualizado]
            id = req.params.id;
        }

        try {
           await sequelize.transaction(async (t) => {
          await Grupo.destroy({
              where: {
                  id
              },
              transaction: t
          });
          return;
      })
      const result = await Grupo.findByPk(id, {paranoid:false});
      return res.status(200).json(result);
            
        } catch (error) {
            return res.status(400).json(error);
        }
        
         
       

    },
 

 }

 module.exports = grupoApiController