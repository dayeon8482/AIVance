console.clear();

// 커서 포인터
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

// 메뉴 버튼 초기화
function menuBtn_init() {
  $(".top-bar-menu-btn").click(function () {
    console.log("작동");
    $(".menu-wrap").toggleClass("active");
    $(this).toggleClass("active");

    if (!$(".top-bar-menu-btn").hasClass("open")) {
      $(".menu > li").removeClass("active"); // 서브메뉴 모두 닫기
    }
  });
}
menuBtn_init();

function subMenu_init() {
  $(".menu > li").click(function () {
    const $this = $(this);
    $this.siblings(".active").removeClass("active");
    $this.addClass("active");
  });
}
subMenu_init();

// 스크롤 이벤트 최적화 - throttle 함수 정의
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// 공통 스크롤 핸들러 (throttle 적용)
const onScroll = throttle(() => {
  const scrollTop = window.scrollY || window.pageYOffset;
  const isMobile = window.innerWidth <= 768;
  // solution-title 활성화
  const solutionTitle = document.querySelector(".solution-title");
  if (solutionTitle) {
    const titleTrigger = isMobile ? 450 : 400;
    if (scrollTop >= titleTrigger) solutionTitle.classList.add("active");
    else solutionTitle.classList.remove("active");
  }

  // 솔루션 카드 .card-inner 활성화 (2번, 3번 카드)
  const card2Inner = document.querySelector(".card:nth-child(2) > .card-inner");
  if (card2Inner) {
    const card2Trigger = isMobile ? 1700 : 1350;
    if (scrollTop >= card2Trigger) card2Inner.classList.add("active");
    else card2Inner.classList.remove("active");
  }

  const card3Inner = document.querySelector(".card:nth-child(3) > .card-inner");
  if (card3Inner) {
    const card3Trigger = isMobile ? 2500 : 2000;
    if (scrollTop >= card3Trigger) card3Inner.classList.add("active");
    else card3Inner.classList.remove("active");
  }
}, 100);

window.addEventListener("scroll", onScroll, { passive: true });

// 카드 애니메이션
const cards = document.querySelectorAll(".card");
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.2 }
);
cards.forEach((card) => cardObserver.observe(card));

// impact-section 그래프 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-section");
  if (!section) {
    console.warn(".impact-section 요소를 찾을 수 없습니다.");
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("graph-animate");
        } else {
          section.classList.remove("graph-animate");
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(section);
});

// Swiper 마우스 휠, 스크롤 이벤트 최적화
window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    speed: 1500,
    spaceBetween: 0,
    mousewheel: false,
    navigation: {
      nextEl: ".next-arrow",
      prevEl: ".prev-arrow",
    },
  });

  const swiperContainer = document.querySelector(".swiper");
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

      const WHEEL_SENSITIVITY = 40;
      if (Math.abs(e.deltaY) < WHEEL_SENSITIVITY) return;

      const now = Date.now();
      if (now - lastWheelEventTime < 500) {
        e.preventDefault();
        return;
      }
      lastWheelEventTime = now;

      const isFirstSlide = swiper.isBeginning;
      const isLastSlide = swiper.isEnd;
      const wheelDown = e.deltaY > 0;
      const wheelUp = e.deltaY < 0;

      if (isFirstSlide && wheelUp) return;
      if (isLastSlide && wheelDown) return;

      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (wheelDown) swiper.slideNext();
        else if (wheelUp) swiper.slidePrev();
      }, 50);
    },
    { passive: false }
  );

  // 스크롤 위치와 방향 체크
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

        swiperContainer.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
          hasScrolledToSwiper = false;
        }, 1000);
      }
    }, 200),
    { passive: true }
  );
});

// slide-4 애니메이션
const target = document.querySelector(".swiper-slide-4");
if (target) {
  const slide4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  });
  slide4.observe(target);
}
