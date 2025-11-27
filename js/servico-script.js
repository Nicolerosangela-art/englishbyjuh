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


// JavaScript para trocar as cores dos cards
document.addEventListener('DOMContentLoaded', function() {
    const houseButtons = document.querySelectorAll('.house-btn');
    
    houseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const house = this.getAttribute('data-house');
            const card = this.closest('.stat-item');
            
            // Remove todas as classes de casa do card
            card.classList.remove('house-gryffindor', 'house-ravenclaw', 'house-hufflepuff', 'house-slytherin');
            
            // Remove active de todos os botões do card
            card.querySelectorAll('.house-btn').forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a nova classe de casa
            card.classList.add(`house-${house}`);
            
            // Marca o botão como ativo
            this.classList.add('active');
            
            // Salva a escolha no localStorage (opcional)
            const level = card.getAttribute('data-level');
            localStorage.setItem(`house-${level}`, house);
            
            // Feedback visual com animação
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Restaura as escolhas salvas (opcional)
    document.querySelectorAll('.stat-item').forEach(card => {
        const level = card.getAttribute('data-level');
        const savedHouse = localStorage.getItem(`house-${level}`);
        
        if (savedHouse) {
            card.classList.add(`house-${savedHouse}`);
            card.querySelector(`[data-house="${savedHouse}"]`).classList.add('active');
        }
    });
});
