import { throttle } from "./throttle.js";

export function initSwiperHandler() {
  window.addEventListener("DOMContentLoaded", () => {
    const swiperContainer = document.querySelector(".swiper");
    let swiper;

    const initSwiper = () => {
      const isSmallMobile = window.innerWidth <= 480;
      const direction = isSmallMobile ? "vertical" : "horizontal";

      if (swiper) swiper.destroy(true, true);

      swiper = new Swiper(".swiper", {
        direction,
        speed: 1500,
        spaceBetween: 0,
        mousewheel: false,
        navigation: {
          nextEl: ".next-arrow",
          prevEl: ".prev-arrow",
        },
      });
    };

    initSwiper();
    window.addEventListener("resize", initSwiper);

    let isMouseOverSwiper = false;
    let scrollTimeout;
    let lastWheelEventTime = 0;

    swiperContainer.addEventListener("mouseenter", () => {
      isMouseOverSwiper = true;
    });
    swiperContainer.addEventListener("mouseleave", () => {
      isMouseOverSwiper = false;
    });

    window.addEventListener(
      "wheel",
      (e) => {
        if (!isMouseOverSwiper) return;
        if (!swiper || swiper.params.direction !== "horizontal") return;
        if (Math.abs(e.deltaY) < 40) return;

        const now = Date.now();
        if (now - lastWheelEventTime < 500) {
          e.preventDefault();
          return;
        }
        lastWheelEventTime = now;

        const wheelDown = e.deltaY > 0;
        const wheelUp = e.deltaY < 0;

        if ((swiper.isBeginning && wheelUp) || (swiper.isEnd && wheelDown))
          return;

        e.preventDefault();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          wheelDown ? swiper.slideNext() : swiper.slidePrev();
        }, 50);
      },
      { passive: false }
    );

    let hasScrolledToSwiper = false;
    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      throttle(() => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;

        const rect = swiperContainer.getBoundingClientRect();
        const swiperTop = rect.top;
        const swiperInView =
          swiperTop < window.innerHeight * 0.6 &&
          swiperTop > window.innerHeight * 0.1;

        if (!hasScrolledToSwiper && swiperInView && scrollingDown) {
          hasScrolledToSwiper = true;
          swiperContainer.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          setTimeout(() => {
            hasScrolledToSwiper = false;
          }, 3000);
        }
      }, 1000),
      { passive: true }
    );
  });
}
//슬라이드 4
export function initSlide4Observer() {
  const target = document.querySelector(".swiper-slide-4");
  if (!target) return;

  const slide4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      target.classList.toggle("active", entry.isIntersecting);
    });
  });

  slide4.observe(target);
}
