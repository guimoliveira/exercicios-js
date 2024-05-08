// Algorítmos da lista de exercício 1 do módulo 1.
// Aluno: Guilherme Marcelino de Oliveira

// Instruções:
// - Instalar prompt-sync: npm install prompt-sync
// - Executar o script: node M01E01.js

const prompt = require('prompt-sync')();

// Métodos auxiliares
function lerString(pergunta) {
    return (prompt(pergunta) || '').trim();
}

function lerNumeroValido(pergunta) {
    let numero = null;
    do  {
        if (numero != null) {
            console.log('Número inválido.');
        }
        const n = lerString(pergunta).replace(',', '.');
        if (n == '') {
            numero = NaN;
        } else {
            numero = Number(n);
        }
    } while (isNaN(numero));

    return numero;
}

function lerNumerosEnquantoValido(metodoValidacao, callbackSucessoLeitura) {
    let numero = null;
    let entrada = null;
    do  {
        if (numero != null) {
            callbackSucessoLeitura(numero);
        }
        entrada = lerString('Insira um número: ');
        numero = Number(entrada);
    } while (metodoValidacao(entrada, numero));
}

// Exercício 1
function converterCelsiusParaFahrenheit(grausCelsius) {
    return grausCelsius * 1.8 + 32;
}

function processarConversaoCelsiusParaFahrenheit() {
    const grausCelsius = lerNumeroValido('Insira a temperatura em graus Celsius: ');
    const grausFahrenheit = converterCelsiusParaFahrenheit(grausCelsius);

    console.log(grausCelsius + 'ºC é equivalente a ' + grausFahrenheit + 'ºF.');
}

// Exercício 2
function lerDadosEleicao() {
    console.log('Insira os dados da eleição:');

    return {qtdEleitores: Math.floor(lerNumeroValido('Quantidade de eleitores: ')),
            qtdVotosBrancos: Math.floor(lerNumeroValido('Quantidade de votos brancos: ')),
            qtdVotosNulos: Math.floor(lerNumeroValido('Quantidade de votos nulos: ')),
            qtdVotosValidos: Math.floor(lerNumeroValido('Quantidade de votos válidos: '))};
}

function validarDadosEleicao(dadosEleicao) {
    let qtdVotos = 0;
    if (dadosEleicao.qtdEleitores == 0) {
        console.log('É necessário pelo menos um eleitor.');
        return false;
    }
    for (let dado in dadosEleicao) {
        if (dadosEleicao[dado] < 0) {
            console.log('Nenhum dos valores pode ser menor que 0.');
            return false;
        }
        if (dado != 'qtdEleitores') {
            qtdVotos += dadosEleicao[dado];
        }
    }
    if (qtdVotos != dadosEleicao.qtdEleitores) {
        console.log('A quantidade total de votos deve ser igual a quantidade de eleitores.');
        return false;
    }
    return true;
}

function calcularPercentualVotos(dadosEleicao) {
    return {
        percentualVotosBrancos: (dadosEleicao.qtdVotosBrancos / dadosEleicao.qtdEleitores * 100).toFixed(2),
        percentualVotosNulos: (dadosEleicao.qtdVotosNulos / dadosEleicao.qtdEleitores * 100).toFixed(2),
        percentualVotosValidos: (dadosEleicao.qtdVotosValidos / dadosEleicao.qtdEleitores * 100).toFixed(2)
    };
}

function processarEleicao() {
    const dadosEleicao = lerDadosEleicao();

    if (validarDadosEleicao(dadosEleicao)) {
        const percentualVotos = calcularPercentualVotos(dadosEleicao);

        console.log('Estatísticas da eleição:');
        console.log(' Percentual de votos brancos: ' + percentualVotos.percentualVotosBrancos + '%');
        console.log(' Percentual de votos nulos: ' + percentualVotos.percentualVotosNulos + '%');
        console.log(' Percentual de votos válidos: ' + percentualVotos.percentualVotosValidos + '%');
    }
}

