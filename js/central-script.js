// ===== ACCORDION FAQ =====
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona TODAS as seções FAQ
    const faqSections = document.querySelectorAll('.faq-section');

    // Verifica se existem seções FAQ
    if (faqSections.length === 0) {
        console.warn('Nenhuma seção FAQ encontrada');
        return;
    }

    // Itera sobre cada seção FAQ
    faqSections.forEach(faqSection => {
        // Seleciona todos os botões dentro da seção FAQ atual
        const faqButtons = faqSection.querySelectorAll('button');

        faqButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Pega o elemento <h3> pai do botão
                const h3Element = this.parentElement;

                // Pega o elemento <p> que é irmão do <h3>
                const answer = h3Element.nextElementSibling;

                // Verifica se o elemento existe
                if (!answer || answer.tagName !== 'P') {
                    console.warn('Resposta não encontrada ou estrutura HTML incorreta');
                    return;
                }

                // Seleciona todas as respostas e botões APENAS da seção atual
                const allAnswers = faqSection.querySelectorAll('p');
                const allButtons = faqSection.querySelectorAll('button');

                // Fecha todas as outras respostas da mesma seção
                allAnswers.forEach(item => {
                    if (item !== answer && item.classList) {
                        item.classList.remove('active');
                    }
                });

                // Remove a classe active de todos os outros botões da mesma seção
                allButtons.forEach(btn => {
                    if (btn !== this && btn.classList) {
                        btn.classList.remove('active');
                    }
                });

                // Toggle na resposta e botão clicados
                if (answer.classList) {
                    answer.classList.toggle('active');
                }

                if (this.classList) {
                    this.classList.toggle('active');
                }
            });
        });
    });

    const faqItems = document.querySelectorAll(".faq-section li");

    faqItems.forEach(item => {
        const button = item.querySelector("button");

        button.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });


    // ===== SMOOTH SCROLL PARA ÂNCORAS =====
    const categoryLinks = document.querySelectorAll('.categories-nav a[href^="#"]');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const searchValue = document.getElementById("search-input").value.toLowerCase().trim();

    // Seleciona todas as perguntas
    const questions = document.querySelectorAll("h3 button span");

    let encontrouAlgo = false;

    questions.forEach(question => {
        const text = question.innerText.toLowerCase();
        const li = question.closest("li");

        if (text.includes(searchValue)) {
            li.style.display = "block";
            encontrouAlgo = true;
        } else {
            li.style.display = "none";
        }
    });

    // AGORA verificar cada seção (categoria)
    const sections = document.querySelectorAll(".faq-section");

    sections.forEach(section => {
        const lis = section.querySelectorAll("li");
        let temVisivel = false;

        lis.forEach(li => {
            if (li.style.display !== "none") {
                temVisivel = true;
            }
        });

        // Se não tem nenhum li visível → Esconde a categoria inteira
        section.style.display = temVisivel ? "block" : "none";
    });
});