var express= require('express');
const multer= require ('multer') 
const path = require('path');
var router = express.Router();
const usuarioControllers = require("../controllers/usuarioControllers");
const grupoControllers = require("../controllers/grupoControllers");
//#########Foto de Perfil do Usuário###############
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','profiles'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split('.').pop()  )
  }
})
//#########Foto de Perfil do Grupo###############
var storageGrupo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','grupo'))
  },
  filename: function (req, file, cb) {
    let foto = ""
    const nome = req.body.nome.split(' ')
        nome.forEach(element => {
          foto += `${element}_`
        });
        
        
    console.log(foto)
   // cb(null, Date.now() + "." + file.originalname.split('.').pop()  )
    cb( null,foto + "." + file.originalname.split('.').pop()  )
  }
})


 
var upload = multer({ storage: storage })
var uploadGrupo = multer({ storage: storageGrupo })

   
 
 
router.get('/',usuarioControllers.index)
router.get('/logout',usuarioControllers.logout)
//########## Usuário ###########
router.get('/visualizar-usuario/:id',usuarioControllers.usuarioView)
router.post('/cadastro-usuario',upload.any(),usuarioControllers.cadastroUsuario)
router.put('/cadastro-usuario/:id',upload.any(),usuarioControllers.atualizar)
router.delete('/cadastro-usuario/:id',upload.any(),usuarioControllers.delete)
//########## Pequeno Grupos ###########
router.post('/cadastro-grupo',uploadGrupo.any(),grupoControllers.create)


module.exports = router;