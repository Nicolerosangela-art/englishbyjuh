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
const btn10 = document.getElementById("btn-10");
const btnFinal = document.getElementById("btn-final");

// ===== PEGANDO AS QUESTÕES =====
const secoes = document.querySelectorAll(".quiz");
const questao = document.querySelector(".questao");
const questao2 = document.querySelector(".questao2");
const questao3 = document.querySelector(".questao3");
const questao4 = document.querySelector(".questao4");
const questao5 = document.querySelector(".questao5");
const questao6 = document.querySelector(".questao6");
const questao7 = document.querySelector(".questao7");
const questao8 = document.querySelector(".questao8");
const questao9 = document.querySelector(".questao9");
const questao10 = document.querySelector(".questao10");
const resultado = document.querySelector(".resultado");
const contato = document.getElementById("contato");

// ===== VARIÁVEL DE PONTUAÇÃO =====
let pontuacao = 0;
let indiceSecao = 0; // Controle da pergunta atual

// ===== RESPOSTAS CERTAS =====
const respostasCorretas = {
    questao4: "B",
    questao5: "B",
    questao6: "C",
    questao7: "B",
    questao8: "C",
    questao9: "A"
};

// ===== FUNÇÃO PARA MOSTRAR APENAS A SEÇÃO ATUAL =====
function mostrarSecao(i) {
    secoes.forEach(secao => secao.style.display = "none");
    secoes[i].style.display = "flex";
}

// ===== CONFIGURAÇÕES INICIAIS =====
document.addEventListener("DOMContentLoaded", function () {
    mostrarSecao(indiceSecao);
});

// ===== FUNÇÃO GENÉRICA PARA AVANÇAR =====
function avancar() {
    if (indiceSecao < secoes.length - 1) {
        indiceSecao++;
        mostrarSecao(indiceSecao);
    }
}

// ===== CONFIGURAR CLIQUES NAS QUESTÕES =====
function configurarQuestoes() {
    const secoesQuestoes = [questao4, questao5, questao6, questao7, questao8, questao9];

    secoesQuestoes.forEach((secao, index) => {
        const nome = "questao" + (index + 4);
        const correta = respostasCorretas[nome];
        const botoes = secao.querySelectorAll(".botao1");

        botoes.forEach(btn => {
            btn.addEventListener("click", () => {
                botoes.forEach(b => b.disabled = true);

                const letra = btn.innerText.trim().charAt(0);

                if (letra === correta) {
                    btn.style.background = "#4CAF50";
                    btn.style.color = "#fff";
                    pontuacao++;
                } else {
                    btn.style.background = "#E74C3C";
                    btn.style.color = "#fff";
                }
            });
        });
    });
}

configurarQuestoes();

// ===== PASSAGEM ENTRE TELAS =====
btn1.addEventListener("click", avancar);
btn2.addEventListener("click", avancar);
btn3.addEventListener("click", avancar);
btn4.addEventListener("click", avancar);
btn5.addEventListener("click", avancar);
btn6.addEventListener("click", avancar);
btn7.addEventListener("click", avancar);
btn8.addEventListener("click", avancar);
btn9.addEventListener("click", avancar);
btn10.addEventListener("click", avancar);
btnFinal.addEventListener("click", mostrarResultadoFinal);

// ===== MOSTRAR RESULTADO FINAL =====
function mostrarResultadoFinal() {
    mostrarSecao(secoes.length - 2); // Exibe a seção resultado

    // Exibe acertos
    document.getElementById("acertos").innerText = `Você acertou ${pontuacao} de 6 perguntas!`;

    // Calcula porcentagem para a barra
    const porcentagem = Math.round((pontuacao / 6) * 100);
    document.getElementById("resultado-progress").style.width = porcentagem + "%";

    // Exibe casa
    let casa = "";
    if (pontuacao === 6) casa = "🦁 Grifinória";
    else if (pontuacao >= 4) casa = "🦅 Corvinal";
    else if (pontuacao >= 2) casa = "🐍 Sonserina";
    else casa = "🦡 Lufa-Lufa";

    document.getElementById("casa-hogwarts").innerText = `Sua casa é: ${casa}`;
}

