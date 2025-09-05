// Scroll fluide pour les ancres internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Ouvrir une conversation WhatsApp
function openWhatsApp() {
  const phone = "33662188467"; // Numéro sans le 0 initial ni le +
  const message = encodeURIComponent("Bonjour, je suis intéressé par vos services informatiques.");
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
}
