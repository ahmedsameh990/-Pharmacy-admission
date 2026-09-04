/* ============================================
   Pharmacy Admission — Script
   Navigation, Lightbox, Language Toggle
   ============================================ */

// --- State ---
let currentPage = 'home';
let currentLang = 'ar';

// --- Navigation ---
function navigateTo(pageId) {
    const currentEl = document.getElementById('page-' + currentPage);
    const targetEl = document.getElementById('page-' + pageId);

    if (!currentEl || !targetEl || currentPage === pageId) return;

    // Fade out current
    currentEl.classList.add('fade-out');
    currentEl.classList.remove('fade-in');

    setTimeout(() => {
        currentEl.classList.remove('active', 'fade-out');

        // Fade in target
        targetEl.classList.add('active', 'fade-in');
        targetEl.classList.remove('fade-out');
        
        currentPage = pageId;

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 280);
}

// --- Lightbox ---
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// --- Language Toggle ---
function toggleLang() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const htmlEl = document.documentElement;
    
    if (currentLang === 'en') {
        htmlEl.setAttribute('dir', 'ltr');
        htmlEl.setAttribute('lang', 'en');
    } else {
        htmlEl.setAttribute('dir', 'rtl');
        htmlEl.setAttribute('lang', 'ar');
    }

    // Update all elements with data-ar / data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + currentLang);
    });

    // Flip back arrow direction
    document.querySelectorAll('.back-arrow').forEach(arrow => {
        arrow.textContent = currentLang === 'ar' ? '→' : '←';
    });

    // Update icon positioning for nav buttons
    document.querySelectorAll('.nav-btn .icon').forEach(icon => {
        if (currentLang === 'en') {
            icon.style.right = 'auto';
            icon.style.left = '20px';
        } else {
            icon.style.right = '20px';
            icon.style.left = 'auto';
        }
    });
}

// --- Pinch-to-zoom support for lightbox ---
let lightboxScale = 1;
let lightboxStartDist = 0;

document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        lightboxStartDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    }
}, { passive: false });

document.getElementById('lightbox').addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        lightboxScale = Math.min(Math.max(dist / lightboxStartDist, 0.5), 4);
        document.getElementById('lightbox-img').style.transform = `scale(${lightboxScale})`;
    }
}, { passive: false });

document.getElementById('lightbox').addEventListener('touchend', () => {
    if (lightboxScale < 1) {
        lightboxScale = 1;
        document.getElementById('lightbox-img').style.transform = 'scale(1)';
    }
});

// Prevent lightbox close when tapping on the image itself
document.getElementById('lightbox-img').addEventListener('click', (e) => {
    e.stopPropagation();
});

// --- Entrance animation on load ---
window.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('page-home');
    homePage.classList.add('fade-in');

    // Stagger nav button animations
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            btn.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 300 + (index * 120));
    });
});
