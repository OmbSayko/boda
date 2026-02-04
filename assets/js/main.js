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

// Reproductor de música
const audio = document.getElementById("bg-audio");
const btn = document.getElementById("music-btn");

btn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btn.classList.add("playing");
        btn.textContent = "🔊 Música activada";
    } else {
        audio.pause();
        btn.classList.remove("playing");
        btn.textContent = "🎵 Nuestra canción";
    }
});
