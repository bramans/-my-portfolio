// ============================================================
//  SCRIPT.JS — Portfolio Interactions
//  This file handles:
//  1. Smooth scrolling for navbar links
//  2. Hamburger menu toggle (mobile)
//  3. Typewriter animation for "Software Developer"
// ============================================================


// ============================================================
//  1. SMOOTH SCROLLING
// ============================================================
// We grab all anchor links inside .navigation that start with "#"
// Then when clicked, we stop the default jump and smoothly scroll instead.

const navLinks = document.querySelectorAll('.navigation a[href^="#"]');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {

        // Prevent the browser's default instant jump behavior
        event.preventDefault();

        // Get the target section id from the href attribute
        // e.g. href="#services" → targetId = "#services"
        const targetId = this.getAttribute('href');

        // Find the actual HTML element with that id
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // scrollIntoView with behavior:'smooth' animates the scroll
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'   // aligns the top of the section to the top of the viewport
            });
        }

        // If the mobile menu is open, close it after clicking a link
        const nav = document.getElementById('navbar');
        nav.classList.remove('open');
    });
});


// ============================================================
//  2. HAMBURGER MENU TOGGLE (Mobile)
// ============================================================
// On mobile, we hide the nav and show a hamburger icon (3 lines).
// When clicked, we toggle a CSS class "open" on the nav,
// which makes it visible (defined in CSS: .navigation.open { display: flex })

const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', function() {
    // toggle() adds the class if it's not there, removes it if it is
    navbar.classList.toggle('open');
});


// ============================================================
//  3. TYPEWRITER ANIMATION
// ============================================================
// How it works step by step:
//
//   PHASE 1 — TYPING:
//   We add one letter every X milliseconds until the full word is shown.
//
//   PHASE 2 — PAUSE:
//   We wait a moment so the user can read the full word.
//
//   PHASE 3 — DELETING:
//   We remove one letter every X milliseconds until the word is empty.
//
//   PHASE 4 — PAUSE:
//   We wait a moment before typing again.
//
//   Then we loop back to PHASE 1 forever.

// The element where the text will appear
const typewriterElement = document.getElementById('typewriter');

// The text to type (you can add more words to this array later)
const words = ['Software Developer', 'Data Scientist', 'Creative Coder'];

// Track which word we are currently on
let wordIndex = 0;

// Track which character position we are at inside the current word
let charIndex = 0;

// Track whether we are currently typing or deleting
let isDeleting = false;


function typeWriter() {

    // Get the current word based on wordIndex
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        // --- TYPING PHASE ---
        // Add one more character: slice from 0 to charIndex + 1
        // Example: "Software Developer".slice(0, 3) → "Sof"
        typewriterElement.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            // We've finished typing the full word — pause, then start deleting
            isDeleting = true;
            setTimeout(typeWriter, 1500); // pause 1.5 seconds before deleting
            return; // stop here for now, setTimeout will call us again
        }

    } else {
        // --- DELETING PHASE ---
        // Remove one character: slice from 0 to charIndex - 1
        typewriterElement.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            // We've deleted everything — move to the next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // loop back to 0 after last word
            setTimeout(typeWriter, 400); // short pause before typing next word
            return;
        }
    }

    // Speed control:
    // Typing is slower (100ms per letter), deleting is faster (50ms per letter)
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

// Start the animation when the page loads
typeWriter();
