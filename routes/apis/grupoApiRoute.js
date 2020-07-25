var express = require('express');
var router = express.Router();
const grupoApiController = require('../../controllers/apis/grupoApiController')

router.get('/',grupoApiController.index)
router.get('/:id',grupoApiController.index)
router.post('/',grupoApiController.create)
router.put('/',grupoApiController.update)
router.delete('/',grupoApiController.delete)

module.exports = router