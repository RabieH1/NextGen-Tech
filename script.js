function openWhatsApp() {
    const phone = "33662188467"; // numéro sans le 0 et sans +
    const message = encodeURIComponent("Bonjour, je suis intéressé par vos services informatiques.");
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
}
