// alterando os btns evts

$('.verde, .azul, .amarelo, .vermelho').on('click', function () {
    const cor = $(this).attr("class").split(' ')[0]; // pega a primeira classe (ex: 'verde')
    playSom(cor);
    cliqueUsuario(cor);
});
//funcao tocar som
function playSom(cor) {
    let som;

    if (cor === "verde") {
        som = new Audio("som verde.mp3");
    } else if (cor === "azul") {
        som = new Audio("som azul (2).mp3");
    } else if (cor === "amarelo") {
        som = new Audio("som amarelo.mp3");
    } else if (cor === "vermelho") {
        som = new Audio("som vermelho.mp3");
    }

    som.play();
}


// VARIÁVEIS PRINCIPAIS DO JOGO

const cores = ["verde", "azul", "amarelo", "vermelho"];
let sequencia = [];
let sequenciaUsuario = [];
let nivel = 0;
let iniciado = false;


//aqui estou fazendo o funcionamento e o inicio da logica do jogo
//sequeci vazia e nivel 0 iniciando sendo verdadeiro ao clicar em start o jogo comeca
$('.start').on("click",function(){
    if(!iniciado){


 sequencia=[];
 nivel=0;
 iniciando= true;

 nextlevel();
}

});


function nextlevel(){
 sequenciaUsuario=[];nivel++;
 $("#nivel").text(" nivel " + nivel);

//sorteio
const numeroCor=Math.floor(Math.random()*4);
const corSorteada=cores[numeroCor];
sequencia.push(corSorteada);

mostraSequencia();//aqui estou chamndo a funcao dentro do proximo nivel ,porque a sequencia vai ser mostrada conformw o sorteio

};

function mostraSequencia(){

    let i=0;                //comencando com um intervalo do 0
    const intervalo=setInterval(()=>{   //armazenando sequencia que vai ver mostrada
        const cor =sequencia[i];//
        piscarCor(cor);// nessa funcao eu quero que o sorteio pesque a cor e toque o som da cor
        playSom(cor);
        i++;
        if(i>=sequencia.length){

            clearInterval(intervalo);
        }





    }, 800);  // aqui eu passei o intervalo da piscada


}
//aqui estou fazendo uma funcao para piscar a cor sorteada 
function piscarCor(cor) {
    const botao = $("." + cor);
    botao.addClass("piscar");
    setTimeout(() => {
        botao.removeClass("piscar");
    }, 400);
}
//verificacao se o usuario acertou ou nao a sequencia mostrada

function verificarResposta(indiceAtual){
    if(sequenciaUsuario[indiceAtual]===sequencia[indiceAtual]){
         if (sequenciaUsuario.length === sequencia.length) {
            setTimeout(() => {
                nextlevel();
            }, 1000);
        }
    
    }else {
        // se errou
        $("body").addClass("game-over");// add o game over por escrito no body do jogo
        playSom("vermelho"); // som de erro (ou o vermelho)
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);

        $("#nivel").text("Game Over! Clique em Start para jogar novamente"); //aqui estou dizendo se der game over para mostra essa frase
        iniciado = false;
        sequencia = [];
        nivel = 0; // e vai reiciniar do nivel 1
       
    }
}


//funcao para verificar o clic do usuario se foi na cor certa 
function cliqueUsuario(cor) {
    sequenciaUsuario.push(cor);// aqui eu confiro se a sequecia que ele fez esta dentro do array para ele nao clicar fora dos botoes e dizer que nao pega
    verificarResposta(sequenciaUsuario.length - 1);
    
}





