const sort_Categoria_Palavra = (objeto = {}) => {
    //Carlos Alberto - retorna um array com tema na posição 0 e palavra na posição 1;
    const aleatorio = (array = []) => {
        max = array.length;
        return Math.floor(Math.random() * (max - 0) + 0);
    }
    const tema = Object.keys(objeto);
    const categoria = tema[aleatorio(tema)];
    const elementos = objeto[categoria];
    const elemento = elementos[aleatorio(elementos)];

    return [categoria.toUpperCase(), elemento.toUpperCase()]
}

function separaCaracteres(palavra = "") {
    // Rafael - função de tratamento da palavra sorteada
    let caracteresPalavraSorteada = "";

    for (i in palavra) {
        if (palavra[i] != " ") {
            caracteresPalavraSorteada = caracteresPalavraSorteada + "_";
        } else {
            caracteresPalavraSorteada = caracteresPalavraSorteada + " ";
        }
    }
    return caracteresPalavraSorteada.split('');
}

function tiraVida(tentativas) {
    //Murillo - essa função serve para alterar a img da forca de acordo com o numero de tentativas
    switch (tentativas) {
        case 5:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca1.png')";
            break;
        case 4:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca2.png')";
            break;
        case 3:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca3.png')";
            break;
        case 2:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca4.png')";
            break;
        case 1:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca5.png')";
            break;
        case 0:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca6.png')";
            break;
        default:
            document.getElementById("forca__img").style.background = "url('./assets/images/forca0.png')";
            break;
    }
};

function letraUsada(clicada) {
    //Murillo - essa função recebe o id da tecla clicada para alterar os atributos CSS dela, impedindo o uso repetido desta tecla
    document.getElementById(clicada).style.pointerEvents = "none";
    document.getElementById(clicada).style.backgroundColor = "rgba(89, 69, 62, 0.8)";
    document.getElementById(clicada).style.cursor = "not-allowed";
    document.getElementById(clicada).setAttribute("disabled", "true");
};
const verificaJogo = (vida, palavra, palavraSecreta) =>{
    if (!vida || palavra == palavraSecreta ){
        document.getElementById("alertaFinal").removeAttribute("hidden");
        document.getElementById("teclado__virtual").style.visibility = "hidden";
        document.getElementById("alertaFinal").style.visibility = "visible";
        document.getElementById("categoria__sorteada").style.visibility = "hidden";
        document.getElementById("palavra__escondida").style.visibility = "hidden";
        if(!vida){
            document.getElementById("alerta").innerHTML = `<p>Deu forca! A palavra era: <strong>${palavra}</strong>!</p>`;
        }else{
            document.getElementById("alerta").innerHTML = `<p><strong>Parabéns, você acertou! A palavra era: ${palavra}!</strong></p>`;
        }
    }
}


fetch("scripts/teste.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let vida = 6;
        tiraVida(vida)
        let listaPalavras = data;
        const temaPalavra = sort_Categoria_Palavra(listaPalavras);
        let palavra = temaPalavra[1];
        let palavraSecreta = separaCaracteres(palavra);
        let tema = temaPalavra[0];

        //Murillo/Carlos - mostraNaTela(tema, palavraSecreta);
        const mostraCategoria = document.getElementById("categoria__sorteada");
        mostraCategoria.innerHTML = `${tema}`;
        const palavraExibida = document.getElementById('palavra__escondida');
        palavraExibida.innerHTML = `${palavraSecreta.join('')}`;

        function verificaLetra(letra = '', p = palavra, pS = palavraSecreta) {
            // Anna - Verifica se a letra está na palavra e chama as funções tiraVida() e verificaJogo()
            let dentro = false;
            for (i in p) {
                if (p[i] == letra) {
                    dentro = true
                    pS.splice(i, 1, letra);
                    palavraExibida.innerHTML = `${pS.join('')}`;
                }
            };
            if (!dentro) {
                vida--
                tiraVida(vida)
            }
            verificaJogo(vida, palavra, pS.join(''))
        }

        //Carlos - retornar letra clicada no teclado
        let botoes = document.body.querySelectorAll(".btn");

        for (let i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener("click", function () {
                verificaLetra(botoes[i].textContent)
                let id = `tecla-${botoes[i].textContent}`
                letraUsada(id)
            });
        }

    })