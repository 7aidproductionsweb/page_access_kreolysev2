// URL à lancer après acceptation
const REDIRECT_URL = "https://guileless-jalebi-f6c02d.netlify.app"; // modifie ici

const loginForm = document.getElementById("loginForm");
const overlay = document.getElementById("betaOverlay");
const modal = document.getElementById("betaModal");
const acceptCheckbox = document.getElementById("acceptCheckbox");
const closeModalBtn = document.getElementById("closeModal");
const card = document.getElementById("card");
let currentUser = null;

/* === Animations d'accueil (GSAP) === */
window.addEventListener("DOMContentLoaded", () => {
  // carte qui apparaît en douceur
  gsap.to(card, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });

  // respirations douces du bouton
  gsap.to(".btn-primary", {
    keyframes: [{ scale: 1.01 }, { scale: 1 }],
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.6
  });

  // orbes flottants lents
  const float = (sel, x=20, y=12, d=8, delay=0) => {
    gsap.to(sel, { x, y, duration: d, ease: "sine.inOut", yoyo: true, repeat: -1, delay });
  };
  float(".orb-a", 28, -10, 10, 0.2);
  float(".orb-b", -22, 14, 11, 0.4);
  float(".orb-c", 18, 10, 9, 0.6);

  // === Nouveau : animation du logo PNG (remplace lottie visuellement) ===
  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo) {
    // flottement + légère respiration (préserve l'idée d'une anim continue)
    gsap.to(brandLogo, {
      keyframes: [
        { y: -3, rotation: -2, scale: 1.02, duration: 2.2, ease: "sine.inOut" },
        { y: 0, rotation: 0, scale: 1.00, duration: 2.2, ease: "sine.inOut" }
      ],
      repeat: -1
    });
  }

  // === Nouveau : sous-logo qui flotte "smooth" comme les bulles ===
  const subLogo = document.getElementById("subLogo");
  const subHint = document.getElementById("subLogoHint");
  const mailOverlay = document.getElementById("mailOverlay");
  const mailModal = document.getElementById("mailModal");
  const mailYes = document.getElementById("mailYes");
  const mailNo = document.getElementById("mailNo");

  if (subLogo) {
    // flottement continu
    const tlFloat = gsap.timeline({ repeat: -1, yoyo: true });
    tlFloat.to(subLogo, { x: 10, y: -6, rotation: -1.5, duration: 5.5, ease: "sine.inOut" })
           .to(subLogo, { x: -8, y: 6, rotation: 1.5, duration: 5.5, ease: "sine.inOut" });

    // hover : afficher le texte en coulissant
    const showHint = () => gsap.to(subHint, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    const hideHint = () => gsap.to(subHint, { opacity: 0, y: 8, duration: 0.25, ease: "power2.in" });
    subLogo.addEventListener("mouseenter", showHint);
    subLogo.addEventListener("mouseleave", hideHint);
    subLogo.addEventListener("focus", showHint);
    subLogo.addEventListener("blur", hideHint);

    // click : petite fenêtre "envoyer un email"
    const openMailModal = () => {
      mailOverlay.classList.add("show");
      gsap.to(mailOverlay, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(mailModal, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
    };
    const closeMailModal = () => {
      gsap.to(mailModal, { y: 24, scale: 0.98, opacity: 0, duration: 0.25, ease: "power2.in" });
      gsap.to(mailOverlay, {
        opacity: 0, duration: 0.30, ease: "power2.in",
        onComplete: () => mailOverlay.classList.remove("show")
      });
    };

    subLogo.addEventListener("click", openMailModal);
    mailNo.addEventListener("click", closeMailModal);
    mailOverlay.addEventListener("click", (e) => {
      if (e.target === mailOverlay) closeMailModal();
    });
    mailYes.addEventListener("click", () => {
      // ouverture classique d'un email
      window.open("mailto:7idproductions@gmail.com", "_blank");
      closeMailModal();
    });
  }
});

/* === Flux existant (inchangé) === */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (!username) return;
  currentUser = username;

  // ouverture élégante de la modale
  overlay.classList.add("show");
  gsap.to(overlay, { opacity: 1, duration: 0.25, ease: "power2.out" });
  gsap.to(modal, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
});

acceptCheckbox.addEventListener("change", function () {
  closeModalBtn.disabled = !this.checked;
});

closeModalBtn.addEventListener("click", () => {
  if (closeModalBtn.disabled) return;

  // fermeture élégante
  gsap.to(modal, { y: 24, scale: 0.98, opacity: 0, duration: 0.25, ease: "power2.in" });
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.30,
    ease: "power2.in",
    onComplete: () => {
      overlay.classList.remove("show");
      // redirection
      window.location.href = REDIRECT_URL; // vous pouvez utiliser currentUser si besoin
    }
  });
});

/* Micro-interactions */
const input = document.getElementById("username");
input.addEventListener("focus", () => {
  gsap.to(input, { boxShadow: "0 0 0 6px rgba(123,92,255,0.20)", duration: 0.2 });
});
input.addEventListener("blur", () => {
  gsap.to(input, { boxShadow: "0 0 0 4px rgba(123,92,255,0.20)", duration: 0.2 });
});