// Exercício 3
function lerQuatroNumeros() {
    return [
        Math.floor(lerNumeroValido('Insira o primeiro número: ')),
        Math.floor(lerNumeroValido('Insira o segundo número: ')),
        Math.floor(lerNumeroValido('Insira o terceiro número: ')),
        Math.floor(lerNumeroValido('Insira o quarto número: '))
    ];
}

function processarQuatroNumeros() {
    const numeros = lerQuatroNumeros();
    numeros[3] = numeros[0] + numeros[1] + numeros[2];
    numeros[0] += 25;
    numeros[1] *= 3;
    numeros[2] *= .12;

    console.log('Resultado após as operações:');
    for (let i = 0; i < 4; i++) {
        console.log(' Número ' + i + ': ' + numeros[i].toFixed(2));
    }
}

// Exercício 4
function lerNotas(qtdProvas) {
    console.log('Insira as notas das provas:');

    const notas = [];
    for (let i = 0; i < qtdProvas; i++) {
        notas.push(lerNumeroValido('Insira a nota da prova ' + (i + 1) + ': '));
    }
    return notas;
}

function validarNotas(notas) {
    for (let i = 0; i < notas.length; i++) {
        if (notas[i] < 0 || notas[i] > 10) {
            console.log('Nota da prova ' + (i + 1) + ' inválida.');
            return false;
        }
    }
    return true;
}

function calcularMediaNotas(notas) {
    let somatoria = 0;
    for (let i = 0; i < notas.length; i++) {
        somatoria += notas[i];
    }
    return somatoria / notas.length;
}

function processarAprovacaoProvas() {
    const notas = lerNotas(2);
    if (validarNotas(notas)) {
        const media = calcularMediaNotas(notas);
        console.log('Média semetral: ' + media);

        if (media >= 6) {
            console.log('PARABÉNS! Você foi aprovado.');
        }
    }
}

// Exercício 5
function processarAprovacaoReprovacaoProvas() {
    const notas = lerNotas(2);
    if (validarNotas(notas)) {
        const media = calcularMediaNotas(notas);
        console.log('Média semetral: ' + media);

        if (media >= 6) {
            console.log('PARABÉNS! Você foi aprovado.');
        } else {
            console.log('Você foi REPROVADO! Estude mais.');
        }        
    }
}

// Exercício 6
function lerTamanhoLadosTriangulo() {
    console.log('Insira o tamanho dos lados do triângulo:');

    return [
        lerNumeroValido('Lado A: '),
        lerNumeroValido('Lado B: '),
        lerNumeroValido('Lado C: ')
    ];
}

function validarTamanhoLadosTriangulo(lados) {
    for (let i = 0; i < 3; i++) {
        if (lados[i] < 0) {
            return false;
        }
    }
    return (lados[0] < lados[1] + lados[2] &&
            lados[1] < lados[0] + lados[2] &&
            lados[2] < lados[0] + lados[1]);
}

function calcularTipoTriangulo(lados) {
    if (lados[0] != lados[1] && lados[1] != lados[2]) {
        return 'Triângulo escaleno';
    } else if (lados[0] == lados[1] && lados[1] == lados[2]) {
        return 'Triângulo equilátero';
    } else if (lados[0] == lados[1] || lados[0] == lados[2] || lados[1] == lados[2]) {
        return 'Triângulo isósceles';
    }
    return 'Triângulo inválido';
}

function processarTriangulo() {
    const lados = lerTamanhoLadosTriangulo();

    if (!validarTamanhoLadosTriangulo(lados)) {
        console.log('Triângulo inválido');
        return;
    } 
    console.log('Tipo do triângulo: ' + calcularTipoTriangulo(lados));
}

// Exercício 7
function calcularPrecoMaca(qtdMacas) {
    return qtdMacas < 12 ? 0.3 : 0.25;
}

function calcularValorTotalMacas(qtdMacas) {
    const precoMaca = calcularPrecoMaca(qtdMacas);
    return precoMaca * qtdMacas;
}

