var express= require('express');
const multer= require ('multer') 
const path = require('path');
var router = express.Router();
const systemControllers = require("../controllers/systemControllers");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','profiles'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split('.').pop()  )
  }
})
 
var upload = multer({ storage: storage })

   
 
 
router.get('/',systemControllers.index)
router.get('/logout',systemControllers.logout)
router.get('/membro',systemControllers.cadastroMenbroView)
router.post('/cadastro-usuario',upload.any(),systemControllers.cadastroUsuario)
router.put('/cadastro-usuario/:id',upload.any(),systemControllers.atualizar)



module.exports = router;