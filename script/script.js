console.clear();
//커서 포인터
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

//메뉴
function menuBtn_init() {
  $(".top-bar-menu-btn").click(function () {
    console.log("작동");
    $(".menu-wrap").toggleClass("active");
    $(this).toggleClass("active");

    if (!$(".top-bar-menu-btn").hasClass("open")) {
      $(".menu > li").removeClass("active"); // ← 서브메뉴 모두 닫기
    }
  });
}
menuBtn_init();

// 서브메뉴
function subMenu_init() {
  $(".menu > li").click(function () {
    let $this = $(this);

    const $menuBox = $this.closest(".menu");
    const $subMenu = $menuBox.find(".sub-menu");

    $this.siblings(".active").removeClass("active");
    $this.addClass("active");
  });
}
subMenu_init();
/*솔루션 타이틀 스크롤 이벤트*/
$(window).on("scroll", function () {
  if ($(window).scrollTop() >= 400) {
    $(".solution-title").addClass("active");
  } else {
    $(".solution-title").removeClass("active");
  }
});
/* 솔루션 카드  애니메이션*/
const cards = document.querySelectorAll(".card");
document.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
});

// 각 카드에 옵저버 적용
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
  {
    threshold: 0.2,
  }
);

cards.forEach((card) => cardObserver.observe(card));

/*솔루션 카드 스크롤 이벤트*/
$(window).on("scroll", function () {
  if ($(window).scrollTop() >= 1450) {
    $(".card:nth-child(2)>.card-inner").addClass("active");
  } else {
    $(".card:nth-child(2)>.card-inner").removeClass("active");
  }
});
$(window).on("scroll", function () {
  if ($(window).scrollTop() >= 2100) {
    $(".card:nth-child(3)>.card-inner").addClass("active");
  } else {
    $(".card:nth-child(3)>.card-inner").removeClass("active");
  }
});
/*그래프 애니메이션 효과 */
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
    {
      threshold: 0.5,
    }
  );

  observer.observe(section);
});

//history 스와이퍼
window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    speed: 1500,
    spaceBetween: 0,
    mousewheel: true, // swiper 내장 마우스휠 기능 끄기
  });

  const swiperSection = document.querySelector(".swiper-wapper");

  let scrollTimeout;

  window.addEventListener(
    "wheel",
    (e) => {
      const rect = swiperSection.getBoundingClientRect();
      const inSwiperSection =
        rect.top <= window.innerHeight && rect.bottom >= 0;

      if (!inSwiperSection) {
        // 가로 스크롤 구간 아니면 그냥 세로 스크롤
        return;
      }

      // 가로 스크롤 구간 내부

      const isFirstSlide = swiper.isBeginning;
      const isLastSlide = swiper.isEnd;

      // 휠 방향 판단
      const wheelDown = e.deltaY > 0;
      const wheelUp = e.deltaY < 0;

      // 첫 슬라이드 + 위로 스크롤이면 세로 스크롤 허용 (휠 이벤트 막지 않음)
      if (isFirstSlide && wheelUp) {
        return; // 세로 스크롤 유지
      }

      // 마지막 슬라이드 + 아래로 스크롤이면 세로 스크롤 허용
      if (isLastSlide && wheelDown) {
        return; // 세로 스크롤 유지
      }

      // 그 외 상황: 가로 슬라이드 전환 처리
      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (wheelDown) {
          swiper.slideNext();
        } else if (wheelUp) {
          swiper.slidePrev();
        }
      }, 50);
    },
    { passive: false }
  );
});
//history 슬라이드 4 효과
const target = document.querySelector(".swiper-slide-4");

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
