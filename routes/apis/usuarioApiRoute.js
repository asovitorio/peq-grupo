var express = require('express');
var router = express.Router();
const usuarioApiController = require('../../controllers/apis/usuarioApiController')
const authApi = require('../../middlewares/authApi')

router.get('/',usuarioApiController.index)
router.get('/:id',usuarioApiController.index)
router.post('/',usuarioApiController.create)
router.put('/',usuarioApiController.update)
router.put('/:id',usuarioApiController.update)
router.delete('/',usuarioApiController.delete)
router.delete('/:id',usuarioApiController.delete)



module.exports = router;