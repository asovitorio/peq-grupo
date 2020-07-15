var express = require('express');
var router = express.Router();
const pessoaApiController = require('../../controllers/apis/pessoaApiController')

router.get('/',pessoaApiController.index)




module.exports = router;