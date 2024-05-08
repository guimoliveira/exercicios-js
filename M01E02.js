// Algorítmos da lista de exercício 2 do módulo 1.
// Aluno: Guilherme Marcelino de Oliveira

// Instruções:
// - Instalar prompt-sync: npm install prompt-sync
// - Executar o script: node M01E02.js

const prompt = require('prompt-sync')();
const fs = require('node:fs');

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

function lerNumeros(quantidade) {
    const arr = [];
    for (let i = 0; i < quantidade; i++) {
        arr.push(lerNumeroValido('Insira um número: '));
    }
    return arr;
}

function lerMatrizNumeros(linhas, colunas) {
    const m = [];
    for (let y = 0; y < linhas; y++) {
        m[y] = [];
        for (let x = 0; x < colunas; x++) {
            m[y][x] = lerNumeroValido('Insira um valor para a linha ' + (y + 1) + ', coluna ' + (x + 1) + ': ');
        }
    }
    return m;
}

// Exercício 1
function calcularDiasPerdidosVidaPorFumar(cigarrosPorDia, anosFumando) {
    const MINUTOS_EM_UM_DIA = 60 * 24;
    const DIAS_EM_UM_ANO = 365;
    const MINUTOS_PERDIDOS_POR_CIGARRO = 10;

    if (cigarrosPorDia < 0 || anosFumando < 0) {
        return 0;
    }

    return Math.floor((cigarrosPorDia * anosFumando * DIAS_EM_UM_ANO * MINUTOS_PERDIDOS_POR_CIGARRO) / MINUTOS_EM_UM_DIA);
}

function processarPerdaDiasVidaPorFumar() {
    const cigarrosPorDia = Math.floor(lerNumeroValido('Insira a quantidade de cigarros fumados por dia: '));
    const anosFumando = Math.floor(lerNumeroValido('Insira por quantos anos você já fumou cigarro: '));
    const diasPerdidos = calcularDiasPerdidosVidaPorFumar(cigarrosPorDia, anosFumando);

    console.log('Você perdeu ' + diasPerdidos + ' dias de sua vida por causa do cigarro.');
}

// Exercício 2
function calcularValorMulta(velocidadeCarro, velocidadeMaxima) {
    if (velocidadeCarro <= velocidadeMaxima) {
        return 0;
    }
    return (velocidadeCarro - velocidadeMaxima) * 5;
}

function processarVelocidadeCarro() {
    const VELOCIDADE_MAXIMA = 80;

    const velocidadeCarro = Math.floor(lerNumeroValido('Insira a velocidade do carro: '));
    const multa = calcularValorMulta(velocidadeCarro, VELOCIDADE_MAXIMA);

    if (multa > 0) {
        console.log('Você foi multado em R$' + multa + ',00 por excesso de velocidade.');
    }
}

// Exercício 3
function calcularPrecoPassagem(distancia) {
    if (distancia < 0) {
        return 0;
    } else  if (distancia <= 200) {
        return 0.5 * distancia;
    } else {
        return 0.45 * distancia;
    }
}

function processarPrecoPassagem() {
    const distancia = lerNumeroValido('Insira a distância da viagem: ');
    const precoPassagem = calcularPrecoPassagem(distancia).toFixed(2);

    console.log('O preço da passagem é R$' + precoPassagem);
}

// Exercício 4
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

function processarTriangulo() {
    const lados = lerTamanhoLadosTriangulo();

    if (!validarTamanhoLadosTriangulo(lados)) {
        console.log('Triângulo inválido');
        return;
    } 
    console.log('Triângulo válido');
}

// Exercício 5
function validarEntradaJoKenPo(entrada) {
    return entrada == 'PEDRA' || entrada == 'PAPEL' || entrada == 'TESOURA';
}

function obterJogadaAleatoriaJoKenPo() {
    const rand = Math.random() * 3;
    if (rand < 1) {
        return 'PEDRA';
    } else if (rand < 2) {
        return 'PAPEL';
    }
    return 'TESOURA';
}

function mostrarAnimacaoJoKenPo(callback) {
    console.log('');
    setTimeout(() => {console.log('PEDRA...');}, 1000);
    setTimeout(() => {console.log('PAPEL...');}, 2000);
    setTimeout(() => {console.log('TESOURA!');}, 3000);
    setTimeout(() => {console.log(''); callback();}, 4000);
}

function processarGanhadorJoKenPo(jogadaUsuario, jogadaCPU) {
    if (jogadaUsuario == jogadaCPU) {
        console.log('Empate!');
        return;
    }
    if ((jogadaUsuario == 'PEDRA' && jogadaCPU == 'TESOURA') ||
        (jogadaUsuario == 'PAPEL' && jogadaCPU == 'PEDRA') ||
        (jogadaUsuario == 'TESOURA' && jogadaCPU == 'PAPEL')) 
    {
        console.log('Você ganhou!');
        return;
    }
    console.log('Você perdeu!');
}

function processarJoKenPo() {
    const jogadaUsuario = lerString('Qual sua jogada? (PEDRA, PAPEL ou TESOURA) ').toUpperCase();
    if (!validarEntradaJoKenPo(jogadaUsuario)) {
        console.log('Jogada inválida');
        return;
    }
    const jogadaCPU = obterJogadaAleatoriaJoKenPo();

    mostrarAnimacaoJoKenPo(() => {
        console.log('Você jogou ' + jogadaUsuario);
        console.log('CPU jogou ' + jogadaCPU);
        console.log('');
        processarGanhadorJoKenPo(jogadaUsuario, jogadaCPU);
    });
}

// Exercício 6
function processarJogoAdivinhacao() {
    const numeroSorteado = Math.floor(Math.random() * 5 + 1);
    let numeroEscolhido = lerNumeroValido('Tente adivinhar um número de 1 a 5: ');
    while (numeroEscolhido != numeroSorteado) {
        if (numeroSorteado < numeroEscolhido) {
            console.log('O número a ser adivinhado é menor que ' + numeroEscolhido);
        } else {
            console.log('O número a ser adivinhado é maior que ' + numeroEscolhido);
        }
        numeroEscolhido = lerNumeroValido('Tente novamente: ');
    }
    console.log('Você acertou! O número era ' + numeroSorteado);
}

// Exercício 7
function lerDadosAluguelCarro() {
    return {
        tipo: lerString('Insira o tipo do carro: (POPULAR, LUXO) ').toUpperCase(),
        dias: Math.floor(lerNumeroValido('Insira a quantidade de dias de aluguel: ')),
        km: lerNumeroValido('Insira quantos quilômetros foram percorridos: ')
    };
}

function validarDadosAluguelCarro(dados) {
    if (dados.tipo != 'POPULAR' && dados.tipo != 'LUXO') {
        console.log('Tipo de carro inválido.');
        return false;
    }
    if (dados.dias < 0) {
        console.log('Quantidade de dias inválida.');
        return false;
    }
    if (dados.km < 0) {
        console.log('Quantidade de quilômetros inválida.');
        return false;
    }
    return true;
}

function calcularPrecoAluguelCarro(dados) {
    let precoPorKm;
    let precoPorDia;
    if (dados.tipo == 'POPULAR') {
        if (dados.km <= 100) {
            precoPorKm = 0.2;
        } else {
            precoPorKm = 0.1;
        }
        precoPorDia = 90;
    } else {
        if (dados.km <= 200) {
            precoPorKm = 0.3;
        } else {
            precoPorKm = 0.25;
        }
        precoPorDia = 150;
    }
    return precoPorDia * dados.dias + precoPorKm * dados.km;
}

function processarAluguelCarro() {
    const dadosAluguel = lerDadosAluguelCarro();
    if (!validarDadosAluguelCarro(dadosAluguel)) {
        return;
    }
    const precoAluguel = calcularPrecoAluguelCarro(dadosAluguel).toFixed(2);
    console.log('Preço total a ser pago: R$' + precoAluguel);
}

// Exercício 8
function calcularPontosProgramaVidaSaudavel(horasAtividade) {
    let pontosPorHora;
    if (horasAtividade <= 0) {
        pontosPorHora = 0;
    } else if (horasAtividade <= 10) {
        pontosPorHora = 2;
    } else if (horasAtividade <= 20) {
        pontosPorHora = 5;
    } else {
        pontosPorHora = 10;
    }
    return Math.floor(pontosPorHora * horasAtividade);
}

function calcularRecompensaProgramaVidaSaudavel(pontos) {
    return pontos * 0.05;
}

function processarParticipacaoProgramaVidaSaudavel() {
    const pontos = calcularPontosProgramaVidaSaudavel(lerNumeroValido('Insira a quantidade de horas em atividades físicas no mês: '));
    const recompensa = calcularRecompensaProgramaVidaSaudavel(pontos).toFixed(2);

    console.log('Você obteve ' + pontos + ' pontos neste mês.');
    console.log('Você faturou R$' + recompensa + ' com o programa de vida saudável neste mês.');
}

// Exercício 9
function lerDadosFuncionario() {
    console.log('Insira os dados do funcionário:');
    return {
        sexo: lerString('Sexo: (M/F) ').toUpperCase(),
        salario: lerNumeroValido('Salário: ')
    };
}

function validarDadosFuncionario(dados) {
    if (dados.sexo != 'M' && dados.sexo != 'F') {
        console.log('Sexo inválido.');
        return false;
    }
    if (dados.salario < 0) {
        console.log('Salário inválido.');
        return false;
    }
    return true;
}

function calcularSalarioTotalPorSexo(funcionarios) {
    let masculino = 0;
    let feminino = 0;

    for (let funcionario of funcionarios) {
        if (funcionario.sexo == 'M') {
            masculino += funcionario.salario;
        } else {
            feminino += funcionario.salario;
        }
    }

    return {masculino, feminino};
}

