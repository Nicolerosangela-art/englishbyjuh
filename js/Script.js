// Seleciona todos os botões de flip
const btnFlips = document.querySelectorAll('.btn-flip');

// Adiciona evento de clique em cada botão
btnFlips.forEach(btn => {
    btn.addEventListener('click', function() {
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
document.head.appendChild(style);

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

const items = document.querySelectorAll('.coverflow-item');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let current = 0;

// Touch variables
let startX = 0;
let isDragging = false;

function updateCoverflow() {
    const total = items.length;
    items.forEach((item, index) => {
        item.classList.remove('left', 'right', 'active');
        item.style.opacity = '0.4';
        item.style.transform = 'scale(0.6)';
        item.style.zIndex = '1';

        if (index === current) item.classList.add('active');
        else if (index === (current - 1 + total) % total) {
            item.classList.add('left');
            item.style.transform = 'translateX(-120px) scale(0.8)';
            item.style.opacity = '0.6';
            item.style.zIndex = '2';
        } else if (index === (current + 1) % total) {
            item.classList.add('right');
            item.style.transform = 'translateX(120px) scale(0.8)';
            item.style.opacity = '0.6';
            item.style.zIndex = '2';
        }
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[current].classList.add('active');
}

function nextSlide() {
    current = (current + 1) % items.length;
    updateCoverflow();
}

function prevSlide() {
    current = (current - 1 + items.length) % items.length;
    updateCoverflow();
}

// Setas
rightArrow.addEventListener('click', nextSlide);
leftArrow.addEventListener('click', prevSlide);

// Bolinhas
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        current = index;
        updateCoverflow();
    });
});

// Loop automático
let autoSlide = setInterval(nextSlide, 1500);

// --- Touch events ---
const carouselTrack = document.querySelector('.coverflow-track');

carouselTrack.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoSlide); // pausa o autoplay durante o touch
});

carouselTrack.addEventListener('touchmove', e => {
    if (!isDragging) return;
    let moveX = e.touches[0].clientX - startX;
    // você pode adicionar feedback visual aqui se quiser
});

carouselTrack.addEventListener('touchend', e => {
    if (!isDragging) return;
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;

    if (diff > 50) prevSlide(); // swipe para direita
    else if (diff < -50) nextSlide(); // swipe para esquerda

    isDragging = false;
    autoSlide = setInterval(nextSlide, 1500); // retoma autoplay
});

// Inicializa
updateCoverflow();