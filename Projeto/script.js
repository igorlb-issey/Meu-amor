/* ================= FRASE DIGITANDO LOOP ================= */

const phrases = [
  "momentos memoráveis",
  "sorrisos não guardados",
  "sentimentos não ditos",
  "ações não tomadas",
  "lembranças para a vida"
];

const typingText = document.getElementById("typing-text");

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop(){

  const currentPhrase = phrases[phraseIndex];

  if(!deleting){
    typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;

    if(letterIndex === currentPhrase.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }

  }else{
    typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;

    if(letterIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}

typeLoop();

/* ================= CONTADOR DE DIAS ================= */

// 👉 coloque a data de início do relacionamento aqui:
const startDate = new Date("2024-05-03"); // exemplo
const counterEl = document.getElementById("day-counter");

function animateCounter(target){
    let current = 0;
    const increment = Math.ceil(target / 100);

    const interval = setInterval(()=>{
        current += increment;
        if(current >= target){
            current = target;
            clearInterval(interval);
        }
        counterEl.textContent = current;
    }, 20);
}

function calculateDays(){
    const today = new Date();
    const diffTime = today - startDate;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    animateCounter(days);
}

calculateDays();

/* ===== ANIMAÇÃO AO ROLAR + GLOW NAS FOTOS ===== */

const faders = document.querySelectorAll('.fade-up');

const appearOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      // Ativa glow nas fotos
      if (entry.target.classList.contains('photo-block')) {
        entry.target.classList.add('visible');
        console.log('Foto visível! Adicionando .visible na foto:', entry.target); // debug
      }
    }
  });
}, {
  threshold: 0.2,          // 20% da foto visível → ajustável
  rootMargin: "0px 0px -100px 0px"  // ativa um pouco antes de chegar no topo
});

faders.forEach(el => appearOnScroll.observe(el));
document.addEventListener("DOMContentLoaded", () => {

  const hiddenContent = document.querySelector(".hidden-content");
  const indicator = document.querySelector(".scroll-indicator");

  if (!hiddenContent || !indicator) {
    console.log("elementos não encontrados");
    return;
  }

  function revealContent(){
    const triggerPoint = window.innerHeight * 0.85;
    const contentTop = hiddenContent.getBoundingClientRect().top;

    if(contentTop < triggerPoint){
      hiddenContent.classList.add("show");
      indicator.style.opacity = "0";
      indicator.style.transition = "opacity 0.5s ease";
    }
  }

  window.addEventListener("scroll", revealContent);

});


// Modal de foto em tela cheia - versão corrigida e com debug
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script do modal carregado");

  const modal = document.getElementById("photo-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.querySelector(".modal-close");

  if (!modal || !modalImg || !closeBtn) {
    console.error("ERRO: Elementos do modal não encontrados no DOM!");
    return;
  }

  const photos = document.querySelectorAll(".photo-block img");
  console.log(`Encontradas ${photos.length} fotos clicáveis`);

  photos.forEach((img, index) => {
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      console.log(`Foto ${index + 1} clicada`);

      modal.style.display = "flex";           // usa flex para centralizar
      modalImg.src = img.src;

      const captionEl = img.closest(".photo-block").querySelector(".photo-caption");
      modalCaption.textContent = captionEl ? captionEl.textContent.trim() : "";

      document.body.style.overflow = "hidden"; // bloqueia scroll da página
    });
  });

  // Fecha modal
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
});