function processarSalarioFuncionarios() {
    const funcionarios = [];
    let continuar = 'S';

    while (continuar == 'S') {
        const funcionario = lerDadosFuncionario();
        if (validarDadosFuncionario(funcionario)) {
            funcionarios.push(funcionario);
        }
        continuar = lerString('Deseja continuar? (S/N) ').toUpperCase();
    }

    const salarioTotalPorSexo = calcularSalarioTotalPorSexo(funcionarios);
    console.log('Salário total pago a funcionários do sexo masculino: R$' + salarioTotalPorSexo.masculino.toFixed(2));
    console.log('Salário total pago a funcionários do sexo feminino: R$' + salarioTotalPorSexo.feminino.toFixed(2));
}

// Exercício 10
function processarVariosNumeros() {
    const numeros = [];
    let total = 0;
    let menor = Infinity;
    let numPares = 0;
    let continuar = 'S';

    while (continuar == 'S') {
        const numero = lerNumeroValido('Insira um número: ');

        if (numero < menor) {
            menor = numero;
        }
        if (numero % 2 == 0) {
            numPares++;
        }

        total += numero;
        numeros.push(numero);

        continuar = lerString('Deseja continuar? (S/N) ').toUpperCase();
    }

    const media = total / numeros.length;

    console.log('Somatório entre todos os valores: ' + total);
    console.log('Menor valor digitado: ' + menor);
    console.log('Média entre todos os valores: ' + media);
    console.log('Quantidade de valores pares: ' + numPares);
}

// Exercício 11
function processarProgressaoAritmetica() {
    const primeiroTermo = lerNumeroValido('Insira o primeiro termo da PA: ');
    const razao = lerNumeroValido('Insira a razão da PA: ');

    let soma = 0;

    console.log('10 primeiros elementos da PA:');
    for (let i = 0; i < 10; i++) {
        const elemento = primeiroTermo + i * razao;
        soma += elemento;

        console.log(elemento);
    }
    console.log('Soma dos 10 primeiros elementos: ' + soma);
}

// Exercício 12
function calcularElementosFibonacci(qtd) {
    const arr = [1, 1];
    for (let i = 2; i < qtd - 2; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr;
}

function processar10ElementosFibonacci() {
    const sequencia = calcularElementosFibonacci(10);

    console.log('Os 10 primeiros elementos da sequência de Fibonacci são:');
    console.log(sequencia.join(', '));
}

// Exercício 13
function processar15ElementosFibonacci() {
    const sequencia = calcularElementosFibonacci(15);

    console.log('Os 15 primeiros elementos da sequência de Fibonacci são:');
    console.log(sequencia.join(', '));
}

// Exercício 14
function processar7Nomes() {
    const nomes = [];

    console.log('Insira 7 nomes:');
    for (let i = 0; i < 7; i++) {
        nomes.push(lerString('Insira um nome: '));
    }

    console.log('Nomes inseridos em ordem inversa:');
    for (let i = 6; i > 0; i--) {
        console.log(nomes[i]);
    }
}

// Exercício 15
function obterNumerosPares(numeros) {
    const ret = [];

    for (let i = 0; i < numeros.length; i++) {
        const numero = Math.floor(numeros[i]);
        if (numeros[i] % 2 == 0) {
            ret.push({
                'Posição': i + 1,
                'Número': numero
            });
        }
    }
    return ret;
}

function processarNumerosPares() {
    console.log('Insira 10 números: ');

    const numeros = lerNumeros(10);
    const pares = obterNumerosPares(numeros);

    console.log('Números pares:');
    console.table(pares);
}

// Exercício 16
function obterNumerosAleatorios(quantidade, min, max) {
    const numeros = [];
    for (let i = 0; i < quantidade; i++) {
        numeros.push(Math.floor(Math.random() * (max - min) + min));
    }
    return numeros;
}

function processarNumerosAleatorios() {
    const numeros = obterNumerosAleatorios(20, 0, 99);

    console.log('Números sorteados:');
    console.log(numeros.join(', '));

    numeros.sort((a, b) => a - b);

    console.log('Números sorteados em ordem crescente:');
    console.log(numeros.join(', '));
}

// Exercício 17
function lerDadosPessoa(nomes, idades) {
    const nome = lerString('Nome: ');
    const idade = Math.floor(lerNumeroValido('Idade: '));

    if (nome.length < 3) {
        console.log('Nome inválido.');
        return;
    }
    if (idade < 0 || idade > 150) {
        console.log('Idade inválida.');
        return;
    }

    nomes.push(nome);
    idades.push(idade);
}

function processarPessoas() {
    const NUMERO_PESSOAS = 9;

    const nomes = [];
    const idades = [];

    for (let i = 0; i < NUMERO_PESSOAS; i++) {
        lerDadosPessoa(nomes, idades);
    }

    console.log('Pessoas menores de idade:');
    for (let i = 0; i < NUMERO_PESSOAS; i++) {
        if (idades[i] < 18) {
            console.log(nomes[i]);
        }
    }
}

// Exercício 18
function processarDadosFuncionario() {
    console.log('Insira os dados do funcionário:');
    
    const funcionario = {
        nome: lerString('Nome: '),
        cargo: lerString('Cargo: '),
        salario: lerNumeroValido('Salário: R$ ')
    };

    console.log('Dados do funcionário:');
    console.log('Nome: ' + funcionario.nome);
    console.log('Cargo: ' + funcionario.cargo);
    console.log('Salário: R$' + funcionario.salario.toFixed(2));
}

// Exercício 19
function lerHorario() {
    const horario = lerString('Insira um horário: ').replaceAll(':', '.');
    const partes = horario.split('.');

    if (partes.length < 2 || partes.length > 3 || partes[1].length < 2 || 
       (partes.length == 3 && (partes[2].length < 2)))
    {
        console.log('Horário inválido.');
        return false;
    }

    const hora = parseInt(partes[0]);
    const minuto = parseInt(partes[1]);
    const segundo = partes[2] ? parseInt(partes[2]) : 0;

    if (isNaN(hora) || isNaN(minuto) || isNaN(segundo)) {
        console.log('Horário inválido.');
        return false;
    }

    if (hora < 0 || hora > 23 || 
        minuto < 0 || minuto > 59 || 
        segundo < 0 || segundo > 59)
    {
        console.log('Horário inválido.');
        return false;
    }

    return hora.toString().padStart(2, '0') + '.' +
           minuto.toString().padStart(2, '0') + '.' +
           segundo.toString().padStart(2, '0');
}

function processarHorarios() {
    const horarios = [];

    while (horarios.length < 5) {
        const horario = lerHorario();
        if (horario != false) {
            horarios.push(horario);
        }
    }

    console.log('Horários inseridos:');
    horarios.forEach((h) => {
        console.log(h);
    });
}

// Exercício 20
function lerDadosEmpregado() {
    const DEDUCAO_INSS = 0.12;
    let empregado = null;

    console.log('Insira os dados do empregado:')

    while (!empregado) {
        const dados = {
            matricula: lerString('Matrícula: ').toUpperCase(),
            nome: lerString('Nome: '),
            salarioBruto: lerNumeroValido('Salário bruto: R$ ')
        };
        if (dados.matricula.length < 1) {
            console.log('Matrícula inválida.');
        } else if (dados.nome.length < 3) {
            console.log('Nome inválido.');
        } else if (dados.salario < 0) {
            console.log('Salário inválido.');
        } else {
            dados.deducaoINSS = dados.salarioBruto * DEDUCAO_INSS;
            dados.salarioLiquido = dados.salarioBruto - dados.deducaoINSS;

            empregado = dados;
        }
    }
    return empregado;
}

function processarFolhaMensalEmpregados() {
    const QUANTIDADE_EMPREGADOS = 80;
    const empregados = [];

    for (let i = 0; i < QUANTIDADE_EMPREGADOS; i++) {
        empregados.push(lerDadosEmpregado());
    }

    console.log('');
    console.log('Folha de pagamento:');
    empregados.forEach((e) => {
        console.log('');
        console.log('Matrícula: ' + e.matricula);
        console.log('Nome: ' + e.nome);
        console.log('Salário bruto: R$' + e.salarioBruto.toFixed(2));
        console.log('Dedução INSS: R$' + e.deducaoINSS.toFixed(2));
        console.log('Salário líquido: R$' + e.salarioLiquido.toFixed(2));
    });
}

// Exercício 21
function calcularPesoIdeal(alt, sexo) {
    if (sexo == 'M') {
        return 72.7 * alt - 58;
    } else {
        return 62.1 * alt - 44.7;
    }
}

function lerDadosCalculoPesoIdeal() {
    let dados = null;
    while (dados == null) {
        const dadosLido = {
            altura: lerNumeroValido('Altura: (m) '),
            sexo: lerString('Sexo: (M/F) ').toUpperCase()
        };
        if (dadosLido.altura < 0.8 || dadosLido.altura > 3) {
            console.log('Altura inválida.');
        } else if (dadosLido.sexo != 'M' && dadosLido.sexo != 'F') {
            console.log('Sexo inválido.');
        } else {
            dados = dadosLido;
        }
    }
    return dados;
}

function processarCalculoPesoIdeal() {
    console.log('Insira os dados para calcular o peso ideal:');
    const dados = lerDadosCalculoPesoIdeal();
    const pesoIdeal = calcularPesoIdeal(dados.altura, dados.sexo).toFixed(2);
    console.log('Peso ideal: ' + pesoIdeal + 'kg');
}

// Exercício 22
function lerDadosPesquisaHabitante() {
    let dados = null;
    while (dados == null) {
        const dadosLido = {
            salario: lerNumeroValido('Salário: R$ '),
            numeroFilhos: Math.floor(lerNumeroValido('Número de filhos: '))
        };
        if (dadosLido.salario < 0) {
            console.log('Salário inválido.');
        } else if (dadosLido.numeroFilhos < 0 || dadosLido.numeroFilhos > 99) {
            console.log('Número de filhos inválido.');
        } else {
            dados = dadosLido;
        }
    }
    return dados;
}

function lerDadosPesquisas() {
    const dados = [];
    let continuar = 'S';

    while (continuar == 'S') {
        console.log('Insira os dados do habitante:');
        dados.push(lerDadosPesquisaHabitante());
        continuar = lerString('Deseja continuar? (S/N) ').toUpperCase();
    }
    return dados;
}

function calcularEstatisticasPesquisas(dadosPesquisas) {
    const numPesquisas = dadosPesquisas.length;

    let totalSalario = 0;
    let totalFilhos = 0;
    let maiorSalario = 0;
    let pessoasSalarioAte350 = 0;

    dadosPesquisas.forEach((pesquisa) => {
        totalSalario += pesquisa.salario;
        totalFilhos += pesquisa.numeroFilhos;

        if (pesquisa.salario > maiorSalario) {
            maiorSalario = pesquisa.salario;
        }
        if (pesquisa.salario <= 350) {
            pessoasSalarioAte350++;
        }
    });

    return {
        mediaSalarios: totalSalario / numPesquisas,
        mediaFilhos: Math.floor(totalFilhos / numPesquisas),
        maiorSalario,
        percentualPessoasSalarioAte350: Math.floor(pessoasSalarioAte350 / numPesquisas * 100) 
    };
}

function processarPesquisas() {
    const dadosPesquisas = lerDadosPesquisas();
    const estatiscas = calcularEstatisticasPesquisas(dadosPesquisas);

    console.log('Estatísticas:');
    console.log('Média salarial: R$' + estatiscas.mediaSalarios.toFixed(2));
    console.log('Média de filhos por pessoa: ' + estatiscas.mediaFilhos);
    console.log('Maior salário: R$' + estatiscas.maiorSalario.toFixed(2));
    console.log('Percentual de pessoas com salário até R$350,00: ' + estatiscas.percentualPessoasSalarioAte350 + '%');
}

// Exercício 23
function processarMatrizIdentidade() {
    const mi = [];
    for (let y = 0; y < 7; y++) {
        mi[y] = [];
        for (let x = 0; x < 7; x++) {
            mi[y][x] = x == y ? 1 : 0;
        }
    }
    console.table(mi);
}

// Exercício 24
function processarMatrizVetorNumerosNegativos() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(6, 8);

    const c = [];
    for (let y = 0; y < 6; y++) {
        c[y] = 0;
        for (let x = 0; x < 8; x++) {
            if (m[y][x] < 0) {
                c[y]++;
            }
        }
    }
    console.log('Quantidade de números negativos por linha:');
    console.table(c);
}

