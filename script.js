/**
 * SIMZ Academy — Core Interactive JavaScript (2026 Standards)
 * Preserves existing integrations while delivering modern UX & accessibility.
 */

(function () {
  'use strict';

  // --- Sticky Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Mobile Navigation Drawer ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileNav() {
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    if (mobileNav) mobileNav.classList.add('is-active');
    if (mobileOverlay) mobileOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    if (mobileNav) mobileNav.classList.remove('is-active');
    if (mobileOverlay) mobileOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function toggleMobileNav() {
    const isActive = hamburgerBtn && hamburgerBtn.classList.contains('is-active');
    if (isActive) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileNav);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Global backward-compatible ajsfun()
  window.ajsfun = function () {
    toggleMobileNav();
    // Legacy support if old dropdown element exists
    const drdw = document.getElementById('drdw');
    if (drdw) {
      drdw.style.display = drdw.style.display === 'block' ? 'none' : 'block';
    }
  };

  // --- Active Nav Link Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === '#')) {
      link.classList.add('active');
    }
  });

  // --- Legacy WhatsApp & Course Functions (Preserved) ---
  window.myFunction = function () {
    window.open(
      'https://wa.me/917907386458?text=Hello%20Simz%20Academy,%20I%20would%20like%20to%20know%20more%20about%20your%20courses.',
      '_blank'
    );
  };

  window.seone = function () {
    window.open(
      'https://youtube.com/playlist?list=PLxZB2yOT4GmWZNmwSrwdO0ohGlJKzVJZ3',
      '_blank'
    );
  };

  window.setwo = function () {
    window.open('https://youtu.be/an4O6BTySgo', '_blank');
  };

  // --- Course Filter Tabs (for course.html) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card[data-category]');

  if (filterBtns.length > 0 && courseCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        courseCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Video Modal Handler ---
  const videoModal = document.getElementById('video-modal');
  const videoFrame = document.getElementById('video-modal-iframe');

  window.openVideoModal = function (youtubeId) {
    if (!videoModal || !videoFrame) {
      window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
      return;
    }
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
    videoModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = function () {
    if (!videoModal || !videoFrame) return;
    videoModal.classList.remove('is-active');
    videoFrame.src = '';
    document.body.style.overflow = '';
  };

  if (videoModal) {
    videoModal.addEventListener('click', e => {
      if (e.target === videoModal || e.target.closest('.lightbox-close-btn')) {
        window.closeVideoModal();
      }
    });
  }

  // --- Gallery Lightbox Handler ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');

  let currentGalleryIndex = 0;
  let galleryItems = [];

  function initGallery() {
    galleryItems = Array.from(document.querySelectorAll('.gallery-item')).map(item => ({
      src: item.getAttribute('data-src') || item.querySelector('img')?.src || '',
      title: item.getAttribute('data-title') || item.querySelector('h5')?.innerText || 'SIMZ Academy',
      desc: item.getAttribute('data-desc') || item.querySelector('p')?.innerText || ''
    }));
  }

  window.openLightbox = function (index) {
    if (!lightboxModal || galleryItems.length === 0) return;
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];

    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentGalleryIndex + 1} of ${galleryItems.length}`;
    }

    lightboxModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  window.navigateLightbox = function (direction) {
    window.openLightbox(currentGalleryIndex + direction);
  };

  if (lightboxModal) {
    lightboxModal.addEventListener('click', e => {
      if (e.target === lightboxModal || e.target.closest('.lightbox-close-btn')) {
        window.closeLightbox();
      }
    });

    const prevBtn = lightboxModal.querySelector('.lightbox-prev-btn');
    const nextBtn = lightboxModal.querySelector('.lightbox-next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => window.navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => window.navigateLightbox(1));
  }

  // --- Global Keyboard Controls (Escape, Arrow Keys) ---
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMobileNav();
      window.closeVideoModal();
      window.closeLightbox();
    } else if (lightboxModal && lightboxModal.classList.contains('is-active')) {
      if (e.key === 'ArrowLeft') window.navigateLightbox(-1);
      if (e.key === 'ArrowRight') window.navigateLightbox(1);
    }
  });

  // --- Contact Form Submission Handler (Preserves Google Apps Script backend) ---
  const contactForms = document.querySelectorAll('.ajax-contact-form, #submit-form');

  contactForms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const alertBox = form.parentElement.querySelector('.form-alert') || form.querySelector('.form-alert');
      const originalBtnText = submitBtn ? (submitBtn.tagName === 'INPUT' ? submitBtn.value : submitBtn.innerHTML) : 'Submit';

      // Validation
      const nameInput = form.querySelector('[name="name"]');
      const whatsappInput = form.querySelector('[name="whatsapp"]');
      const emailInput = form.querySelector('[name="email"]');
      const messageInput = form.querySelector('[name="message"]');

      if (!nameInput?.value.trim() || !whatsappInput?.value.trim() || !messageInput?.value.trim()) {
        showFormAlert(alertBox, 'Please complete all required fields.', 'is-error');
        return;
      }

      // UI Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtn.tagName === 'INPUT') {
          submitBtn.value = 'Sending...';
        } else {
          submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending message...';
        }
      }

      const endpoint = 'https://script.google.com/macros/s/AKfycbzQWveQrKAnq7Vnj3ncuw8iQlYmjmwVetASpe2CFhrYgXIIPrTqFvcWGvs_rVObv5q3zw/exec';
      const formData = new FormData(form);

      try {
        // Post to Google Apps Script endpoint using fetch with no-cors / form-urlencoded
        const urlParams = new URLSearchParams(formData).toString();
        
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlParams
        });

        // If no-cors returns (opaque response), consider it successfully submitted
        showFormAlert(
          alertBox,
          '✓ Thank you! Your message has been sent successfully. SIMZ Academy will get back to you shortly.',
          'is-success'
        );
        form.reset();
      } catch (err) {
        console.error('Contact form submission error:', err);
        showFormAlert(
          alertBox,
          'Oops! Something went wrong while sending. Please contact us directly via WhatsApp or Phone.',
          'is-error'
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.tagName === 'INPUT') {
            submitBtn.value = originalBtnText;
          } else {
            submitBtn.innerHTML = originalBtnText;
          }
        }
      }
    });
  });

  function showFormAlert(alertBox, message, statusClass) {
    if (!alertBox) {
      alert(message);
      return;
    }
    alertBox.textContent = message;
    alertBox.className = `form-alert ${statusClass}`;
    alertBox.style.display = 'flex';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Initialize gallery on load
  window.addEventListener('DOMContentLoaded', () => {
    initGallery();
  });
})();
