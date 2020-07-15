var express = require('express');
var router = express.Router();
const loginApiController = require('../../controllers/apis/loginApiController')

router.post('/',loginApiController.auth)




module.exports = router;