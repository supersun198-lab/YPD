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
const bannerDots = Array.from(document.querySelectorAll('[data-banner-dot]'));
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

bannerDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showBanner(Number(dot.dataset.bannerDot));
    startBannerAutoplay();
  });
});

showBanner(0);
startBannerAutoplay();

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
