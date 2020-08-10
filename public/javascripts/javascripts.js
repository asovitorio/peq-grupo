
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('form-peq-grupo');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var formsUser = document.getElementsByClassName('form-usuario');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(formsUser, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// ################ NAVEGAÇÂO DO MENU EM RELAÇÂO OS BOTÔES DE ADD #################
const btnMenu = document.querySelectorAll('.nav-link')
const btnPeqGrupo = document.getElementById('menu-peq-grupo');
const btnAddPeqGrupo = document.getElementById('btn-add-peq-grupo');
const btnAddusuario = document.getElementById('btn-add-usuario');
const btnAddlicao = document.getElementById('btn-add-licao');
btnMenu.forEach((item, i) => {
    btnAddusuario.style.display = 'flex';
    item.addEventListener('click', (e) => {
        if (i === 1) {
            btnAddPeqGrupo.style.display = 'flex';
            btnAddusuario.style.display = 'none';
            btnAddlicao.style.display = 'none';
        } else if (i === 0) {
            btnAddusuario.style.display = 'flex';
            btnAddPeqGrupo.style.display = 'none';
            btnAddlicao.style.display = 'none';
        } else if (i === 3) {
            btnAddlicao.style.display = 'flex';
            btnAddusuario.style.display = 'none';
            btnAddPeqGrupo.style.display = 'none';
        } else {
            btnAddPeqGrupo.style.display = 'none';
            btnAddusuario.style.display = 'none';
            btnAddlicao.style.display = 'none';
        }
    })
})
// ##################################################################################################

// #################### CONSUMO DA API VIA CEP ###############################

const editar = document.getElementsByClassName('editar-usuario')
const formUsu = document.getElementById('form-usuario')
const nomeUsu = document.getElementById('nomeUsu')
const nascimento = document.getElementById('nascimento')
const sexo = document.getElementById('sexo')
const telefone = document.getElementById('telefone')
const email = document.getElementById('email')
const status = document.getElementById('status')
const cep = document.getElementById('cep');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const numero = document.getElementById('numero');
async function buscarCep(cep) {
    const apiCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const resposta = await apiCep.json();
    return resposta
}
cep.addEventListener('change', async (e) => {
    const teste = await buscarCep(cep.value)
    cep.value = teste.cep
    logradouro.value = teste.logradouro
    bairro.value = teste.bairro
    cidade.value = teste.localidade
    uf.value = teste.uf
    numero.focus()
})
const grupoExcluir = document.getElementsByClassName("btn-delete-grupo");
const idGrupo = document.getElementById('idGrupo');
const nomeGrupo = document.getElementById('nomeGrupo');
const form = document.getElementById('form-excluir');
for (let index = 0; index <grupoExcluir.length; index++) {
    grupoExcluir[index].addEventListener('click',(e)=>{
        //  grupoExcluir[index].getAttribute('grupo')
        form.action = `/system/pequeno-grupo/${grupoExcluir[index].getAttribute('grupoId')}?_method=DELETE`
        nomeGrupo.innerText = `Pequeno Grupo: ${grupoExcluir[index].getAttribute('grupo')}`
        idGrupo.innerText = `id: ${grupoExcluir[index].getAttribute('grupoId')}`
    })
}
// ############################################################################################################
