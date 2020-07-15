
const textoEmails = {
    alterarSenha : (token) =>{
        const page = `
        <!doctype html>
        <html lang="en">
          <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <style>
                body{
                    background-image: url('https://scontent.fcgh5-1.fna.fbcdn.net/v/t1.0-9/77339132_3754927197854593_122025621516713984_n.jpg?_nc_cat=104&_nc_sid=6e5ad9&_nc_eui2=AeE9KzRti7tpGCPqPxP0LNYM-BTUxk-BM4X4FNTGT4EzhZTolOuN8yQc0Umwbwe05aHo3f2zHUN223wxRvsTnS0w&_nc_ohc=Zsu571L2YpQAX-PxLlK&_nc_ht=scontent.fcgh5-1.fna&oh=9131396613b6e90f83bbd28a88ad8ed6&oe=5F25152E');
                    background-repeat: no-repeat;
                    background-size:100vw 100vh;
                    display: flex;
                    justify-content: center;
                    padding: 30px;
                }
              h1{
                  text-align: center;
              }
              .clear-body{
                  background-color: rgba(255, 255, 255, 0.63);
                  position: fixed;
                  width: 100vw;
                  height: 100vh;
              }
        
              .card{
                 background-color: teal;
              }
            </style>
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        
            <title>Nova Senha</title>
          </head>
          <body>
              <div id="clear-body">
                <div class="card border-success mb-3" style="max-width: 30rem; background-color: rgba(255, 255, 255, 0.815);">
                    <div class="card-header bg-transparent border-success"><h1 style="color: teal;">Sistema Pequeno Grupo</h1></div>
                    <div class="card-body text-success">
                      <h5 class="card-title">Parabéns agora você é um usuáios do sistema!</h5>
                      <p class="card-text">Clicando no botão você será direcionado para uma seção onde irá configurarar sua senha de acesso, lembrando que você é responsável pela sua validação portanto escolha uma senha segura com no <b> minimo 6 digitos</b> de sua escolha e não tranfira para niguém, isso nos dará mais garantias de um sistema seguro</p><p><h3>Muito obrigado!</h3></p>
                    </div>
                    <div class="card-footer bg-transparent border-success"><a href="http://localhost:3000/alterar-senha/${token}" class="btn btn-success" >Click Aqui</a></div>
                  </div>
              </div>
            
             
            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
          </body>
        </html>
        `
        return page
    }
}

module.exports = textoEmails;