// Exercício 25
function processarMatrizSomaColunas() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(15, 20);

    const c = [];
    for (let x = 0; x < 20; x++) {
        c[x] = 0;
        for (let y = 0; y < 15; y++) {
            c[x] += m[y][x];
        }
    }
    console.log('Soma dos valores de cada coluna:');
    console.table(c);
}

// Exercício 26
// Em matemática, o produto de duas matrizes é definido somente quando o número de colunas
// da primeira matriz é igual ao número de linhas da segunda matriz.
// Se A é uma matriz m×n e B é uma matriz n×p, então seu produto é uma matriz definida como AB (ou por A · B).
// O elemento de cada entrada da matriz AB (o qual denotaremos por ABij) é dado pelo produto da 
// i-ésima linha de A com a j-ésima coluna de B
// https://pt.wikipedia.org/wiki/Produto_de_matrizes
function processarProdutoMatrizes() {
    console.log('Insira os valores da matriz A:');
    const a = lerMatrizNumeros(3, 5);

    console.log('Insira os valores da matriz B:');
    const b = lerMatrizNumeros(5, 3);

    const p = [];
    for (let i = 0; i < 3; i++) {
        p[i] = [];
        for (let j = 0; j < 3; j++) {
            p[i][j] = 0;
            for (let k = 0; k < 5; k++) {
                p[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    console.log('Valores da matriz P (A . B):');
    console.table(p);
}

// Exercício 27
function processarMatrizVetorMultiplicacao() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(6, 6);
    const a = lerNumeroValido('Insira um valor: ');
    const v = [];

    let i = 0;
    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {
            v[i] = m[y][x] * a;
            i++;
        }
    }

    console.log('Valores no vetor V:');
    console.table(v);
}

// Exercício 28
function processarMatrizSomaSuperiorInferiorDiagonal() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(10, 10);

    let somaSuperior = 0;
    let somaInferior = 0;

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (x > y) {
                somaSuperior += m[y][x];
            } else if (x > y) {
                somaInferior += m[y][x];
            }
        }
    }

    console.log('Soma dos elementos acima da diagonal principal: ' + somaSuperior);
    console.log('Soma dos elementos abaixo da diagonal principal: ' + somaInferior);
}

// Exercício 29
function processarMatriz5x5() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(5, 5);

    let somaLinha4 = 0;
    let somaColuna2 = 0;
    let somaDiagonal = 0;
    let somaTotal = 0;

    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (y == 3) {
                somaLinha4 += m[y][x];
            }
            if (x == 1) {
                somaColuna2 += m[y][x];
            }
            if (x == y) {
                somaDiagonal += m[y][x];
            }
            somaTotal += m[y][x];
        }
    }

    console.log('Soma dos elementos da linha 4: ' + somaLinha4);
    console.log('Soma dos elementos da coluna 2: ' + somaColuna2);
    console.log('Soma dos elementos da diagonal principal: ' + somaDiagonal);
    console.log('Soma de todos os elementos: ' + somaTotal);
}

// Exercício 30
function processarVetoresMatriz5x5() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(5, 5);

    const sl = [];
    const sc = [];

    for (let y = 0; y < 5; y++) {
        sl[y] = 0;
        sc[y] = 0;
        for (let x = 0; x < 5; x++) {
            sl[y] += m[y][x];
            sc[y] += m[x][y];
        }
    }

    console.log('Matriz criada:');
    console.table(m);

    console.log('Soma das linhas:');
    console.table(sl);

    console.log('Soma das colunas:');
    console.table(sc);
}

// Exercício 31
function processarMatriz30x30() {
    const a = Math.floor(lerNumeroValido('Insira um número inteiro: '));

    console.log('Insira os valores da matriz:');
    const v = lerMatrizNumeros(30, 30);

    let numValoresIguais = 0;
    for (let y = 0; y < 30; y++) {
        for (let x = 0; x < 30; x++) {
            if (v[y][x] == a) {
                numValoresIguais++;
            }
        }
    }

    const x = [];
    for (let i = 0; i < 30; i++) {
        x[i] = [];
        for (let j = 0; j < 30; j++) {
            if (v[i][j] != a) {
                x[i][j] = v[i][j];
            }
        }
    }

    console.log('Matriz V:');
    console.table(a);

    console.log('Número de valores iguais a A: ' + numValoresIguais);
    
    console.log('Matriz X:');
    console.table(x);
}

// Exercício 32
function processarDivisaoMatrizPorMaiorElemento() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(12, 13);

    console.log('Matriz lida:');
    console.table(m);

    const maioresElementos = [];
    for (let y = 0; y < 12; y++) {
        maioresElementos[y] = -Infinity;

        for (let x = 0; x < 13; x++) {
            if (m[y][x] > maioresElementos[y]) {  // maior elemento em módulo daquela linha??
                maioresElementos[y] = m[y][x];
            }
        }
    }

    for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 13; x++) {
            m[y][x] = (m[y][x] / maioresElementos[y]).toFixed(6);
        }
    }
    
    console.log('Matriz modificada:');
    console.table(m);
}

// Exercício 33
function processarMultiplicacaoDiagonaisMatriz() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(3, 3);

    console.log('Matriz lida:');
    console.table(m);

    const mediaDiagonalSecundaria = (m[0][2] + m[1][1] + m[2][0]) / 3;
    m[0][0] *= mediaDiagonalSecundaria;
    m[1][1] *= mediaDiagonalSecundaria;
    m[2][2] *= mediaDiagonalSecundaria;

    console.log('Matriz modificada:');
    console.table(m);
}

// Exercício 34
function processarMultiplicacaoLinhaDiagonalPrincipalMatriz() {
    console.log('Insira os valores da matriz:');
    const m = lerMatrizNumeros(50, 50);

    for (let y = 0; y < 50; y++) {
        const elementoDiagonalPrincipal = m[y][y];
        for (let x = 0; x < 50; x++) {
            m[y][x] *= elementoDiagonalPrincipal;
        }
    }

    console.log('Matriz modificada:');
    console.table(m);
}

// Exercício 35
function processarDoisVetoresParOuImpar() {
    console.log('Insira 30 valores:');

    const vetorPares = [];
    const vetorImpares = [];

    let numInseridos = 0;
    while (numInseridos < 30) {
        const num = lerNumeroValido('Insira um valor: ');

        if (num % 2 == 0) {
            vetorPares.push(num);
            if (vetorPares.length == 5) {
                console.log('Vetor de números pares cheio:');
                console.table(vetorPares);
                vetorPares.length = 0;
            }
        } else {
            vetorImpares.push(num);
            if (vetorImpares.length == 5) {
                console.log('Vetor de números ímpares cheio:');
                console.table(vetorImpares);
                vetorImpares.length = 0;
            }
        }

        numInseridos++;
    }

    console.log('Vetor de números pares:');
    console.table(vetorPares);

    console.log('Vetor de números ímpares:');
    console.table(vetorImpares);
}

// Exercício 36
function lerRespostasLoteriaEsportiva(pergunta) {
    const QUANTIDADE_RESPOSTAS = 13;
    const respostas = [];

    console.log(pergunta);
    
    for (let i = 0; i < QUANTIDADE_RESPOSTAS; i++) {
        let resposta = null;
        while (resposta == null) {
            const respostaLida = Math.floor(lerNumeroValido('Jogo ' + (i + 1) + ': '));
            if (respostaLida < 0 || respostaLida > 2) {
                console.log('Valor inválido. Insira 0 para empate, 1 para aposta no time 1 e 2 para aposta no time 2.');
            } else {
                resposta = respostaLida;
            }
        }
        respostas.push(resposta);
    }
    return respostas;
}

