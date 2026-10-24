// Typing effect for the name in the hero section
const typingPhrases = [
    "Muhammad Fuzail",
    "a Frontend Web Developer",
    "a Full-Stack Enthusiast"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function handleHeaderTyping() {
    const targetElement = document.querySelector('.typing-text');
    if (!targetElement) return;

    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(handleHeaderTyping, 2800); // pause on full phrase before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        setTimeout(handleHeaderTyping, 700);
    } else {
        setTimeout(handleHeaderTyping, isDeleting ? 70 : 140);
    }
}

// Custom cursor + scroll-reveal animations
document.addEventListener('DOMContentLoaded', () => {
    handleHeaderTyping();

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    // Fade/slide elements into view as they enter the viewport
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
});