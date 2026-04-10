// seleciona todos os botões
const botoes = document.querySelectorAll(".escolher-fonte");

// seleciona a lista onde os itens vão aparecer
const lista = document.querySelector(".lista");

// array principal (onde ficam os pedidos)
let array = [];


//  FUNÇÃO PARA SALVAR NO LOCAL STORAGE

function salvarDados() {
    const dadosString = JSON.stringify(array);
    localStorage.setItem("pedidos", dadosString);
}


//  FUNÇÃO PARA CRIAR ITEM
// (REUTILIZÁVEL - PROFISSIONAL)

function criarItem(texto) {

    // cria o <li>
    const li = document.createElement("li");

    // cria um span para o texto
    const span = document.createElement("span");
    span.textContent = texto;

    // cria botão de remover
    const botaoRemover = document.createElement("button");
botaoRemover.classList.add("btn-remover");
botaoRemover.innerHTML = '<i class="fa fa-times"></i>';
    // evento de remover
    botaoRemover.addEventListener("click", () => {
        li.remove();

        // remove do array
        array = array.filter(item => item !== texto);

        // atualiza localStorage
        salvarDados();
    });

    // monta o li
    li.appendChild(span);
    li.appendChild(botaoRemover);

    // adiciona na lista
    lista.appendChild(li);
}


//  CARREGAR DADOS SALVOS

const dadosSalvos = localStorage.getItem("pedidos");

if (dadosSalvos) {
    array = JSON.parse(dadosSalvos);

    array.forEach(item => {
        criarItem(item);
    });
}


//  EVENTO DOS BOTÕES
botoes.forEach((btn) => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");

        const input = card.querySelector(".fontes");
        const nome = input.value.trim();

        // validação
        if (nome === "") {
            alert("Digite um nome válido");
            return;
        }

        const fonte = card.querySelector("h3").textContent;

        const texto = `${nome} escolheu a fonte ${fonte}`;

        // cria item na tela
        criarItem(texto);

        // adiciona no array
        array.push(texto);

        // salva
        salvarDados();

        // limpa input
        input.value = "";

       
        //  ENVIAR PARA WHATSAPP
        
      const mensagem = `Pedido de personalização:
Nome: ${nome}
Fonte: ${fonte}`;

const mensagemCodificada = encodeURIComponent(mensagem);

const link = "https://wa.me/5589999742605?text=" + mensagemCodificada;

window.location.href = link;
    });
});