function lerDadosApostaLoteriaEsportiva() {
    let numCartao = null;
    while (numCartao == null) {
        const numLido = Math.floor(lerNumeroValido('Número do cartão: '));
        if (numLido < 0) {
            console.log('Valor inválido.');
        } else {
            numCartao = numLido;
        }
    }
    return {
        numCartao,
        respostas: lerRespostasLoteriaEsportiva('Insira os dados da aposta:')
    };
}

function mostrarResultadoApostaLoteriaEsportiva(gabarito, aposta) {
    let acertos = 0;
    for (let i = 0; i < gabarito.length; i++) {
        if (aposta.respostas[i] == gabarito[i]) {
            acertos++;
        }
    }
    console.log('Cartão ' + aposta.numCartao + ': ' + acertos + ' acertos.' + 
                (acertos == gabarito.length ? ' Parabéns, tu foi o GANHADOR.' : ''));
}

function processarLoteriaEsportiva() {
    const QUANTIDADE_APOSTADORES = 100;

    const gabarito = lerRespostasLoteriaEsportiva('Insira os dados do gabarito:');
    const apostas = [];

    for (let i = 0; i < QUANTIDADE_APOSTADORES; i++) {
        console.log('Insira os dados do apostador:');
        apostas.push(lerDadosApostaLoteriaEsportiva());
    }

    apostas.forEach((a) => {
        mostrarResultadoApostaLoteriaEsportiva(gabarito, a);
    });
}

// Exercício 37
function lerRespostasProva(pergunta) {
    const QUANTIDADE_RESPOSTAS = 20;
    const respostas = [];

    console.log(pergunta);
    
    for (let i = 0; i < QUANTIDADE_RESPOSTAS; i++) {
        let resposta = null;
        while (resposta == null) {
            const respostaLida = lerString('Pergunta ' + (i + 1) + ': ').toUpperCase();
            if (respostaLida.length == 0) {
                console.log('Resposta inválida.');
            } else {
                resposta = respostaLida.charAt(0);
            }
        }
        respostas.push(resposta);
    }
    return respostas;
}

function mostrarResultadoProva(gabarito, respostasAluno) {
    const MEDIA = 12;

    let acertos = 0;
    for (let i = 0; i < gabarito.length; i++) {
        if (respostasAluno[i] == gabarito[i]) {
            acertos++;
        }
    }
    console.log('Você acertou ' + acertos + ' questões. ' + 
                (acertos >= MEDIA ? 'APROVADO' : 'REPROVADO'));
}

function processarProvas() {
    const QUANTIDADE_ALUNOS = 50;

    const g = lerRespostasProva('Insira o gabarito da prova:');

    for (let i = 0; i < QUANTIDADE_ALUNOS; i++) {
        const r = lerRespostasProva('Insira as respostas do aluno:');
        mostrarResultadoProva(g, r);
    }
}

// Exercício 38
function somarElementosVetor(vetor) {
    const soma = vetor.reduce((p, e) => p + e, 0);
    console.log('Soma dos elementos do vetor: ' + soma);
}

function multiplicarElementosVetor(vetor) {
    const produto = vetor.reduce((p, e) => p * e, 1);
    console.log('Produto dos elementos do vetor: ' + produto);
}

function calcularMediaElementosVetor(vetor) {
    const soma = vetor.reduce((p, e) => p + e, 0);
    const media = soma / vetor.length;
    console.log('Média dos elementos do vetor: ' + media);
}

function ordernarElementosVetor(vetor) {
    vetor.sort((a, b) => a - b);
    console.log('Vetor ordenado em ordem crescente.');
}

function mostrarElementosVetor(vetor) {
    console.table(vetor);
}

function processarOperacoesVetor() {
    console.log('Insira os valores no vetor:');
    const vetor = lerNumeros(6);

    const operacoes = [
        {titulo: 'Soma dos elementos', metodo: somarElementosVetor.bind(this, vetor)},
        {titulo: 'Produto dos elementos', metodo: multiplicarElementosVetor.bind(this, vetor)},
        {titulo: 'Média dos elementos', metodo: calcularMediaElementosVetor.bind(this, vetor)},
        {titulo: 'Ordenar elementos em ordem crescente', metodo: ordernarElementosVetor.bind(this, vetor)},
        {titulo: 'Mostrar elementos do vetor', metodo: mostrarElementosVetor.bind(this, vetor)},
    ];

    console.log('Operações disponíveis:');
    operacoes.forEach((o, i) => {
        console.log(' ' + (i + 1) + ' - ' + o.titulo);
    });
    console.log('Insira uma opção inválida para sair.');

    let operacao;
    do {
        operacao = operacoes[Math.floor(Number(lerString('Qual operação você quer realizar? '))) - 1];
        if (operacao) {
            operacao.metodo();
        }
    } while (operacao)
}

// Exercício 39
function processarCompactacaoVetor() {
    const QUANTIDADE_ELEMENTOS = 100;
    let vetor = [];

    for (let i = 0; i < QUANTIDADE_ELEMENTOS; i++) {
        vetor.push(lerString('Insira um valor: ').replace(',', '.'));
    }
    vetor = vetor.filter((e) => !isNaN(e) && e != '' && e >= 0);

    console.log('Vetor compactado:');
    console.table(vetor);
}

// Exercício 40
function lerRespostasLoto(pergunta) {
    const QUANTIDADE_RESPOSTAS = 5;
    const respostas = [];

    console.log(pergunta);
    
    for (let i = 0; i < QUANTIDADE_RESPOSTAS; i++) {
        let resposta = null;
        while (resposta == null) {
            const respostaLida = Math.floor(lerNumeroValido('Insira um valor: '));
            if (respostaLida < 1 || respostaLida > 99) {
                console.log('Valor inválido. Insira um número entre 1 e 99.');
            } else {
                resposta = respostaLida;
            }
        }
        respostas.push(resposta);
    }
    return respostas.sort();
}

function mostrarResultadoApostaLoto(gabarito, aposta) {
    let acertos = 0;
    for (let i = 0; i < gabarito.length; i++) {
        if (aposta[i] == gabarito[i]) {
            acertos++;
        }
    }
    if (acertos == gabarito.length) {
        console.log('Ganhador');
    }
}

function processarLoto() {
    const QUANTIDADE_APOSTADORES = 50;

    const gabarito = lerRespostasLoto('Insira o resultado oficial da Loto:');

    for (let i = 0; i < QUANTIDADE_APOSTADORES; i++) {
        const aposta = lerRespostasLoto('Insira uma das apostas:');
        mostrarResultadoApostaLoto(gabarito, aposta);
    }
}

// Exercício 41
function processarObjetoPessoa() {
    const pessoa = {
        nome: lerString('Insira o nome: '),
        idade: Math.floor(lerNumeroValido('Insira a idade: '))
    };
    console.log('Idade: ' + pessoa.idade + ' anos.');

    pessoa.email = lerString('Insira o e-mail: ');

    console.log('Pessoa:', pessoa);
}

// Exercício 42
function processarObjetoDados() {
    const dados = {
        arrVazia: [],
        str: 'Esse objeto possui strings, números e arrays.',
        qtdPropriedades: 5,
        arrComItens: [1, 2, 3, 4, 5],
        pi: 3.1415
    };

    const retorno = {};

    for (let p in dados) {
        if (Array.isArray(dados[p])) {
            retorno[p] = dados[p];
        }
    }

    console.log('dados:', dados);
    console.log('retorno:', retorno);

    return retorno;
}

// Exercício 43
function combinarObjetos(obj1, obj2) {
    const obj3 = {};
    for (let p in obj1) {
        obj3[p] = obj1[p];
    }
    for (let p in obj2) {
        obj3[p] = obj2[p];
    }
    return obj3;
}

function processarCombinacaoObjetos() {
    const obj1 = {
        a: 1,
        b: 2,
        obj: 'obj1'
    };
    const obj2 = {
        c: 3,
        d: 4,
        obj: 'obj2'
    };
    const obj3 = combinarObjetos(obj1, obj2);
    console.log('obj1', obj1);
    console.log('obj2', obj2);
    console.log('obj3', obj3);
}

// Exercício 44
function contarPropriedadesString(obj) {
    let quantidade = 0;
    for (let p in obj) {
        if (typeof obj[p] == 'string' || obj[p] instanceof String) {
            quantidade++;
        }
    }
    return quantidade;
}

function processarContagemPropriedadesStrings() {
    const obj = {
        a: 1,
        b: 'a',
        c: 2.5,
        d: 'b',
        e: new String('string')
    };
    console.log('obj: ', obj);
    console.log('Quantidade de strings no objeto: ' + contarPropriedadesString(obj));
}

// Exercício 45
function contarStringsArray(arr) {
    const retorno = {};
    arr.forEach((e) => {
        retorno[e] = (retorno[e] || 0) + 1;
    });
    return retorno;    
}

function processarContagemStringsArray() {
    console.log('Insira strings no array. Deixe em branco para realizar a contagem a encerrar.');

    const arr = [];
    let string;

    do {
        string = lerString('Insira uma string: ');
        if (string != '') {
            arr.push(string);
        }
    } while (string != '');

    const contagem = contarStringsArray(arr);

    console.log('Resultado:');
    console.table(contagem);
}

// Exercício 46
function contarVendasPorVendedor(vendas) {
    const contagem = {};
    vendas.forEach((v) => {
        contagem[v.vendedor] = (contagem[v.vendedor] || 0) + v.valor;
    });
    return contagem;
}

function lerDadosVenda() {
    return {
        vendedor: lerString('Insira o nome do vendedor: ').toUpperCase(),
        valor: lerNumeroValido('Insira o valor da venda: ')
    };
}

function processarVendasPorVendedor() {
    console.log('Insira os dados das vendas realizadas: ');

    const vendas = [];
    do {
        vendas.push(lerDadosVenda());
    } while (lerString('Continuar inserindo? (S/N) ').toUpperCase() == 'S');

    const contagem = contarVendasPorVendedor(vendas);

    console.log('Total de vendas por vendedor:');
    for (let v in contagem) {
        console.log(v + ': R$' + contagem[v].toFixed(2));
    }
}

