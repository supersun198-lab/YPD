const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const bannerSlides = Array.from(document.querySelectorAll('[data-banner-slide]'));
const bannerDots = Array.from(document.querySelectorAll('.banner-indicators .banner-dot'));
const bannerArrowLeft = document.querySelector('.banner-arrow-left');
const bannerArrowRight = document.querySelector('.banner-arrow-right');
let bannerIndex = 0;
let bannerTimer;

function showBanner(index) {
  if (!bannerSlides.length) return;
  bannerIndex = (index + bannerSlides.length) % bannerSlides.length;

  bannerSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('banner-slide-active', slideIndex === bannerIndex);
  });

  bannerDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === bannerIndex);
  });
}

function startBannerAutoplay() {
  if (bannerSlides.length <= 1) return;
  clearInterval(bannerTimer);
  bannerTimer = setInterval(() => {
    showBanner(bannerIndex + 1);
  }, 5000);
}

if (bannerArrowLeft) {
  bannerArrowLeft.addEventListener('click', () => {
    showBanner(bannerIndex - 1);
    startBannerAutoplay();
  });
}

if (bannerArrowRight) {
  bannerArrowRight.addEventListener('click', () => {
    showBanner(bannerIndex + 1);
    startBannerAutoplay();
  });
}

bannerDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showBanner(Number(dot.dataset.bannerDot));
    startBannerAutoplay();
  });
});

showBanner(0);
startBannerAutoplay();

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleBackToTop();
}

const toolButtons = document.querySelectorAll('[data-tool]');
let openPopup = null;

toolButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    const popup = btn.closest('.tool-wrap').querySelector('.tool-popup');
    if (!popup) return;

    if (openPopup === popup) {
      popup.classList.remove('open');
      openPopup = null;
      return;
    }

    if (openPopup) {
      openPopup.classList.remove('open');
    }

    popup.classList.add('open');
    openPopup = popup;
  });
});

document.addEventListener('click', () => {
  if (openPopup) {
    openPopup.classList.remove('open');
    openPopup = null;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
});

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});
