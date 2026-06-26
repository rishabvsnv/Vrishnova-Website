/* ======================================================
   VRISHNOVA LABS
   script.js
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     PAGE LOADER
  ========================================== */

  const loader = document.getElementById("page-loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("loader-hidden");

      setTimeout(() => {
        if (loader) {
          loader.style.display = "none";
        }
      }, 600);
    }, 800);
  });

  /* ==========================================
     THEME TOGGLE
  ========================================== */

  const themeToggle = document.getElementById("themeToggle");

  const savedTheme =
    localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute(
    "data-theme",
    savedTheme
  );

  themeToggle?.addEventListener("click", () => {

    const currentTheme =
      document.documentElement.getAttribute(
        "data-theme"
      );

    const newTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem(
      "theme",
      newTheme
    );
  });

  /* ==========================================
     STICKY NAVBAR
  ========================================== */

  const navbar =
    document.getElementById("navbar");

  function handleNavbar() {

    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  }

  handleNavbar();

  window.addEventListener(
    "scroll",
    handleNavbar
  );

  /* ==========================================
     MOBILE MENU
  ========================================== */

  const hamburger =
    document.getElementById("hamburger");

  const mobileMenu =
    document.getElementById("mobileMenu");

  hamburger?.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    mobileMenu?.classList.toggle("active");
  });

  document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu?.classList.remove("active");

        hamburger?.classList.remove("active");
      });
    });

  /* ==========================================
     COUNTER ANIMATION
  ========================================== */

  const counters =
    document.querySelectorAll(".stat-number");

  let counterStarted = false;

  function animateCounters() {

    if (counterStarted) return;

    const statsSection =
      document.getElementById("stats");

    if (!statsSection) return;

    const rect =
      statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {

      counterStarted = true;

      counters.forEach(counter => {

        const target =
          Number(
            counter.dataset.target
          );

        let current = 0;

        const increment =
          target / 80;

        const update = () => {

          current += increment;

          if (current < target) {

            counter.textContent =
              Math.floor(current);

            requestAnimationFrame(update);

          } else {

            counter.textContent =
              target;
          }
        };

        update();
      });
    }
  }

  window.addEventListener(
    "scroll",
    animateCounters
  );

  animateCounters();

  /* ==========================================
     FAQ ACCORDION
  ========================================== */

  document
    .querySelectorAll(".faq-item")
    .forEach(item => {

      const button =
        item.querySelector(
          ".faq-question"
        );

      const answer =
        item.querySelector(
          ".faq-answer"
        );

      button?.addEventListener(
        "click",
        () => {

          const isActive =
            item.classList.contains(
              "active"
            );

          document
            .querySelectorAll(".faq-item")
            .forEach(faq => {

              faq.classList.remove(
                "active"
              );

              const ans =
                faq.querySelector(
                  ".faq-answer"
                );

              if (ans) {
                ans.style.maxHeight = null;
              }
            });

          if (!isActive) {

            item.classList.add(
              "active"
            );

            answer.style.maxHeight =
              answer.scrollHeight +
              "px";
          }
        }
      );
    });

  /* ==========================================
     TESTIMONIAL SLIDER
  ========================================== */

  const track =
    document.getElementById(
      "testimonialsTrack"
    );

  const nextBtn =
    document.getElementById(
      "nextTestimonial"
    );

  const prevBtn =
    document.getElementById(
      "prevTestimonial"
    );

  const dotsContainer =
    document.getElementById(
      "testimonialDots"
    );

  if (track) {

    const cards =
      track.querySelectorAll(
        ".testimonial-card"
      );

    let currentIndex = 0;

    cards.forEach((_, index) => {

      const dot =
        document.createElement("span");

      if (index === 0)
        dot.classList.add("active");

      dot.addEventListener(
        "click",
        () => {
          goToSlide(index);
        }
      );

      dotsContainer?.appendChild(dot);
    });

    const dots =
      dotsContainer?.querySelectorAll(
        "span"
      );

    function goToSlide(index) {

      currentIndex = index;

      const width =
        cards[0].offsetWidth + 24;

      track.scrollTo({
        left: width * index,
        behavior: "smooth"
      });

      dots?.forEach(dot =>
        dot.classList.remove("active")
      );

      dots?.[index]?.classList.add(
        "active"
      );
    }

    nextBtn?.addEventListener(
      "click",
      () => {

        currentIndex++;

        if (
          currentIndex >= cards.length
        ) {
          currentIndex = 0;
        }

        goToSlide(currentIndex);
      }
    );

    prevBtn?.addEventListener(
      "click",
      () => {

        currentIndex--;

        if (currentIndex < 0) {
          currentIndex =
            cards.length - 1;
        }

        goToSlide(currentIndex);
      }
    );

    setInterval(() => {

      currentIndex++;

      if (
        currentIndex >= cards.length
      ) {
        currentIndex = 0;
      }

      goToSlide(currentIndex);

    }, 5000);
  }

  /* ==========================================
     BACK TO TOP
  ========================================== */

  const backToTop =
    document.getElementById(
      "backToTop"
    );

  function handleBackToTop() {

    if (window.scrollY > 500) {

      backToTop?.classList.add(
        "show"
      );

    } else {

      backToTop?.classList.remove(
        "show"
      );
    }
  }

  window.addEventListener(
    "scroll",
    handleBackToTop
  );

  backToTop?.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );

  /* ==========================================
     SCROLL REVEAL
  ========================================== */

  const revealElements =
    document.querySelectorAll(
      "[data-aos]"
    );

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            revealObserver.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.15
      }
    );

  revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform =
      "translateY(40px)";
    el.style.transition =
      "all .8s ease";

    revealObserver.observe(el);
  });

  /* ==========================================
     ACTIVE NAV LINK
  ========================================== */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );

  function updateActiveLink() {

    let current = "";

    sections.forEach(section => {

      const top =
        section.offsetTop - 150;

      const height =
        section.offsetHeight;

      if (
        window.scrollY >= top &&
        window.scrollY <
          top + height
      ) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {

      link.classList.remove(
        "active"
      );

      if (
        link.getAttribute("href") ===
        "#" + current
      ) {
        link.classList.add(
          "active"
        );
      }
    });
  }

  window.addEventListener(
    "scroll",
    updateActiveLink
  );

  /* ==========================================
     PARTICLE BACKGROUND
  ========================================== */

  const canvas =
    document.getElementById(
      "particleCanvas"
    );

  if (canvas) {

    const ctx =
      canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

      canvas.width =
        window.innerWidth;

      canvas.height =
        document.getElementById(
          "hero"
        ).offsetHeight;
    }

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    for (let i = 0; i < 80; i++) {

      particles.push({
        x:
          Math.random() *
          canvas.width,
        y:
          Math.random() *
          canvas.height,
        radius:
          Math.random() * 3 + 1,
        dx:
          (Math.random() - 0.5) *
          0.5,
        dy:
          (Math.random() - 0.5) *
          0.5
      });
    }

    function animateParticles() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(
          p.x,
          p.y,
          p.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(37,99,235,.4)";

        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (
          p.x < 0 ||
          p.x > canvas.width
        )
          p.dx *= -1;

        if (
          p.y < 0 ||
          p.y > canvas.height
        )
          p.dy *= -1;
      });

      requestAnimationFrame(
        animateParticles
      );
    }

    animateParticles();
  }

});