// Exercício 47
function modificarPropriedades(obj, fnModificadora) {
    const retorno = {};
    for (let p in obj) {
        retorno[p] = fnModificadora(obj[p]);
    }
    return retorno;
}

function multiplicarPor10(v) {
    return v * 10;
}

function processarModificacaoPropriedades() {
    const obj = {
        a: 1,
        b: 2,
        c: 3
    };
    const objModificado = modificarPropriedades(obj, multiplicarPor10);

    console.log('obj:', obj);
    console.log('objModificado:', objModificado);
}

// Exercício 48
function combinarInventarios(inventarioLojaA, inventarioLojaB) {
    const inventario = {};

    for (let p in inventarioLojaA) {
        inventario[p.trim().toUpperCase()] = inventarioLojaA[p];
    }
    for (let p in inventarioLojaB) {
        const produto = p.trim().toUpperCase();
        inventario[produto] = (inventario[produto] || 0) + inventarioLojaB[p];
    }
    return inventario;
}

function processarInventarios() {
    const inventarioLojaA = {
        'arroz': 10,
        'Feijão': 5,
        'BATATA': 3
    };
    const inventarioLojaB = {
        'ARROZ': 5,
        'feijão': 3,
        'Cenoura': 10,
        'chocolate': 80
    };
    const inventarioCombinado = combinarInventarios(inventarioLojaA, inventarioLojaB);

    console.log('inventarioLojaA:', inventarioLojaA);
    console.log('inventarioLojaB:', inventarioLojaB);
    console.log('inventarioCombinado:', inventarioCombinado);
}

// Exercício 49
function organizarTransacoesPorCategoria(transacoes) {
    const transacoesPorCategoria = {};

    transacoes.forEach((t) => {
        const categoria = t.categoria.trim().toUpperCase();

        if (!transacoesPorCategoria[categoria]) {
            transacoesPorCategoria[categoria] = {
                transacoes: [],
                subtotal: 0
            };
        }
        transacoesPorCategoria[categoria].transacoes.push(t);
        transacoesPorCategoria[categoria].subtotal += t.valor;
    });

    return transacoesPorCategoria;
}

function processarTransacoes() {
    const transacoes = [
        {
            id: 0,
            valor: 350,
            data: '06/05/2024',
            categoria: 'MERCADO'
        },
        {
            id: 1,
            valor: 100,
            data: '06/05/2024',
            categoria: 'contas'
        },
        {
            id: 2,
            valor: 150,
            data: '06/05/2024',
            categoria: 'Contas'
        },
        {
            id: 3,
            valor: 450,
            data: '06/05/2024',
            categoria: 'mercado'
        },
        {
            id: 4,
            valor: 1200,
            data: '06/05/2024',
            categoria: 'serviços'
        },
        {
            id: 5,
            valor: 20,
            data: '06/05/2024',
            categoria: 'AMIGOS'
        }
    ];

    const transacoesPorCategoria = organizarTransacoesPorCategoria(transacoes);
    
    console.log('transacoes:', transacoes);
    console.log('transacoesPorCategoria: ' + JSON.stringify(transacoesPorCategoria, undefined, 2));
}

// Exercício 50
class HotelError extends Error {
    constructor(message, options) {
      super(message, options);
    }
}

class Hotel {
    #id;
    #nome;
    #cidade;
    #quartosTotais;
    #quartosDisponiveis;
    #avaliacoes;

    constructor(nome, cidade, quartosTotais, json = null) {
        if (json) {
            this.#id = json.id;
            this.#nome = json.nome;
            this.#cidade = json.cidade;
            this.#quartosTotais = json.quartosTotais;
            this.#quartosDisponiveis = json.quartosDisponiveis;
            this.#avaliacoes = json.avaliacoes;
            return;
        }

        this.#id = Math.random().toString(26).slice(2).toUpperCase().padStart(13, '0');
        this.#quartosTotais = 0;
        this.#quartosDisponiveis = 0;
        this.#avaliacoes = [];

        this.nome = nome;
        this.cidade = cidade;
        this.quartosTotais = quartosTotais;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        nome = (typeof nome == 'string' || nome instanceof String) ? nome.trim().toUpperCase() : '';
        if (nome.length < 2) {
            throw new HotelError('Nome do hotel deve possuir pelo menos 2 caracteres.');
        }
        this.#nome = nome;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(cidade) {
        cidade = (typeof cidade == 'string' || cidade instanceof String) ? cidade.trim().toUpperCase() : '';
        if (cidade.length < 2) {
            throw new HotelError('Nome da cidade deve possuir pelo menos 2 caracteres.');
        }
        this.#cidade = cidade;
    }

    get quartosTotais() {
        return this.#quartosTotais
    }

    set quartosTotais(qtd) {
        qtd = Number(qtd);
        if (isNaN(qtd) || qtd < 0) {
            throw new HotelError('Quantidade de quartos inválida.');
        }

        const diferencaQuartos = this.quartosTotais - qtd;

        if (diferencaQuartos > this.#quartosDisponiveis) {
            throw new HotelError('Não é possível reduzir a quantidade de quartos, pois resultaria em um hotel a cima de sua capacidade de operação.');
        }

        this.#quartosTotais = qtd;
        this.#quartosDisponiveis -= diferencaQuartos;
    }

    get quartosDisponiveis() {
        return this.#quartosDisponiveis;
    }

    get avaliacoes() {
        const avaliacoes = [];
        this.#avaliacoes.forEach((a) => {
            avaliacoes.push({
                nomeCliente: a.nomeCliente,
                nota: a.nota,
                comentario: a.comentario
            });
        });
        return avaliacoes;
    }

    reservarQuarto() {
        if (this.#quartosDisponiveis <= 0) {
            throw new HotelError('Não há quartos disponíveis neste hotel.');
        }
        this.#quartosDisponiveis--;
    }

    liberarQuarto() {
        if (this.#quartosDisponiveis >= this.#quartosTotais) {
            throw new HotelError('Não há nenhum quarto a ser liberado.');
        }
        this.#quartosDisponiveis++;
    }

    avaliar(nomeCliente, nota, comentario) {
        nomeCliente = (typeof nomeCliente == 'string' || nomeCliente instanceof String) ? nomeCliente.trim().toUpperCase() : '';
        nota = Math.floor(nota);
        comentario = comentario || '';
        
        if (nomeCliente.length < 2) {
            throw new HotelError('Nome do cliente deve possuir pelo menos 2 caracteres.');
        }
        if (isNaN(nota) || nota < 0 || nota > 5) {
            throw new HotelError('Nota deve ser um número entre 0 e 5.');
        }
        this.#avaliacoes.push({nomeCliente, nota, comentario});
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cidade: this.#cidade,
            quartosTotais: this.#quartosTotais,
            quartosDisponiveis: this.#quartosDisponiveis,
            avaliacoes: this.#avaliacoes
        };
    }
}

class Reserva {
    #idReserva;
    #idHotel;
    #nomeCliente;
    #situacao;

    static SITUACAO = {
        RESERVADO: 0,
        CHECK_IN:  1,
        CHECK_OUT: 2,
        CANCELADO: 3        
    };

    constructor(hotel, nomeCliente, json = null) {
        if (json) {
            this.#idReserva = json.idReserva;
            this.#idHotel = json.idHotel;
            this.#nomeCliente = json.nomeCliente;
            this.#situacao = json.situacao;
            return;
        }

        nomeCliente = (typeof nomeCliente == 'string' || nomeCliente instanceof String) ? nomeCliente.trim().toUpperCase() : '';
        if (nomeCliente.length < 2) {
            throw new HotelError('Nome do cliente deve possuir pelo menos 2 caracteres.');
        }

        if (hotel instanceof Hotel) {
            this.#idHotel = hotel.id;
        } else if (typeof nome == 'string' || nome instanceof String) {
            hotel = hotel.trim();
            if (hotel.length == 0) {
                throw new HotelError('ID do hotel inválido.');
            }
            this.#idHotel = hotel;
        } else {
            throw new HotelError('ID do hotel inválido.');
        }

        this.#idReserva = Math.random().toString(26).slice(2).toUpperCase().padStart(13, '0');
        this.#nomeCliente = nomeCliente;
        this.#situacao = Reserva.SITUACAO.RESERVADO;
    }

    get idReserva() {
        return this.#idReserva;
    }

    get idHotel() {
        return this.#idHotel;
    }

    get nomeCliente() {
        return this.#nomeCliente;
    }

    get codigoSituacao() {
        return this.#situacao;
    }

    get situacao() {
        for (let s in Reserva.SITUACAO) {
            if (Reserva.SITUACAO[s] == this.#situacao) {
                return s.replace('_', '-');
            }
        }
        return 'INVÁLIDA';
    }

    cancelar() {
        if (this.#situacao != Reserva.SITUACAO.RESERVADO) {
            throw new HotelError('Não é possível cancelar uma reserva com a situação ' + this.situacao + '.');
        }
        this.#situacao = Reserva.SITUACAO.CANCELADO;
    }

    checkIn() {
        if (this.#situacao != Reserva.SITUACAO.RESERVADO) {
            throw new HotelError('Não é possível fazer check-in em uma reserva com a situação ' + this.situacao + '.');
        }
        this.#situacao = Reserva.SITUACAO.CHECK_IN;
    }

    checkOut() {
        if (this.#situacao != Reserva.SITUACAO.CHECK_IN) {
            throw new HotelError('Não é possível fazer check-out em uma reserva com a situação ' + this.situacao + '.');
        }
        this.#situacao = Reserva.SITUACAO.CHECK_OUT;
    }

    toJSON() {
        return {
            idReserva: this.#idReserva,
            idHotel: this.#idHotel,
            nomeCliente: this.#nomeCliente,
            situacao: this.#situacao
        };
    }
}

