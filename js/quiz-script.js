// ===== PEGANDO BOTÕES =====
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btnFinal = document.getElementById("btn-final");

// ===== PEGANDO AS QUESTÕES =====
const questao = document.querySelector(".questao");
const questao2 = document.querySelector(".questao2");
const questao3 = document.querySelector(".questao3");
const questao4 = document.querySelector(".questao4");
const questao5 = document.querySelector(".questao5");
const questao6 = document.querySelector(".questao6");
const questao7 = document.querySelector(".questao7");
const questao8 = document.querySelector(".questao8");
const questao9 = document.querySelector(".questao9");
const resultado = document.querySelector(".resultado"); // Tela final

// ===== FORMULÁRIO (esconder até o final) =====
const contato = document.getElementById("contato");

// ===== VARIÁVEL DE PONTUAÇÃO =====
let pontuacao = 0;

// ===== RESPOSTAS CERTAS =====
const respostasCorretas = {
    questao4: "B",
    questao5: "B",
    questao6: "C",
    questao7: "B",
    questao8: "C",
    questao9: "A"
};

// ===== FUNÇÃO GENÉRICA PARA MUDAR TELA =====
function irPara(atual, proxima) {
    atual.style.display = "none";
    proxima.style.display = "flex";
}

// ===== CONFIGURAR CLIQUE NAS QUESTÕES =====
function configurarQuestoes() {
    const secoes = [questao4, questao5, questao6, questao7, questao8, questao9];

    secoes.forEach((secao, index) => {
        const nome = "questao" + (index + 4);
        const correta = respostasCorretas[nome];
        const botoes = secao.querySelectorAll(".botao1");

        botoes.forEach(btn => {
            btn.addEventListener("click", () => {
                botoes.forEach(b => b.disabled = true);

                const letra = btn.innerText.trim().charAt(0);

                if (letra === correta) {
                    btn.style.background = "#4CAF50"; // Verde
                    btn.style.color = "#fff";
                    pontuacao++; // Conta ponto
                } else {
                    btn.style.background = "#E74C3C"; // Vermelho
                    btn.style.color = "#fff";
                }
            });
        });
    });
}

configurarQuestoes();

// ===== PASSAGEM ENTRE TELAS =====
btn1.addEventListener("click", () => irPara(questao, questao2));
btn2.addEventListener("click", () => irPara(questao2, questao3));
btn3.addEventListener("click", () => irPara(questao3, questao4));
btn4.addEventListener("click", () => irPara(questao4, questao5));
btn5.addEventListener("click", () => irPara(questao5, questao6));
btn6.addEventListener("click", () => irPara(questao6, questao7));
btn7.addEventListener("click", () => irPara(questao7, questao8));
btn8.addEventListener("click", () => irPara(questao8, questao9));
btn9.addEventListener("click", mostrarResultadoFinal);

// ===== MOSTRAR RESULTADO FINAL =====
function mostrarResultadoFinal() {
    questao9.style.display = "none";
    resultado.style.display = "flex";

    document.getElementById("acertos").innerText = `Você acertou ${pontuacao} de 6 perguntas!`;

    let casa = "";
    if (pontuacao === 6) casa = "🦁 Grifinória";
    else if (pontuacao >= 4) casa = "🦅 Corvinal";
    else if (pontuacao >= 2) casa = "🐍 Sonserina";
    else casa = "🦡 Lufa-Lufa";

    document.getElementById("casa-hogwarts").innerText = `Sua casa é: ${casa}`;
}

// ===== MOSTRAR FORMULÁRIO DEPOIS DO RESULTADO =====
btnFinal.addEventListener("click", () => {
    resultado.style.display = "none";
    contato.style.display = "block";
});
