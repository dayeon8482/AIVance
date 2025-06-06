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