class SistemaReservaHoteis {
    #hoteis;
    #reservas;

    #acaoAtual;
    #proximaAcao;
    #historicoAcoes;

    #tipoFiltroListagemHoteis;
    #filtroListagemHoteis;
    #tipoFiltroListagemReservas;
    #filtroListagemReservas;

    #hotelSelecionado;
    #reservaSelecionada;

    static ACAO = {
        MENU_INICIAL: 0,
        ADICIONAR_HOTEL: 1,
        BUSCAR_HOTEIS: 2,
        LISTAGEM_HOTEIS: 3,
        HOTEL_SELECIONADO: 4,
        DETALHAR_HOTEL: 5,
        ALTERAR_NOME_HOTEL: 6,
        ALTERAR_CAPACIDADE_HOTEL: 7,
        FAZER_RESERVA: 8,
        BUSCAR_RESERVAS: 9,
        LISTAGEM_RESERVAS: 10,
        RESERVA_SELECIONADA: 11,
        CANCELAR_RESERVA: 12,
        CHECK_IN: 13,
        CHECK_OUT: 14,
        AVALIAR_HOTEL: 15,
        SAIR: 16
    };

    static TIPO_FILTRO_LISTAGEM = {
        SEM_FILTRO: 0,
        POR_ID: 1,
        POR_CIDADE: 2,
        POR_NOME_HOTEL: 3,
        POR_HOTEL: 4,
        POR_NOME_CLIENTE: 5
    };

    constructor() {
        this.#hoteis = [];
        this.#reservas = [];

        this.#lerArquivo();
    }

    adicionarHotel() {
        try {
            const nome = lerString(' Nome do hotel: ');
            const cidade = lerString(' Cidade: ');
            const quartos = lerNumeroValido(' Quantidade de quartos: ');

            const hotel = new Hotel(nome, cidade, quartos);

            if (lerString('Confirma o cadastro? (S/N) ').toUpperCase().charAt(0) == 'S') {
                this.#hoteis.push(hotel);
                console.log('Hotel cadastrado com sucesso.');

                return hotel;
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
        return null;
    }

    listarHoteis(tipoFiltro, filtro) {
        const hoteisFiltrados = [];
        this.#hoteis.forEach((h) => {
            if (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.SEM_FILTRO ||
               (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_NOME_HOTEL && 
               (h.nome.includes(filtro) || filtro.includes(h.nome))) ||
               (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_CIDADE && 
               (h.cidade.includes(filtro) || filtro.includes(h.nome))))
            {
                hoteisFiltrados.push(h);
            }
        });
        hoteisFiltrados.sort((a, b) => b.quartosDisponiveis - a.quartosDisponiveis);
        return hoteisFiltrados;
    }

    obterHotelPorId(id) {
        for (let i = 0; i < this.#hoteis.length; i++) {
            if (this.#hoteis[i].id == id) {
                return this.#hoteis[i];
            }
        }
        return null;
    }

