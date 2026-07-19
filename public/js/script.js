/* 3RD EYE CCTV - Main Script */

document.addEventListener('DOMContentLoaded', () => {
  // === Navbar scroll effect ===
  const navbar = document.querySelector('.navbar');
  const backTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar && navbar.classList.add('scrolled');
      backTop && backTop.classList.add('visible');
    } else {
      navbar && navbar.classList.remove('scrolled');
      backTop && backTop.classList.remove('visible');
    }
  });

  // === Mobile menu ===
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // === Back to top ===
  if (backTop) {
    backTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // === FAQ accordion ===
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    q && q.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // === Reveal on scroll ===
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // === Simple slider ===
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots span');
  let currentSlide = 0;
  if (slides.length) {
    const goTo = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      dots[i] && dots[i].classList.add('active');
      currentSlide = i;
    };
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    setInterval(() => goTo((currentSlide + 1) % slides.length), 4500);
  }

  const form = document.querySelector("#contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = "Opening WhatsApp...";
      btn.disabled = true;

      const inputs = form.querySelectorAll(".form-control");

      const name = inputs[0].value;
      const email = inputs[1].value;
      const phone = inputs[2].value;
      const service = inputs[3].value;
      const message = inputs[4].value;

      // Replace with your client's WhatsApp number (country code included)
      const ownerNumber = "919490018888";

      const whatsappMessage = ` *3rd Eye CCTV Solutions*

      ━━━━━━━━━━━━━━━━━━━━

       *Customer Details*

      • Name : ${name}
      • Phone : ${phone}
      • Email : ${email}
      • Service : ${service}

       *Requirement*

      ${message}

      ━━━━━━━━━━━━━━━━━━━━

      Thank you for contacting us.
      Our team will reach you shortly.`;

      const url = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(url, "_blank");

      form.reset();

      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }

  // === Set active nav link ===
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});