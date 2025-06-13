import { throttle } from "./throttle.js";

export function initScrollHandler() {
  const onScroll = throttle(() => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    const solutionTitle = document.querySelector(".solution-title");
    if (solutionTitle) {
      const trigger = isSmallMobile ? 280 : isMobile ? 450 : 400;
      if (scrollTop >= trigger) {
        solutionTitle.classList.add("active");
      } else {
        solutionTitle.classList.remove("active");
      }
    }

    const card2 = document.querySelector(".card:nth-child(2) > .card-inner");
    if (card2) {
      const trigger = isSmallMobile ? 1400 : isMobile ? 1700 : 1350;
      card2.classList.toggle("active", scrollTop >= trigger);
    }

    const card3 = document.querySelector(".card:nth-child(3) > .card-inner");
    if (card3) {
      const trigger = isSmallMobile ? 2000 : isMobile ? 2500 : 2000;
      card3.classList.toggle("active", scrollTop >= trigger);
    }

    const experienceTitle = document.querySelector(".experience-text-box");
    if (experienceTitle) {
      const trigger = isSmallMobile ? 3000 : isMobile ? 4000 : 5400;
      experienceTitle.classList.toggle("active", scrollTop >= trigger);
    }
  }, 100);

  window.addEventListener("scroll", onScroll, { passive: true });
}
