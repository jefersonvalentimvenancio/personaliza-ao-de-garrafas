const botoes = document.querySelectorAll(".escolher-fonte");
const lista = document.querySelector(".lista");

//  Array principal fica fora de tudo
let array = [];

//  Carregar dados ao abrir a página
const dadosSalvos = localStorage.getItem("pedidos");

if (dadosSalvos) {
    array = JSON.parse(dadosSalvos);

    array.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });
}

//  Função para salvar no LocalStorage
function salvarDados() {
    const dadosString = JSON.stringify(array);
    localStorage.setItem("pedidos", dadosString);
}

//  Evento de clique nos botões
botoes.forEach((btn) => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");

        const input = card.querySelector(".fontes");
        const nome = input.value.trim();

        if (nome === "") {
            alert("Digite um nome válido");
            return;
        }

        const fonte = card.querySelector("h3").textContent;

        // cria o item da lista
        const novoItem = document.createElement("li");

        const texto = `${nome} escolheu a fonte ${fonte}`;

        // adiciona o texto
        novoItem.textContent = texto;

        // adiciona na lista
        lista.appendChild(novoItem);

        // adiciona no array
        array.push(texto);

        // salva no LocalStorage
        salvarDados();

        // limpa o input
        input.value = "";

        //enviar pra o whatssap
        // enviar pra o WhatsApp
const mensagem = `Pedido de personalização:
Nome: ${nome}
Fonte: ${fonte}`;

const mensagemCodificada = encodeURIComponent(mensagem);

const link = "https://wa.me/5589999742605?text=" + mensagemCodificada;

window.open(link, "_blank");
    });
});