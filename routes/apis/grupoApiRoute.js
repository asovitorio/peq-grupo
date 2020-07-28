var express = require('express');
var router = express.Router();
const authApi = require('../../middlewares/authApi')
const grupoApiController = require('../../controllers/apis/grupoApiController')

router.get('/', grupoApiController.index)
router.get('/:id',authApi.auth,grupoApiController.index)
router.post('/',authApi.auth,grupoApiController.create)
router.put('/',authApi.auth,grupoApiController.update)
router.delete('/',authApi.auth,grupoApiController.delete)

module.exports = router