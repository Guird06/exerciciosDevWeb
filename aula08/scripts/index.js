const formulario = document.querySelector('#cadastro')
const celular = document.querySelector('#celular')

celular.addEventListener('input', () => {
  const numeros = celular.value.replace(/\D/g, '').slice(0, 11)
  let formatado = numeros

  if (numeros.length > 2) {
    formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
  }
  if (numeros.length > 7) {
    formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
  }

  celular.value = formatado
})

async function executar (e) {
  e.preventDefault()
  limparForm()

  if (!validarForm()) {
    mostrarResultado('Corrija os erros')
    return
  }

  const botao = formulario.querySelector('button[type="submit"]')
  botao.disabled = true

  try {
    const dados = Object.fromEntries(new FormData(formulario).entries())
    const resposta = await fetch('https://postman-echo.com/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })

    if (!resposta.ok) {
      throw new Error(`A API respondeu com o status ${resposta.status}`)
    }

    const retorno = await resposta.json()
    mostrarResultado('Cadastro concluído')
    alert(JSON.stringify(retorno, null, 2))
  } catch (erro) {
    mostrarResultado(`Não foi possível enviar o cadastro: ${erro.message}`, true)
  } finally {
    botao.disabled = false
  }
}

function limparForm () {
  document.querySelectorAll('.erro').forEach(erro => {
    erro.classList.remove('erro')
    erro.classList.add('oculto')
  })

  const concluido = document.querySelector('#concluido')
  concluido.classList.remove('sucesso')
  concluido.classList.add('oculto')
}

function validarForm () {
  const campos = [
    ['nome', 'Nome'],
    ['idade', 'Idade'],
    ['email', 'Email'],
    ['celular', 'Celular'],
    ['cpf', 'CPF'],
    ['endereco', 'Endereço'],
    ['cidade', 'Cidade'],
    ['estado', 'Estado'],
    ['cep', 'CEP'],
    ['profissao', 'Profissão']
  ]

  let valido = true

  campos.forEach(([id, rotulo]) => {
    const valor = document.querySelector(`#${id}`).value.trim()
    if (!valor) {
      mostrarErro(id, `${rotulo} não pode estar vazio`)
      valido = false
    }
  })

  const idade = Number(document.querySelector('#idade').value)
  if (document.querySelector('#idade').value && idade < 18) {
    mostrarErro('idade', 'É necessário ter pelo menos 18 anos')
    valido = false
  }

  const email = document.querySelector('#email').value.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarErro('email', 'Informe um email válido')
    valido = false
  }

  if (celular.value.replace(/\D/g, '').length !== 11) {
    mostrarErro('celular', 'Informe um celular com DDD e 11 dígitos')
    valido = false
  }

  const cpf = document.querySelector('#cpf').value.replace(/\D/g, '')
  if (cpf && !/^\d{11}$/.test(cpf)) {
    mostrarErro('cpf', 'Informe um CPF com 11 dígitos')
    valido = false
  }

  const estado = document.querySelector('#estado').value.trim()
  if (estado && !/^[a-z]{2}$/i.test(estado)) {
    mostrarErro('estado', 'Informe a sigla do estado com 2 letras')
    valido = false
  }

  const cep = document.querySelector('#cep').value.replace(/\D/g, '')
  if (cep && !/^\d{8}$/.test(cep)) {
    mostrarErro('cep', 'Informe um CEP com 8 dígitos')
    valido = false
  }

  const termos = document.querySelector('#termos')
  if (!termos.checked) {
    const erroTermos = document.querySelector('#erro-termos')
    erroTermos.textContent = 'É necessário aceitar os termos'
    erroTermos.classList.add('erro')
    erroTermos.classList.remove('oculto')
    valido = false
  }

  return valido
}

function mostrarErro (id, mensagem) {
  const erro = document.querySelector(`#erro-${id}`)
  erro.textContent = mensagem
  erro.classList.add('erro')
  erro.classList.remove('oculto')
}

function mostrarResultado (mensagem, erro = false) {
  const concluido = document.querySelector('#concluido')
  concluido.textContent = mensagem
  concluido.classList.remove('oculto')
  concluido.classList.add(erro ? 'erro' : 'sucesso')
}
