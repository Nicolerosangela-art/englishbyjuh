document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const carouselContainer = document.querySelector('.simple-carousel'); // ← MUDEI AQUI

    // VERIFICAÇÃO: Se algum elemento não existir, para aqui
    if (!track) {
        console.error('Elemento .carousel-track não encontrado!');
        return;
    }
    
    if (!items || items.length === 0) {
        console.error('Nenhum .carousel-item encontrado!');
        return;
    }
    
    if (!carouselContainer) {
        console.error('Elemento .simple-carousel não encontrado!');
        return;
    }

    const itemWidth = items[0].offsetWidth + 20; // 20px gap
    let scrollPosition = 0;
    let animationId;

    // Duplicar os itens para loop infinito
    track.innerHTML += track.innerHTML;

    function moveCarousel() {
        scrollPosition += 0.6; // velocidade do scroll

        if (scrollPosition >= track.scrollWidth / 2) {
            scrollPosition = 0;
        }

        track.style.transform = `translateX(-${scrollPosition}px)`;
        animationId = requestAnimationFrame(moveCarousel);
    }

    // Iniciar carrossel
    moveCarousel();

    // PAUSAR AUTOPLAY AO CLICAR EM UMA IMAGEM
    const allItems = document.querySelectorAll('.carousel-item'); // Pegar todos após duplicar
    allItems.forEach(item => {
        item.addEventListener('click', () => {
            cancelAnimationFrame(animationId);
        });
    });

    // PAUSAR AUTOPLAY AO PASSAR O MOUSE
    carouselContainer.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        moveCarousel();
    });
});

// Função flipCard fora do DOMContentLoaded para ser acessível globalmente
function flipCard(card) {
    card.classList.toggle("flipped");
}
