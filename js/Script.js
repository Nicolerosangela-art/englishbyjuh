const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth + 20; // 20px gap
let scrollPosition = 0;

// duplicar os itens para loop infinito
track.innerHTML += track.innerHTML;

function moveCarousel() {
    scrollPosition += 0.6; // velocidade do scroll
    if (scrollPosition >= track.scrollWidth / 2) {}
    track.style.transform = `translateX(-${scrollPosition}px)`;
    requestAnimationFrame(moveCarousel);
}

// iniciar carrossel
moveCarousel();
// PAUSAR AUTOPLAY AO CLICAR EM UMA IMAGEM
items.forEach(item => {
    item.addEventListener('click', () => {
        clearInterval(autoSlide); // para o loop automático
    });
});

// PAUSAR AUTOPLAY AO PASSAR O MOUSE
const carouselContainer = document.querySelector('.coverflow-carousel');

carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 1500); // retoma autoplay
});

function flipCard(card) {
    card.classList.toggle("flipped");
}