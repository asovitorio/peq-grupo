var express = require('express');
var router = express.Router();
const usuarioApiController = require('../../controllers/apis/usuarioApiController')
const authApi = require('../../middlewares/authApi')

router.get('/',authApi.auth,usuarioApiController.index)
router.get('/:id',authApi.auth,usuarioApiController.index)
router.post('/',authApi.auth,usuarioApiController.create)
router.put('/',authApi.auth,usuarioApiController.update)
router.put('/:id',authApi.auth,usuarioApiController.update)
router.delete('/',authApi.auth,usuarioApiController.delete)
router.delete('/:id',authApi.auth,usuarioApiController.delete)



module.exports = router;