    alterarNomeHotel(hotel) {
        try {
            const nome = lerString(' Novo nome do hotel: ');

            if (lerString('Confirma a alteração? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(hotel instanceof Hotel)) {
                    hotel = this.obterHotelPorId(hotel);
                }
                console.log('');
                hotel.nome = nome;

                console.log('Nome do hotel alterado com sucesso.');
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
    }

    alterarCapacidadeHotel(hotel) {
        try {
            const capacidade = lerNumeroValido(' Nova capacidade do hotel: ');

            if (lerString('Confirma a alteração? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(hotel instanceof Hotel)) {
                    hotel = this.obterHotelPorId(hotel);
                }
                console.log('');
                hotel.quartosTotais = capacidade;

                console.log('Capacidade do hotel alterada com sucesso.');
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
    }

    fazerReserva(hotel) {
        try {
            const nomeCliente = lerString(' Nome do cliente: ');
            const reserva = new Reserva(hotel, nomeCliente);

            if (lerString('Confirma o cadastro? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(hotel instanceof Hotel)) {
                    hotel = this.obterHotelPorId(hotel);
                }
                console.log('');
                hotel.reservarQuarto();

                this.#reservas.push(reserva);
                console.log('\ID da reserva: ' + reserva.idReserva);
                console.log('Reserva cadastrada com sucesso.');

                return reserva;
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
        return null;
    }

    listarReservas(tipoFiltro, filtro) {
        const reservasFiltradas = [];
        this.#reservas.forEach((r) => {
            if (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.SEM_FILTRO ||
               (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL && 
                r.idHotel == filtro) ||
               (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_ID && 
                r.idReserva == filtro) ||
               (tipoFiltro == SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_NOME_CLIENTE && 
               (r.nomeCliente.includes(filtro) || filtro.includes(r.nomeCliente))))
            {
                reservasFiltradas.push(r);
            }
        });
        reservasFiltradas.sort((a, b) => a.codigoSituacao - b.codigoSituacao);
        return reservasFiltradas;
    }

    obterReservaPorId(id) {
        for (let i = 0; i < this.#reservas.length; i++) {
            if (this.#reservas[i].idReserva == id) {
                return this.#reservas[i];
            }
        }
        return null;
    }

    cancelarReserva(reserva) {
        try {
            if (lerString('Confirma o cancelamento? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(reserva instanceof Reserva)) {
                    reserva = this.obterReservaPorId(reserva);
                }
                const hotel = this.obterHotelPorId(reserva.idHotel);

                reserva.cancelar();
                hotel.liberarQuarto();
                
                console.log('Reserva cancelada com sucesso.');
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
    }

    checkIn(reserva) {
        try {
            if (lerString('Confirma o check-in? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(reserva instanceof Reserva)) {
                    reserva = this.obterReservaPorId(reserva);
                }

                reserva.checkIn();
                console.log('Check-in realizado com sucesso.');
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
    }

    checkOut(reserva) {
        try {
            if (lerString('Confirma o check-out? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(reserva instanceof Reserva)) {
                    reserva = this.obterReservaPorId(reserva);
                }
                const hotel = this.obterHotelPorId(reserva.idHotel);

                reserva.checkOut();
                hotel.liberarQuarto();
                console.log('Check-out realizado com sucesso.');
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
    }

    avaliarHotel(reserva) {
        try {
            const nota = lerNumeroValido(' Nota: (0-5) ');
            const comentario = lerString(' Comentário: (opcional) ');

            if (lerString('Confirma a avaliação? (S/N) ').toUpperCase().charAt(0) == 'S') {
                if (!(reserva instanceof Reserva)) {
                    reserva = this.obterReservaPorId(reserva);
                }
                const hotel = this.obterHotelPorId(reserva.idHotel);
                hotel.avaliar(reserva.nomeCliente, nota, comentario);

                console.log('Avaliação registrada com sucesso.');
            }
        } catch (ex) {
            if (ex instanceof HotelError) {
                console.log(ex.message);
            } else {
                throw ex;
            }
        }
    }

    renderizerInterface() {
        this.#acaoAtual = SistemaReservaHoteis.ACAO.MENU_INICIAL;
        this.#historicoAcoes = [];

        while (this.#acaoAtual != SistemaReservaHoteis.ACAO.SAIR) {
            this.#renderizarAcaoAtual();
        }

        this.#salvarArquivo();
    }

    #renderizarAcaoAtual() {
        console.clear();
        console.log('SISTEMA DE RESERVA DE HOTÉIS\n');

        const acoesDisponiveis = [];

        switch (this.#acaoAtual) {
            case SistemaReservaHoteis.ACAO.MENU_INICIAL:
                console.log('MENU INICIAL');
                acoesDisponiveis.push({nome: 'ADICIONAR HOTEL', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.ADICIONAR_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'BUSCAR HOTÉIS', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_HOTEIS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.HOTEL_SELECIONADO;
                }});
                acoesDisponiveis.push({nome: 'FAZER RESERVA', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_HOTEIS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.FAZER_RESERVA;
                }});
                acoesDisponiveis.push({nome: 'BUSCAR RESERVAS', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_RESERVAS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.RESERVA_SELECIONADA;
                }});
                acoesDisponiveis.push({nome: 'CHECK-IN', metodo: () => {
                    if (lerString('Cliente possui reserva? (S/N) ').toUpperCase().charAt(0) == 'S') {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_RESERVAS;
                    } else {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_HOTEIS;
                    }
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.CHECK_IN;
                }});
                acoesDisponiveis.push({nome: 'CHECK-OUT', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_RESERVAS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.CHECK_OUT;
                }});
                acoesDisponiveis.push({nome: 'SAIR', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.SAIR;
                }});
                break;

            case SistemaReservaHoteis.ACAO.ADICIONAR_HOTEL:
                console.log('ADICIONAR HOTEL');
                this.adicionarHotel();   
                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'ADICIONAR OUTRO HOTEL', metodo: () => {}});
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.BUSCAR_HOTEIS:
                if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_IN) {
                    console.log('BUSCAR HOTEL PARA CHECK-IN');
                } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS) {
                    console.log('BUSCAR HOTEL PARA LISTAR RESERVAS');
                } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.FAZER_RESERVA) {
                    console.log('BUSCAR HOTEL PARA FAZER RESERVA');
                } else {
                    console.log('BUSCAR HOTÉIS');
                }
                acoesDisponiveis.push({nome: 'LISTAR TODOS HOTÉIS', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_HOTEIS;
                    this.#tipoFiltroListagemHoteis = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.SEM_FILTRO;
                }});
                acoesDisponiveis.push({nome: 'BUSCAR POR CIDADE', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_HOTEIS;
                    this.#tipoFiltroListagemHoteis = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_CIDADE;
                    this.#filtroListagemHoteis = lerString('Cidade: ').toUpperCase();
                }});
                acoesDisponiveis.push({nome: 'BUSCAR POR NOME', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_HOTEIS;
                    this.#tipoFiltroListagemHoteis = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_NOME_HOTEL;
                    this.#filtroListagemHoteis = lerString('Nome do hotel: ').toUpperCase();
                }});
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.LISTAGEM_HOTEIS:
                const hoteis = this.listarHoteis(this.#tipoFiltroListagemHoteis, this.#filtroListagemHoteis);
                if (hoteis.length == 0) {
                    console.log('Nenhum hotel encontrado.')
                } else {
                    if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_IN) {
                        console.log('SELECIONE UM HOTEL PARA CHECK-IN\n');
                    } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS) {
                        console.log('SELECIONE UM HOTEL PARA LISTAR RESERVAS\n');
                    } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.FAZER_RESERVA) {
                        console.log('SELECIONE UM HOTEL PARA FAZER RESERVA\n');
                    } else {
                        console.log('SELECIONE UM HOTEL\n');
                    }
                    console.log('Nome do Hotel'.padStart(25, ' ').padEnd(40, ' ') + 'Cidade        Quartos Disponíveis');

                    hoteis.forEach((h) => {
                        const nome = h.nome.padEnd(29, ' ') + 
                                     h.cidade.padEnd(20, ' ') +
                                    (h.quartosDisponiveis.toString().padStart(4, ' ') + ' /' + h.quartosTotais.toString().padStart(4, ' ')).padStart(14, ' ')
                        acoesDisponiveis.push({nome, metodo: () => {
                            this.#hotelSelecionado = h;
                            if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_IN) {
                                this.#acaoAtual = SistemaReservaHoteis.ACAO.FAZER_RESERVA;
                            } else {
                                this.#acaoAtual = this.#proximaAcao;
                                if (this.#historicoAcoes.length > 1 && this.#historicoAcoes[this.#historicoAcoes.length - 2].proxima) {
                                    this.#proximaAcao = this.#historicoAcoes[this.#historicoAcoes.length - 2].proxima;
                                }
                            }
                            this.#filtroListagemReservas = this.#hotelSelecionado.id;
                        }});
                    });
                }
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.HOTEL_SELECIONADO:
                console.log(this.#hotelSelecionado.nome);
                console.log(' Cidade: ' + this.#hotelSelecionado.cidade);
                console.log(' Quantidade de quartos: ' + this.#hotelSelecionado.quartosTotais);
                console.log(' Quartos disponíveis: ' + this.#hotelSelecionado.quartosDisponiveis);
                console.log('\nAções disponíveis:');

                acoesDisponiveis.push({nome: 'MAIS DETALHES', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.DETALHAR_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'ALTERAR NOME DO HOTEL', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.ALTERAR_NOME_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'ALTERAR CAPACIDADE DO HOTEL', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.ALTERAR_CAPACIDADE_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'FAZER RESERVA', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.FAZER_RESERVA;
                }});
                acoesDisponiveis.push({nome: 'CANCELAR RESERVA', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.CANCELAR_RESERVA;
                    this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'LISTAR RESERVAS', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.RESERVA_SELECIONADA;
                    this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'CHECK-IN', metodo: () => {
                    if (lerString('Cliente possui reserva? (S/N) ').toUpperCase().charAt(0) == 'S') {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                        this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL;
                    } else {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.FAZER_RESERVA;
                    }
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.CHECK_IN;
                }});
                acoesDisponiveis.push({nome: 'CHECK-OUT', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                    this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.CHECK_OUT;
                }});
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.DETALHAR_HOTEL:
                console.log('MAIS DETALHES - ' + this.#hotelSelecionado.nome);
                
                const avaliacoes = this.#hotelSelecionado.avaliacoes;
                const reservasHotel = this.listarReservas(SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL, this.#hotelSelecionado.id);

                let mediaNota = 0;
                avaliacoes.forEach((a) => mediaNota += a.nota);
                mediaNota = (mediaNota / avaliacoes.length).toFixed(2);

                console.log(' Número de reservas: ' + reservasHotel.length);
                console.log(' Número de avaliações: ' + avaliacoes.length);

                if (avaliacoes.length > 0) {
                    console.log(' Nota média: ' + mediaNota);
                    console.log('\nAVALIAÇÕES');

                    avaliacoes.forEach((a) => {
                        console.log(' ' + a.nomeCliente + ' - ' + a.nota.toFixed(2) +
                                    (a.comentario.length > 0 ? (': ' + a.comentario) : ''));
                    });
                }

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.ALTERAR_NOME_HOTEL:
                console.log('ALTERAR NOME DO HOTEL - ' + this.#hotelSelecionado.nome);
                this.alterarNomeHotel(this.#hotelSelecionado);   

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.ALTERAR_CAPACIDADE_HOTEL:
                console.log('ALTERAR CAPACIDADE DO HOTEL - ' + this.#hotelSelecionado.nome);
                this.alterarCapacidadeHotel(this.#hotelSelecionado);   

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.FAZER_RESERVA:
                console.log('FAZER RESERVA - ' + this.#hotelSelecionado.nome);
                const reserva = this.fazerReserva(this.#hotelSelecionado);   
                console.log('\nAções disponíveis:');
                if (this.#proximaAcao != SistemaReservaHoteis.ACAO.CHECK_IN || !reserva) {
                    acoesDisponiveis.push({nome: 'FAZER OUTRA RESERVA', metodo: () => {}});
                } else {
                    this.#reservaSelecionada = reserva;
                    acoesDisponiveis.push({nome: 'CHECK-IN', metodo: () => {this.#acaoAtual = this.#proximaAcao;}});
                }
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.BUSCAR_RESERVAS:
                if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CANCELAR_RESERVA) {
                    console.log('BUSCAR RESERVA PARA CANCELAR');
                } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_IN) {
                    console.log('BUSCAR RESERVA PARA CHECK-IN');
                } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_OUT) {
                    console.log('BUSCAR RESERVA PARA CHECK-OUT');
                } else {
                    console.log('BUSCAR RESERVAS');
                }
                acoesDisponiveis.push({nome: 'LISTAR TODAS RESERVAS', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                    this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.SEM_FILTRO;
                }});
                acoesDisponiveis.push({nome: 'BUSCAR POR ID', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                    this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_ID;
                    this.#filtroListagemReservas = lerString('ID da reserva: ').toUpperCase();
                }});
                acoesDisponiveis.push({nome: 'BUSCAR POR HOTEL', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.BUSCAR_HOTEIS;
                    this.#proximaAcao = SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS;
                    this.#tipoFiltroListagemReservas = SistemaReservaHoteis.TIPO_FILTRO_LISTAGEM.POR_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.LISTAGEM_RESERVAS:
                let reservas = this.listarReservas(this.#tipoFiltroListagemReservas, this.#filtroListagemReservas);
                if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CANCELAR_RESERVA ||
                    this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_IN ||
                    this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_OUT)
                {
                    reservas = reservas.filter((r) => {
                        if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_OUT) {
                            return r.codigoSituacao == Reserva.SITUACAO.CHECK_IN;
                        }
                        return r.codigoSituacao == Reserva.SITUACAO.RESERVADO;
                    });
                } 
                
                if (reservas.length == 0) {
                    console.log('Nenhuma reserva encontrada.')
                } else {
                    if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CANCELAR_RESERVA) {
                        console.log('SELECIONE UMA RESERVA PARA CANCELAR\n');
                    } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_IN) {
                        console.log('SELECIONE UMA RESERVA PARA CHECK-IN\n');
                    } else if (this.#proximaAcao == SistemaReservaHoteis.ACAO.CHECK_OUT) {
                        console.log('SELECIONE UMA RESERVA PARA CHECK-OUT\n');
                    } else {
                        console.log('SELECIONE UMA RESERVA\n');
                    }
                    console.log('ID'.padStart(12, ' ') + 'Nome do Hotel'.padStart(27, ' ').padEnd(52, ' ') + 'Cliente'.padEnd(25, ' ') + 'Situação');

                    reservas.forEach((r) => {
                        const hotel = this.obterHotelPorId(r.idHotel);
                        const nome = r.idReserva.padEnd(15, ' ') + (hotel ? hotel.nome : '').padEnd(29, ' ') + r.nomeCliente.padEnd(35, ' ') + r.situacao;
                        acoesDisponiveis.push({nome, metodo: () => {
                            this.#reservaSelecionada = r;
                            this.#acaoAtual = this.#proximaAcao;
                        }});
                    })
                }
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.RESERVA_SELECIONADA:
                console.log('RESERVA ' + this.#reservaSelecionada.idReserva);
                console.log(' Hotel: ' + this.#hotelSelecionado.nome);
                console.log(' Nome do cliente: ' + this.#reservaSelecionada.nomeCliente);
                console.log(' Situação: ' + this.#reservaSelecionada.situacao);
                console.log('\nAções disponíveis:');

                if (this.#reservaSelecionada.codigoSituacao == Reserva.SITUACAO.RESERVADO) {
                    acoesDisponiveis.push({nome: 'CHECK-IN', metodo: () => {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.CHECK_IN;
                    }});
                    acoesDisponiveis.push({nome: 'CANCELAR', metodo: () => {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.CANCELAR_RESERVA;
                    }});
                }
                if (this.#reservaSelecionada.codigoSituacao == Reserva.SITUACAO.CHECK_IN) {
                    acoesDisponiveis.push({nome: 'CHECK-OUT', metodo: () => {
                        this.#acaoAtual = SistemaReservaHoteis.ACAO.CHECK_OUT;
                    }});
                }
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
                break;

            case SistemaReservaHoteis.ACAO.CANCELAR_RESERVA:
                console.log('CANCELAR RESERVA');
                console.log(' Hotel: ' + this.#hotelSelecionado.nome);
                console.log(' Cliente: ' + this.#reservaSelecionada.nomeCliente);

                this.cancelarReserva(this.#reservaSelecionada);   

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {this.#voltar();}});
            break;

            case SistemaReservaHoteis.ACAO.CHECK_IN:
                console.log('CHECK-IN');
                console.log(' Hotel: ' + this.#hotelSelecionado.nome);
                console.log(' Cliente: ' + this.#reservaSelecionada.nomeCliente);

                this.checkIn(this.#reservaSelecionada);   

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {
                    this.#voltar();
                    if (this.#acaoAtual == SistemaReservaHoteis.ACAO.FAZER_RESERVA) {
                        this.#voltar();
                    }
                }});
            break;

            case SistemaReservaHoteis.ACAO.CHECK_OUT:
                console.log('CHECK-OUT');
                console.log(' Hotel: ' + this.#hotelSelecionado.nome);
                console.log(' Cliente: ' + this.#reservaSelecionada.nomeCliente);

                this.checkOut(this.#reservaSelecionada);   

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'AVALIAR HOTEL', metodo: () => {
                    this.#acaoAtual = SistemaReservaHoteis.ACAO.AVALIAR_HOTEL;
                }});
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {
                    this.#voltar();
                }});
            break;

            case SistemaReservaHoteis.ACAO.AVALIAR_HOTEL:
                console.log('AVALIAÇÃO - ' + this.#hotelSelecionado.nome);

                this.avaliarHotel(this.#reservaSelecionada);   

                console.log('\nAções disponíveis:');
                acoesDisponiveis.push({nome: 'VOLTAR', metodo: () => {
                    this.#voltar();
                    this.#voltar();
                }});
            break;
        }

        if (acoesDisponiveis.length > 0) {
            acoesDisponiveis.forEach((a, i) => {
                console.log((i + 1).toString().padStart(3) + '. ' + a.nome);
            });

            let acao;
            do {
                acao = acoesDisponiveis[lerNumeroValido('Escolha uma opção: ') - 1];
                if (!acao) {
                    console.log('Opção inválida.');
                } else {
                    const acaoAnterior = this.#acaoAtual;
                    const proximaAcaoAnterior = this.#proximaAcao;
                    const historicoAnterior = this.#historicoAcoes.length;

                    acao.metodo();

                    if (this.#acaoAtual != acaoAnterior && historicoAnterior == this.#historicoAcoes.length) {
                        this.#historicoAcoes.push({
                            acao: acaoAnterior,
                            proxima: proximaAcaoAnterior
                        });
                    }
                }
            } while (!acao);
        }
    }

    #voltar() {
        if (this.#historicoAcoes.length == 0) {
            this.#acaoAtual = SistemaReservaHoteis.ACAO.MENU_INICIAL;
            return;
        }
        const acaoHistorico = this.#historicoAcoes.pop();
        this.#acaoAtual = acaoHistorico.acao;
        this.#proximaAcao = acaoHistorico.proxima;
    }

    #lerArquivo() {
        try {
            const data = fs.readFileSync('srh.json', 'utf8');
            
            const json = JSON.parse(data);
            json.hoteis.forEach((h) => {
                this.#hoteis.push(new Hotel(null, null, null, h));
            });
            json.reservas.forEach((r) => {
                this.#reservas.push(new Reserva(null, null, r));
            });

        } catch {}
    }

    #salvarArquivo() {
        fs.writeFile('srh.json', JSON.stringify({
          hoteis: this.#hoteis, reservas: this.#reservas  
        }), () => {});
    }

}

// Entrada para seleção de qual método executar
function main() {
    try {
        const ALGORITMOS = [
            {nome: 'REDUÇÃO DE TEMPO DE VIDA DE FUMANTE', metodo: processarPerdaDiasVidaPorFumar},
            {nome: 'CÁLCULO DE MULTA POR EXCESSO DE VELOCIDADE', metodo: processarVelocidadeCarro},
            {nome: 'CÁLCULO DO PREÇO DA PASSAGEM', metodo: processarPrecoPassagem},
            {nome: 'VALIDAÇÃO DE LADOS DE UM TRIÂNGULO', metodo: processarTriangulo},
            {nome: 'JOKENPO - PEDRA-PAPEL-TESOURA', metodo: processarJoKenPo},
            {nome: 'JOGO DE ADIVINHAÇÃO', metodo: processarJogoAdivinhacao},
            {nome: 'CÁLCULO DO PREÇO DE ALUGUEL DE CARROS', metodo: processarAluguelCarro},
            {nome: 'PROGRAMA DE VIDA SAUDÁVEL', metodo: processarParticipacaoProgramaVidaSaudavel},
            {nome: 'TOTAL DE SALÁRIO PAGO POR SEXO', metodo: processarSalarioFuncionarios},
            {nome: 'PROCESSAMENTO DE VÁRIOS VALORES', metodo: processarVariosNumeros},
            {nome: 'PROGRESSÃO ARITMÉTICA', metodo: processarProgressaoAritmetica},
            {nome: '10 PRIMEIROS ELEMENTOS DA SEQUÊNCIA DE FIBONACCI', metodo: processar10ElementosFibonacci},
            {nome: '15 PRIMEIROS ELEMENTOS DA SEQUÊNCIA DE FIBONACCI', metodo: processar15ElementosFibonacci},
            {nome: 'INVERSÃO DE 7 NOMES', metodo: processar7Nomes},
            {nome: 'ENCONTRAR NÚMERO PARES EM VETOR', metodo: processarNumerosPares},
            {nome: '20 NÚMEROS ALEATÓRIOS - ORDENAÇÃO CRESCENTE', metodo: processarNumerosAleatorios},
            {nome: 'LISTAR MENORES DE IDADE', metodo: processarPessoas},
            {nome: 'REGISTRAR UM FUNCIONÁRIO', metodo: processarDadosFuncionario},
            {nome: 'LEITURA DE 5 HORÁRIOS', metodo: processarHorarios},
            {nome: 'FOLHA MENSAL DE PAGAMENTOS DE 80 EMPREGADOS', metodo: processarFolhaMensalEmpregados},
            {nome: 'CÁLCULO DO PESO IDEAL', metodo: processarCalculoPesoIdeal},
            {nome: 'PESQUISA ENTRE HABITANTES DE UMA CIDADE', metodo: processarPesquisas},
            {nome: 'MATRIZ IDENTIDADE', metodo: processarMatrizIdentidade},
            {nome: 'VETOR COM A QUANTIDADE DE NÚMEROS NEGATIVOS EM CADA LINHA DA MATRIZ', metodo: processarMatrizVetorNumerosNegativos},
            {nome: 'SOMA DOS VALORES DE CADA COLUNA DE UMA MATRIZ 15X20', metodo: processarMatrizSomaColunas},
            {nome: 'MATRIZ PRODUTO', metodo: processarProdutoMatrizes},
            {nome: 'MULTIPLICAÇÃO DE MATRIZ POR VALOR', metodo: processarMatrizVetorMultiplicacao},
            {nome: 'SOMA DOS ELEMENTOS ACIMA E ABAIXO DA DIAGONAL PRINCIPAL DE UMA MATRIZ ', metodo: processarMatrizSomaSuperiorInferiorDiagonal},
            {nome: 'OPERAÇÕES SOBRE MATRIZ 5X5', metodo: processarMatriz5x5},
            {nome: 'VETORES COM SOMA DAS LINHAS E COLUNAS DE UMA MATRIZ', metodo: processarVetoresMatriz5x5},
            {nome: 'COMPARAÇÃO DE ELEMENTOS DE UMA MATRIZ 30X30', metodo: processarMatriz30x30},
            {nome: 'DIVISÃO DOS ELEMENTOS DE UMA MATRIZ PELO MAIOR ELEMENTO DE CADA LINHA', metodo: processarDivisaoMatrizPorMaiorElemento},
            {nome: 'MULTIPLICAÇÃO DA DIAGONAL PRINCIPAL PELA MÉDIA DA SECUNDÁRIA DE UMA MATRIZ', metodo: processarMultiplicacaoDiagonaisMatriz},
            {nome: 'MULTIPLICAÇÃO DE CADA LINHA PELO ELEMENTO DA DIAGONAL PRINCIPAL DE UMA MATRIZ', metodo: processarMultiplicacaoLinhaDiagonalPrincipalMatriz},
            {nome: 'VETORES DE NÚMEROS PARES E ÍMPARES', metodo: processarDoisVetoresParOuImpar},
            {nome: 'LOTERIA ESPORTIVA', metodo: processarLoteriaEsportiva},
            {nome: 'CORREÇÃO DAS PROVAS DE UMA TURMA', metodo: processarProvas},
            {nome: 'OPERAÇÕES SOBRE UM VETOR', metodo: processarOperacoesVetor},
            {nome: 'COMPACTAÇÃO DE UM VETOR', metodo: processarCompactacaoVetor},
            {nome: 'VERIFICAR GANHADOR DA LOTO', metodo: processarLoto},
            {nome: 'OBJETO PESSOA', metodo: processarObjetoPessoa},
            {nome: 'OBJETO DADOS', metodo: processarObjetoDados},
            {nome: 'COMBINAR DOIS OBJETOS', metodo: processarCombinacaoObjetos},
            {nome: 'CONTAR STRINGS EM UM OBJETO', metodo: processarContagemPropriedadesStrings},
            {nome: 'CONTAR STRINGS EM UM ARRAY', metodo: processarContagemStringsArray},
            {nome: 'CALCULAR TOTAL DE VENDAS POR VENDEDOR', metodo: processarVendasPorVendedor},
            {nome: 'TRANSFORMAR PROPRIEDADES DE UM OBJETO APLICANDO FUNÇÃO', metodo: processarModificacaoPropriedades},
            {nome: 'JUNÇÃO DE INVENTÁRIOS DE DUAS LOJAS', metodo: processarInventarios},
            {nome: 'TRANSAÇÕES FINANCEIRAS POR CATEGORIA', metodo: processarTransacoes},
            {nome: 'SISTEMA DE RESERVA DE HOTÉIS', metodo: () => {(new SistemaReservaHoteis()).renderizerInterface();}},
        ];

        console.log('Algorítmos disponíveis:');

        for (let i = 0; i < ALGORITMOS.length; i++) {
            console.log(((i + 1) + '. ').padStart(5, ' ') + ALGORITMOS[i].nome);
        }

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