function processarCompraMacas() {
    const qtdMacas = Math.floor(lerNumeroValido('Insira a quantidade maçãs compradas: '));

    if (qtdMacas < 0) {
        console.log('Número de itens comprados deve ser maior ou igual a zero.');
        return;
    }
    console.log('Valor total da compra: R$ ' + calcularValorTotalMacas(qtdMacas).toFixed(2));
}

// Exercício 8
function lerDoisNumeros() {
    return [
        Math.floor(lerNumeroValido('Insira o primeiro número: ')),
        Math.floor(lerNumeroValido('Insira o segundo número: '))
    ];
}

function processarOrdenacao() {
    const numeros = lerDoisNumeros();
    numeros.sort(function(a, b) {
        return a - b;
    });

    console.log('Resultado após ordenação:');
    for (let i = 0; i < numeros.length; i++) {
        console.log(numeros[i]);
    }
}

// Exercício 9
function converterCodigoOrigemProduto(codigo) {
    if (codigo >= 10 && codigo <= 20) {
        return 'Centro-Oeste';
    }
    if (codigo == 5 || codigo == 6 || (codigo >= 25 && codigo <= 50)) {
        return 'Nordeste';
    }
    switch (codigo) {
        case 1:
            return 'Sul';
        case 2:
            return 'Norte';
        case 3:
            return 'Leste';
        case 4:
            return 'Oeste';
        case 7:
        case 8:
        case 9:
            return 'Sudeste';
    }
    return 'Produto Importado';
}

function processarOrigemProduto() {
    const codigoOrigem = lerNumeroValido('Insira o código de origem do produto: ');
    console.log('Origem do produto: ' + converterCodigoOrigemProduto(codigoOrigem));
}

// Exercício 10
function imprimirNumeroRepetido(numero, qtd) {
    for (let i = 0; i < qtd; i++) {
        console.log(numero);
    }
}

function processarRepeticaoNumero() {
    const numero = Math.floor(lerNumeroValido('Insira o número a ser repetido: '));
    imprimirNumeroRepetido(numero, 10);
}

// Exercício 11
function validarNumeroPositivoNaoNulo(entrada, numero) {
    return entrada.replaceAll(' ', '') !== '' && !isNaN(numero) && numero >= 0;
}

function verificarParOuImpar(numero) {
    if (numero % 2 == 0) {
        console.log('PAR');
    } else {
        console.log('ÍMPAR');
    }
}

function processarNumerosParOuImpar() {
    console.log('Insira números e descubra se são pares ou ímpares.');
    console.log('Deixe o campo em branco ou insira um valor negativo para sair.');

    lerNumerosEnquantoValido(validarNumeroPositivoNaoNulo, verificarParOuImpar);
}

// Exercício 12
function processarNumerosRestoCinco() {
    console.log('Números entre de 1000 a 1999 que dividos por 11 dão resto 5:')
    for (let i = 1000; i < 2000; i++) {
        if (i % 11 == 5) {
            console.log(i);
        }
    }
}

// Exercício 13
function imprimirTabuada(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i + ' x ' + n + ' = ' + i * n);
    }
}

function processarTabuadas() {
    for (let i = 0; i < 5; i++) {
        const n = Math.floor(lerNumeroValido('Insira um número para a tábuada ' + (i + 1) + ': '));
        imprimirTabuada(n);
    }
}

// Exercício 14
function calcularMediaAritmetica(somatorio, qtdNumeros) {
    return somatorio / qtdNumeros;
}

function processarMediaAritmetica() {
    let somatorio = 0;
    let qtdNumeros = 0;
    let numero = null;

    console.log('Insira números para realizar a média aritmética.');
    console.log('Insira o número zero para sair.');

    while ((numero = lerNumeroValido()) != 0) {
        somatorio += numero;
        qtdNumeros++;
    }
    if (qtdNumeros > 0) {
        console.log('Média aritmética: ' + calcularMediaAritmetica(somatorio, qtdNumeros).toFixed(4));
    }
}

