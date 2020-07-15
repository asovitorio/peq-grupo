var express = require('express');
var router = express.Router();
const pagesControllers=require('../controllers/pagesControllers')
const authControllers=require('../controllers/authControllers')

/* GET home page. */

router.get('/',pagesControllers.home );
router.get('/home',pagesControllers.home );
router.get('/sobre',pagesControllers.sobre );
router.get('/contato',pagesControllers.contato );
router.post('/contato',pagesControllers.email );
router.get('/login',pagesControllers.sistema );
router.post('/login',authControllers.auth );
router.get('/alterar-senha/:token',pagesControllers.senha );
router.post('/alterar-senha/',pagesControllers.senhaAlterada);

module.exports = router;
