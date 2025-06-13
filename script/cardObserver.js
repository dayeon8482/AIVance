// cardObserver.js
export function initCardObserver() {
  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));
}

export function handleCardScrollEffects() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  const card2Inner = document.querySelector(".card:nth-child(2) > .card-inner");
  if (card2Inner) {
    const trigger = isSmallMobile ? 1400 : isMobile ? 1700 : 1350;
    card2Inner.classList.toggle("active", scrollTop >= trigger);
  }

  const card3Inner = document.querySelector(".card:nth-child(3) > .card-inner");
  if (card3Inner) {
    const trigger = isSmallMobile ? 2000 : isMobile ? 2500 : 2000;
    card3Inner.classList.toggle("active", scrollTop >= trigger);
  }
}
