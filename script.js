// --- Configuration ---
// Set the target date: Year, Month (0-11), Day, Hour, Minute
const targetDate = new Date(2026, 1, 15, 19, 0, 0); // Feb 15, 2026, 19:00

// --- Countdown Logic ---
function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        // Party has started!
        document.getElementById("countdown").innerHTML = '<div class="text-pink-500 font-heading text-xl">The Party is Here! 🎉</div>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- Music Player Logic ---
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

musicToggle.addEventListener("click", () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music text-pastel-pink text-xl"></i>';
        musicToggle.classList.remove("animate-spin"); // Optional: stop spin
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause text-pink-500 text-xl"></i>';
        musicToggle.classList.add("animate-spin"); // Optional: add spin for fun
    }
    isPlaying = !isPlaying;
});

// --- Gift Opening (Confetti) ---
function openGift() {
    const giftClosed = document.getElementById("giftClosed");
    const giftContent = document.getElementById("giftContent");

    // Hide button, show content
    giftClosed.classList.add("hidden");
    giftContent.classList.remove("hidden");
    giftContent.classList.add("block");

    // Trigger Confetti
    triggerConfetti();
    
    // Play sound effect override (optional or use bg music)
    if(!isPlaying) {
         // Auto play music on gift open if not already playing? 
         // Let's decide not to force audio, just visual confetti
    }
}

function triggerConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFB7B2', '#AEC6CF', '#FDFD96']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFB7B2', '#AEC6CF', '#FDFD96']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- Copy to Clipboard ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// --- RSVP WhatsApp ---
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("guestName").value;
    const attendance = document.getElementById("attendance").value;
    const wishes = document.getElementById("wishes").value;

    const phoneNumber = "628123456789"; // CHANGE THIS TO HOST NUMBER
    
    const message = `Halo DHS! 👋%0A%0A*RSVP Birthday V1*%0A------------------%0A👤 Nama: ${name}%0A💌 Status: ${attendance}%0A💭 Wishes: ${wishes}%0A%0ASee you there! 🥳`;
    
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(url, '_blank');
});
