function executar (e) {
  e.preventDefault()

  limparForm()
  validarForm()
  
}

function limparForm () {
  document.querySelectorAll('.erro').forEach(erro => {
    erro.classList.remove('erro')
    erro.classList.add('oculto')
  })

  document.querySelector('#concluido').classList.add('oculto')
}

function validarForm(){
  const nome = document.querySelector('#nome').valueF
  const erroNome = document.querySelector('#erro-nome')

  const idade = document.querySelector('#idade').value
  const erroIdade = document.querySelector('#erro-idade')

  if (nome === '') {
    erroNome.textContent = 'Nome não pode estar vazio'
    erroNome.classList.add('erro')
    erroNome.classList.remove('oculto')
  }

  if (idade === '') {
    erroIdade.textContent = 'Idade não pode estar vazio'
    erroIdade.classList.add('erro')
    erroIdade.classList.remove('oculto')
  } else if (Number(idade) < 18) {
    erroIdade.textContent = 'Menor de idade'
    erroIdade.classList.add('erro')
    erroIdade.classList.remove('oculto')
  }

  const termos = document.querySelector('#termos')
  const erroTermos = document.querySelector('#erro-termos')

  if (!termos.checked) {
    erroTermos.textContent = 'É necessário aceitar os termos'
    erroTermos.classList.add('erro')
    erroTermos.classList.remove('oculto')
  }

  const concluido = document.querySelector('#concluido')

  const valido = document.querySelectorAll('.erro').length === 0

  if (!valido) {
    concluido.textContent = 'Corrija os erros'
    concluido.classList.add('erro')
    concluido.classList.remove('oculto')
  } else {
    concluido.textContent = 'Cadastro concluido'
    concluido.classList.add('sucesso')
    concluido.classList.remove('oculto')
  }
}
