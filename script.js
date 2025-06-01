const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const carousel = document.querySelector('.carousel');
const list = carousel.querySelector('.list');
const thumbnail = carousel.querySelector('.thumbnails');

let runTimeOut;
let runNextAuto = setTimeout(() => {
  nextBtn.click();
}, 7000);

nextBtn.onclick = function () {
  showSlider('next');
};

prevBtn.onclick = function () {
  showSlider('prev');
};

function showSlider(type) {
  const sliderItems = list.querySelectorAll('.item');
  const thumbnailItems = thumbnail.querySelectorAll('.item');

  if (type === 'next') {
    list.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    carousel.classList.add('next');
  } else {
    list.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    carousel.classList.add('prev');
  }
  // Marcar a nova thumb ativa
document.querySelectorAll('.thumbnails .item').forEach(el => el.classList.remove('active'));
document.querySelector('.thumbnails .item').classList.add('active');


  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carousel.classList.remove('next');
    carousel.classList.remove('prev');
  }, 3000);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, 7000);
}


// Validação e submissão do formulário
document.getElementById('booking-form').addEventListener('submit', e=> {
  e.preventDefault();
  alert('Reserva enviada com sucesso!\nEm breve entraremos em contacto.');
  e.target.reset();
});


document.addEventListener('DOMContentLoaded', () => {
  const eventDate = new Date("2025-06-15T09:00:00"); // Data da Maratona

  const segments = {
    days: document.querySelector('[data-unit="days"] .flip-card'),
    hours: document.querySelector('[data-unit="hours"] .flip-card'),
    minutes: document.querySelector('[data-unit="minutes"] .flip-card'),
    seconds: document.querySelector('[data-unit="seconds"] .flip-card')
  };

  const updateSegment = (element, value) => {
    const top = element.querySelector('.top');
    const bottom = element.querySelector('.bottom');
    const current = top.textContent;

    const formattedValue = String(value).padStart(2, '0');

    if (current !== formattedValue) {
      top.textContent = formattedValue;
      bottom.textContent = formattedValue;

      // Simple flip animation
      element.classList.remove('animate');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('animate');
    }
  };

  const updateCountdown = () => {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) return; // Event already passed

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    updateSegment(segments.days, days);
    updateSegment(segments.hours, hours);
    updateSegment(segments.minutes, minutes);
    updateSegment(segments.seconds, seconds);
  };

  setInterval(updateCountdown, 1000);
    
  
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});


// filepath: c:\Users\samue\OneDrive\Documentos\Ambiente de Trabalho\Website - Trabalho Prático(atualizado)\script.js
document.querySelectorAll('.thumbnail .item').forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    // Move o slide principal e as thumbnails até a thumb clicada ser a primeira
    while (document.querySelector('.thumbnail .item') !== thumb) {
      list.appendChild(list.querySelector('.item'));
      thumbnail.appendChild(thumbnail.querySelector('.item'));
    }
    document.querySelectorAll('.thumbnail .item').forEach(el => el.classList.remove('active'));
    thumb.classList.add('active');
  });
});

/* pausa o auto-play se o utilizador fizer swipe */
let userInteracted = false;
document.querySelector('.carousel')
        .addEventListener('pointerdown', () => userInteracted = true);

function autoPlay() {
  if (userInteracted) return;      // deixa o utilizador no controlo
  nextSlide();                     // a tua função
  setTimeout(autoPlay, 7000);
}
setTimeout(autoPlay, 7000);
