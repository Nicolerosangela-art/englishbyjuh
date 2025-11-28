// script corrigido - cole no final do seu HTML ou no script.js

document.addEventListener("DOMContentLoaded", () => {
  // seleção de seções do quiz (ordem DOM)
  const secoes = Array.from(document.querySelectorAll("section.quiz"));

  // elementos resultado e formulário (padrão: existem no HTML)
  const resultadoSection = document.querySelector("section.quiz.resultado");
  const formSection = document.getElementById("contato");

  // pontuação e índice atual
  let pontuacao = 0;
  let indiceSecao = 0;

  // respostas - use as chaves como "questao4", "questao5", etc.
  const respostasCorretas = {
    questao4: "B",
    questao5: "B",
    questao6: "C",
    questao7: "B",
    questao8: "C",
    questao9: "A"
  };

  // mostrar só a seção i
  function mostrarSecao(i) {
    secoes.forEach((s, idx) => {
      s.style.display = idx === i ? "flex" : "none";
    });
    indiceSecao = i;
    // scroll suave para o topo da seção
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // inicial
  if (secoes.length === 0) return; // nada a fazer
  mostrarSecao(0);

  // função para avançar para a próxima seção
  function avancar() {
    const proximo = indiceSecao + 1;
    if (proximo >= secoes.length) return;
    // se o próximo for a seção de resultado (tem class 'resultado')
    if (secoes[proximo].classList.contains("resultado")) {
      mostrarResultadoFinal();
      return;
    }
    mostrarSecao(proximo);
  }

  // configurar alternativas: atribui letras A,B,C... e listeners
  function configurarAlternativas() {
    // para cada seção que tem .alternativas
    secoes.forEach(secao => {
      const containerAlt = secao.querySelector(".alternativas");
      if (!containerAlt) return;

      const botoes = Array.from(containerAlt.querySelectorAll(".botao1"));
      // atribui letra baseada no índice (A, B, C...)
      botoes.forEach((btn, idx) => {
        const letra = String.fromCharCode(65 + idx); // 65='A'
        btn.dataset.letra = letra;
        // opcional: mostra a letra no botão se quiser (comente se não quiser)
        // btn.innerHTML = `<strong>${letra})</strong> ` + btn.innerHTML;

        btn.addEventListener("click", () => {
          // evita clicar duas vezes
          if (btn.disabled) return;

          // desativa todos os botões dessa seção
          botoes.forEach(b => b.disabled = true);

          // determina chave da questão, convertendo id 'questao-4' -> 'questao4'
          // ou, se a seção não tiver id, tenta usar classe (fallback)
          let chave = "";
          if (secao.id) {
            chave = secao.id.replace(/-/g, ""); // "questao-4" -> "questao4"
          } else {
            // tenta achar classe que contenha "questao"
            const cl = Array.from(secao.classList).find(c => c.includes("questao"));
            chave = cl || "";
          }

          const correta = respostasCorretas[chave];

          // marca visualmente
          if (correta && btn.dataset.letra === correta) {
            btn.style.background = "#4CAF50";
            btn.style.color = "#fff";
            pontuacao++;
          } else {
            btn.style.background = "#E74C3C";
            btn.style.color = "#fff";
            // marca também o correto (se soubermos qual é)
            if (correta) {
              const certoBtn = botoes.find(b => b.dataset.letra === correta);
              if (certoBtn) {
                certoBtn.style.background = "#4CAF50";
                certoBtn.style.color = "#fff";
              }
            }
          }
        });
      });
    });
  }


  configurarAlternativas();

  // listeners dos botões "Continuar" (todos os botões com class botao-continuar)
  const continuarBtns = Array.from(document.querySelectorAll(".botao-continuar"));
  continuarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // se o botão estiver dentro da seção de resultado, ignora aqui
      const parentSec = btn.closest("section.quiz");
      if (parentSec && parentSec.classList.contains("resultado")) return;
      // senão, avança
      avancar();
    });
  });


  // função para mostrar resultado final
  function mostrarResultadoFinal() {
    // esconde todas
    secoes.forEach(s => (s.style.display = "none"));
    // exibe a seção resultado (se existir)
    if (resultadoSection) {
      resultadoSection.style.display = "flex";
      // texto de acertos
      const acertosEl = document.getElementById("acertos");
      if (acertosEl) acertosEl.innerText = `Você acertou ${pontuacao} de 6 perguntas!`;

      // barra de progresso
      const porcentagem = Math.round((pontuacao / 6) * 100);
      const prog = document.getElementById("resultado-progress");
      if (prog) prog.style.width = porcentagem + "%";

      // casa
      const casaEl = document.getElementById("casa-hogwarts");
      let casa = "";
      if (pontuacao === 6) casa = "🦁 Grifinória — Corajoso e determinado!";
      else if (pontuacao >= 4) casa = "🦅 Corvinal — Inteligente e curioso!";
      else if (pontuacao >= 2) casa = "🐍 Sonserina — Ambicioso e estratégico!";
      else casa = "🦡 Lufa-Lufa — Leal, gentil e dedicado!";
      if (casaEl) casaEl.innerText = `Sua casa é: ${casa}`;
    } else {
      // se não existe, apenas avança para a última seção disponível
      mostrarSecao(secoes.length - 1);
    }
  }

  // botão "Continuar para formulário" dentro da seção resultado (se existir)
  const btnFinalLocal = document.getElementById("btn-final");
  if (btnFinalLocal) {
    btnFinalLocal.addEventListener("click", () => {
      if (resultadoSection) resultadoSection.style.display = "none";
      if (formSection) formSection.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
function abrirFormulario() {
  document.querySelector('.resultado').style.display = 'none';
  document.querySelector('.formulario').style.display = 'flex';
}
document.getElementById('btn-final').addEventListener('click', abrirFormulario);
