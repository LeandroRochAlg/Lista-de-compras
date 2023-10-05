const form = document.querySelector('form');
const submit = document.querySelector('#adicionar');
const listaProdutos = document.querySelector('#produtos');
const vazio = document.querySelector('#vazio');
const total = document.querySelector('.total');
const pTotal = document.querySelector('#valorTotal');
const qtdItens = document.querySelector('#qtdItens');

let tamLista = 0;
let valorTotal = 0;
let quantidadeItens = 0;

function criaLi(nome, quantidade, preco) {
    const li = document.createElement('li');
    let str = `<span class="nomePdt">${nome}</span><span id="qtd"><button class="alteraQtd" id="aumentaQtd">+</button><span id="valorQtd">${quantidade}</span><button class="alteraQtd" id="diminuiQtd">-</button></span><span class="precoPdt">R$${preco}</span><button id="remover">X</button>`;
    li.innerHTML = str;
    li.classList.add('produtoListado');
    return li;
}

function atualizaTotal(quantidade, preco){
    valorTotal += quantidade * preco;
    pTotal.innerHTML = `R$${valorTotal}`;

    quantidadeItens += quantidade;

    if(quantidadeItens === 1) qtdItens.innerHTML = `${quantidadeItens} item`;
    else qtdItens.innerHTML = `${quantidadeItens} itens`;
}

const funcao = (e) => {
    e.preventDefault();
    let nome = document.querySelector('#produto').value;
    let quantidade = Number(document.querySelector('#quantidade').value);
    let preco = Number(document.querySelector('#preco').value);
    console.log(nome, quantidade, preco);

    atualizaTotal(quantidade, preco);

    return criaLi(nome, quantidade, preco);
}

submit.addEventListener('click', (e) => {
    let li = funcao(e);
    
    const remover = li.querySelector('#remover');
    const aumentaQtd = li.querySelector('#aumentaQtd');
    const diminuiQtd = li.querySelector('#diminuiQtd');

    remover.addEventListener('click', () => {
        let strPreco = li.querySelector('.precoPdt').innerText;
        let preco = Number(strPreco.slice(2, strPreco.length));
        let strQuantidade = li.querySelector('#qtd').innerText;
        let quantidade = Number(strQuantidade.slice(1, strQuantidade.length - 1));

        console.log(preco, quantidade);

        atualizaTotal(-quantidade, preco);
        li.remove();

        tamLista--;

        if(tamLista === 0) {
            vazio.style = 'display: flex';
            total.style = 'display: none';
        }
    });

    aumentaQtd.addEventListener('click', () => {
        let strPreco = li.querySelector('.precoPdt').innerText;
        let preco = Number(strPreco.slice(2, strPreco.length));
        let strQuantidade = li.querySelector('#qtd').innerText;
        let quantidade = Number(strQuantidade.slice(1, strQuantidade.length - 1));

        atualizaTotal(1, preco);
        quantidade++;
        li.querySelector('#valorQtd').innerHTML = `${quantidade}`;
    });

    diminuiQtd.addEventListener('click', () => {
        let strPreco = li.querySelector('.precoPdt').innerText;
        let preco = Number(strPreco.slice(2, strPreco.length));
        let strQuantidade = li.querySelector('#qtd').innerText;
        let quantidade = Number(strQuantidade.slice(1, strQuantidade.length - 1));

        if(quantidade > 1) {
            atualizaTotal(-1, preco);
            quantidade--;
            li.querySelector('#valorQtd').innerHTML = `${quantidade}`;
        }
    });

    listaProdutos.appendChild(li);
    form.reset();

    if(tamLista === 0) {
        vazio.style = 'display: none';
        total.style = 'display: flex';
    }

    tamLista++;
});