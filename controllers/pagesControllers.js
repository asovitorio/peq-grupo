const Email = require('../config/email');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fetch = require('node-fetch');
const API_BASE = process.env.API_BASE
const jwtSecret = process.env.JWT_PASS;
const pagesControllers = {
    index: (_req, res) => {
        const nav = {
            index: "active",
            home: "",
            sobre: "",
            contato: "",
            sistema: "",
            classBody: "gradient",
            titulo: "Igreja Batista"
        }
        res.render('index', {
            nav: nav
        })
    },
    home: (_req, res) => {
        const nav = {
            index: "",
            home: "active",
            sobre: "",
            contato: "",
            sistema: "",
            classBody: "gradient",
            titulo: "Igreja Batista"
        }
        res.render('home', {
            nav: nav
        })
    },
    sobre: (_req, res) => {
        const nav = {
            index: "active",
            home: "",
            sobre: "active",
            contato: "",
            sistema: "",
            classBody: "gradient",
            titulo: "Igreja Batista"
        }
        res.render('sobre', {
            nav: nav
        })
    },
    contato: (_req, res) => {
        const nav = {
            index: "active",
            home: "",
            sobre: "",
            contato: "active",
            sistema: "",
            classBody: "gradient",
            titulo: "Igreja Batista"
        }
        res.render('contato', {
            nav: nav,
            message: undefined
        })
    },
    sistema: (req, res) => {
        const nav = {
            index: "active",
            home: "",
            sobre: "",
            contato: "",
            sistema: "active",
            classBody: "home-body",
            titulo: "Igreja Batista",
            teste: req.flash('title_msg'),
            permisao: req.flash('nivel'),
            nivel: req.flash('user'),
          }
        console.log(req.flash('user') + " teste")
        console.log(nav.nivel)
        res.render('sistema', {
            nav: nav
        })
    },
    senha: async (req, res) => {
        const nav = {
            index: "active",
            home: "",
            sobre: "",
            contato: "",
            sistema: "active",
            classBody: "home-body",
            titulo: "Igreja Batista"
        }
        const {
            token
        } = req.params
        const usuarioToken = await jwt.verify(token, jwtSecret)
        console.log(usuarioToken)
        const usuario = {
            id: usuarioToken.id,
            nome: usuarioToken.email,
            status: usuarioToken.status
        }
        res.render('alterarSenha', {
            nav: nav,
            usuario,
            token
        })
    },
    senhaAlterada: async (req, res) => {
        const nav = {
            index: "active",
            home: "",
            sobre: "",
            contato: "",
            sistema: "active",
            classBody: "home-body",
            titulo: "Igreja Batista"
        }
        const {
            id,
            email,
            status,
            senha,
            token
        } = req.body
               try {
            const alterarSenha = await fetch(`${API_BASE}/usuario`, {
                method: "put",
                body: JSON.stringify({
                    id,
                    email,
                    status,
                    senha
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const resposta = await alterarSenha.json()
            console.log(resposta)
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    email: (req, res) => {
        const {
            nome,
            email,
            telefone,
            msg
        } = req.body;
        const nav = {
            index: "active",
            home: "",
            sobre: "",
            contato: "active",
            sistema: "",
            classBody: "gradient",
            titulo: "Igreja Batista",

        }
        let enviarEmail = {
            from: 'asovitorio@gmail.com',
            to: 'alebvitorio@gmail.com',
            subject: 'Sistema Pequeno Grupo',
            html: `<ul>
                     <h1>Menssagem: Pequeno Grupo</h1>
                     <li>De: ${nome}</li>
                     <li>Email: ${email}</li>
                     <li>Telefone: ${telefone}</li>
                     <li>Menssagem: ${msg}</li>
                  </ul>`
        }
        Email.sendMail(enviarEmail, (erro) => {
            if (erro) {
                console.log('DEU RUIM: ' + erro);
            }
        });
        return res.render('contato', {
            nav: nav,
            message: "Obrigado, em breve entraremos em contato"
        });
    }
}

module.exports = pagesControllers;