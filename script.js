// DOM Elements
const giftContainer = document.getElementById('giftContainer');
const landingPage = document.getElementById('landingPage');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bg-music');

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

// Event Klik Kado
giftContainer.addEventListener('click', function() {
    giftContainer.classList.add('open');

    if (bgMusic) {
        bgMusic.play().catch(function(error) {
            console.log("Autoplay dicegah oleh browser:", error);
        });
    }

    triggerConfetti();

    setTimeout(function() {
        landingPage.classList.add('fade-out');
        mainContent.classList.add('visible');
    }, 800);
});

// Event Listener Modal Surat
openModalBtn.addEventListener('click', function() {
    modalOverlay.classList.add('active');
});

closeModalBtn.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// ==========================================
// BINTANG KELAP-KELIP BACKGROUND
// ==========================================
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let stars = [];

function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    let starCount = Math.floor((bgCanvas.width * bgCanvas.height) / 3000);
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: 0.005 + Math.random() * 0.015
        });
    }
}

function drawStars() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        bgCtx.beginPath();
        bgCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        bgCtx.fillStyle = 'rgba(255, 255, 255, ' + star.alpha + ')';
        bgCtx.fill();

        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
            star.speed = -star.speed;
        }
    }
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeBgCanvas);
resizeBgCanvas();
drawStars();

// ==========================================
// EFEK CONFETTI
// ==========================================
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let particles = [];

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

function triggerConfetti() {
    particles = [];
    let colors = ['#ff758c', '#ff7eb3', '#ffd700', '#ffffff', '#a8e6cf', '#d4a559'];
    
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: confettiCanvas.width / 2,
            y: confettiCanvas.height / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.7) * 18,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.2,
            drag: 0.96,
            opacity: 1,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    animateConfetti();
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let activeParticles = false;

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.008;
        p.rotation += p.rotationSpeed;

        if (p.opacity > 0) {
            activeParticles = true;
            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate((p.rotation * Math.PI) / 180);
            confettiCtx.globalAlpha = p.opacity;
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            confettiCtx.restore();
        }
    }

    if (activeParticles) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}
