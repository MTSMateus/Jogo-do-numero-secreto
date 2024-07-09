let listaDosNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirNomeNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirNomeNaTela('h1', 'Jogo do Número Secreto!');
    exibirNomeNaTela('p', 'Chute um número de 1 a 10.');
}

exibirMensagemInicial();
// Alternativa mais simples para o código acima:
// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do Número Secreto!";
// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Chute um número de 1 a 10.";

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirNomeNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirNomeNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirNomeNaTela('p', 'O número secreto é menor!');
        } else {
            exibirNomeNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDosNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDosNumerosSorteados = [];
    }
    if (listaDosNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDosNumerosSorteados.push(numeroEscolhido);
        console.log(listaDosNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}