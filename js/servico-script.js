// Seleciona todos os botões de flip
const btnFlips = document.querySelectorAll('.btn-flip');

// Adiciona evento de clique em cada botão
btnFlips.forEach(btn => {
    btn.addEventListener('click', function () {
        // Encontra o card-flip pai mais próximo
        const cardFlip = this.closest('.card-flip');

        // Adiciona ou remove a classe 'flipped'
        cardFlip.classList.toggle('flipped');
    });
});

// Animação suave do botão WhatsApp ao carregar a página
window.addEventListener('load', () => {
    const whatsappBtn = document.querySelector('.whatsapp-float');

    // Adiciona animação de entrada
    setTimeout(() => {
        whatsappBtn.style.animation = 'slideIn 0.5s ease';
    }, 1000);
});

// Adiciona animação CSS para o WhatsApp
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
const stars = document.querySelectorAll('.star');
const comentario = document.getElementById('comentario');
const nomeInput = document.getElementById('nome');
const enviar = document.getElementById('enviar');
const mensagem = document.getElementById('mensagem');
const lista = document.getElementById('lista-avaliacoes');
let nota = 0;

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        nota = index + 1;
        stars.forEach((s, i) => s.classList.toggle('selected', i < nota));
    });
});

enviar.addEventListener('click', () => {
    const texto = comentario.value.trim();
    const nome = nomeInput.value.trim() || "Anônimo";
    if (nota === 0 || texto === "") {
        alert("Por favor, selecione uma nota e escreva um comentário.");
        return;
    }

    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR') + " " + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const nova = document.createElement('div');
    nova.classList.add('avaliacao');
    nova.innerHTML = `
      <div class="avaliacao-stars">${'⭐'.repeat(nota)}</div>
      <div class="avaliacao-texto">${texto}</div>
      <div class="avaliacao-info">${nome} • ${dataFormatada}</div>
    `;
    lista.appendChild(nova);

    mensagem.style.display = "block";
    setTimeout(() => mensagem.style.display = "none", 2000);

    // Limpar campos
    comentario.value = "";
    nomeInput.value = "";
    stars.forEach(s => s.classList.remove('selected'));
    nota = 0;
});