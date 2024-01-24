// Declaração de variaveis.
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
// Função de padrão de documento para ser colocado
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //Voz do jogo
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate: 1.2});
}
//Função de exibição de tela inicial.
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();
// Essa função verifica se a pessoa acertou ou não o chute, e trazendo dicas caso não tenha acertado de primeira.
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';//Essa linha e como se fosse o if porém mais rápido.
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
// Essa função gera um número aleatório para o jogo realizando uma verificação de o número já foi sorteado ou não.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);// Math.randow - gera numeros aleatórios entretanto somente de 0 a 1.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;//lenth - conta quantas linhas tem a lista.

    if(quantidadeDeElementosNaLista == numeroLimite)
    {
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ // includes - verifica dentro da lista se o numero ou outra coisa tem igual.
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);// push - coloca dentro da lista no final.
        return numeroEscolhido;
    }
}
// Essa função limpa o campo de digitação caso o usuario erra o número.
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
// Esse botão reinia o jogo caso o usuario ganhe a partida.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

