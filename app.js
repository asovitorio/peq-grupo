var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const methodOverride  = require("method-override");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sistemaRouter = require('./routes/sistema');
var session = require('express-session')
var flash = require('connect-flash')

// ######### Rotas da APIS ############
const usuarioApiRouter = require('./routes/apis/usuarioApiRoute')
const pessoaApiRouter = require('./routes/apis/pessoaApiRoute')
const loginApiRouter = require('./routes/apis/loginApiRoute')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret:"projetoExpressPequenoGrupo",
  resave:true,
  saveUninitialized:true
}))

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ######### Rotas do Sistema ############
app.use('/', indexRouter);
app.use('/system',sistemaRouter);
app.use('/users', usersRouter);

// ######### Rotas da APIS ############
app.use('/api/v1/usuario',usuarioApiRouter)
app.use('/api/v1/pessoa',pessoaApiRouter)
app.use('/api/v1/login',loginApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
