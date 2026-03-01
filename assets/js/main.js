function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const container = document.querySelector('.container');
    const invitation = document.getElementById('invitation');

    envelope.classList.add('open');

    setTimeout(() => {
        envelopeWrapper.classList.add('opened');
        container.classList.add('opened');
    }, 200);

    setTimeout(() => {
        invitation.classList.add('show');
    }, 800);
}

// Animación de aparición de secciones
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Prevenir scroll hasta que se abra el sobre
const invitation = document.getElementById('invitation');
invitation.addEventListener('wheel', (e) => {
    if (!invitation.classList.contains('show')) {
        e.preventDefault();
    }
});

// Contador Regresivo
function updateCountdown() {
    const weddingDate = new Date('2026-05-16T13:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.querySelector('.countdown-message').textContent = '¡Ya es nuestro gran día!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Actualizar el contador cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Script fotos
    function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        // 🔹 Mostrar miniatura
        const img = document.createElement("img");
    img.src = e.target.result;
    document.getElementById("previewContainer").appendChild(img);

    // 🔹 Subir a Drive
    const base64 = e.target.result.split(',')[1];

    fetch("https://script.google.com/macros/s/AKfycbw35dXirBqu4gVr3hRgkJhqIjbFdlatTDHaKSo7mNZpy_sozpkNZqtU5b7chqqX9bEi/exec", {
        method: "POST",
    body: new URLSearchParams({
        data: base64,
    name: file.name,
    type: file.type
            })
        });
    };

    reader.readAsDataURL(file);
}

// Fecha del evento
function openGoogleCalendar() {
    const title = encodeURIComponent("Nuestra Boda" + " - " + "Yesica" + " & " + "Oscar" + "💍");
    const location = encodeURIComponent("Parroquia de San Antonio de Padua," + " Calle Miguel Hidalgo 1," + " San Antonio Acahualco," + " Zinacantepec, Méx.");
    const details = encodeURIComponent("¡Acompáñanos en nuestro día especial!");

    // Formato: YYYYMMDDTHHMMSS
    const startDate = "20260516T130000";
    const endDate = "20260516T180000";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

    window.open(url, "_blank");
}
