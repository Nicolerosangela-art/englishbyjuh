
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
if (n > slides.length) {slideIndex = 1}
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";
}
for (i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex-1].style.display = "block";
dots[slideIndex-1].className += " active";
}

