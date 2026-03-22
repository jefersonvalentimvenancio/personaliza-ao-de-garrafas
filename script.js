
const botoes = document.querySelectorAll(".escolher-fonte");

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

        const resumo = document.querySelector(".resumo");

        resumo.textContent = `${nome} escolheu a fonte ${fonte}`;

    });
});