
function marcarJogos(){
    jogosMarcados = JSON.parse(localStorage.getItem('jogos'))

    jogosMarcados.forEach(jogo => {
        let cardJogo = document.querySelector(`#${jogo}`)
        cardJogo.classList.add("marcado")
    });
}


marcarJogos()


function marcar(jogo){
    let jogosSelecionados = JSON.parse(localStorage.getItem('jogos'))

    let cardJogo = document.querySelector(`#${jogo}`)
    
    
    if(cardJogo.classList.contains("marcado")){
        jogosSelecionados = jogosSelecionados.filter(gameSalvo => gameSalvo != jogo )
        
        localStorage.setItem('jogos', JSON.stringify(jogosSelecionados));
        cardJogo.classList.remove("marcado")
        
    }else{

        

        if(jogosSelecionados == null){
            jogosSelecionados = []
        }
        if (jogosSelecionados.includes(jogo)){
            
        }else{
            jogosSelecionados.push(jogo)
        }
        
        
        
        localStorage.setItem('jogos', JSON.stringify(jogosSelecionados));
        marcarJogos()
    }
    

     
}