// Exercício 15
function calcularMediaPonderada(somatorioNumeros, somatorioPesos) {
    return somatorioNumeros / somatorioPesos;
}

function processarMediaPonderada() {
    let somatorioNumeros = 0;
    let somatorioPesos = 0;
    let numero = null;
    let peso = null;

    console.log('Insira números e pesos para realizar a média ponderada.');
    console.log('Insira o número zero para sair.');

    while ((numero = lerNumeroValido('Insira o número: ')) != 0 &&
           (peso = lerNumeroValido('Insira o peso: ')) != 0) 
    {
        somatorioNumeros += numero * peso;
        somatorioPesos += peso;
    }
    if (somatorioPesos > 0) {
        console.log('Média ponderada: ' + calcularMediaPonderada(somatorioNumeros, somatorioPesos).toFixed(4));
    }
}

// Exercício 16
function verificarNumeroPrimo(numero) {
    let i = 2;
    while (i < numero) {
        if (numero % i == 0) {
            return false;
        }
        ++i;
    }
    return true;
}

function processarNumerosPrimos() {
    console.log('50 primeiros números primos maiores que 100:');

    let i = 101;
    let qtdPrimos = 0;

    while (qtdPrimos < 50) {
        if (verificarNumeroPrimo(i)) {
            console.log(i);
            ++qtdPrimos;
        }
        ++i;
    }
}

// Entrada para seleção de qual método executar
function main() {
    try {
        const ALGORITMOS = [
            {nome: 'CONVERSÃO CELSIUS PARA FAHRENHEIT', metodo: processarConversaoCelsiusParaFahrenheit},
            {nome: 'PERCENTUAL VOTOS DA ELEIÇÃO', metodo: processarEleicao},
            {nome: 'OPERAÇÕES SOBRE QUATRO NÚMEROS', metodo: processarQuatroNumeros},
            {nome: 'MÉDIA DAS NOTAS', metodo: processarAprovacaoProvas},
            {nome: 'MÉDIA DAS NOTAS 2', metodo: processarAprovacaoReprovacaoProvas},
            {nome: 'TIPO DO TRIÂNGULO', metodo: processarTriangulo},
            {nome: 'PREÇO DAS MAÇÃS', metodo: processarCompraMacas},
            {nome: 'ORDENAR DOIS VALORES', metodo: processarOrdenacao},
            {nome: 'ORIGEM DO PRODUTO', metodo: processarOrigemProduto},
            {nome: 'REPETIR NÚMERO 10 VEZES', metodo: processarRepeticaoNumero},
            {nome: 'PAR OU ÍMPAR', metodo: processarNumerosParOuImpar},
            {nome: 'NÚMEROS DIVIDIDOS POR 11 COM RESTO 5', metodo: processarNumerosRestoCinco},
            {nome: 'TABUADA', metodo: processarTabuadas},
            {nome: 'MÉDIA ARITMÉTICA', metodo: processarMediaAritmetica},
            {nome: 'MÉDIA PONDERADA', metodo: processarMediaPonderada},
            {nome: 'NÚMEROS PRIMOS', metodo: processarNumerosPrimos}
        ];

        console.log('Algorítmos disponíveis:');

        for (let i = 0; i < ALGORITMOS.length; i++) {
            console.log(((i + 1) + '. ').padStart(5, ' ') + ALGORITMOS[i].nome);
        }

        console.log('Para sair, escolha um algorítmo inexistente.');

        const algoritmo = Math.floor(lerString('Qual algorítmo você deseja executar: ')) - 1;
        if (!ALGORITMOS[algoritmo]) {
            console.log('Algorítmo inexistente.');
            return;
        }
        ALGORITMOS[algoritmo].metodo();

    } catch (ex) {
        console.log('Ocorreu um erro durante a execução do algorítmo:', ex);
    }
}

main();