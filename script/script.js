console.clear();
//풀페이지
// new fullpage("#fullpage", {
//   autoScrolling: false,
//   scrollOverflow: false,
// });
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
  if ($(window).scrollTop() >= 430) {
    $(".solution-title").addClass("active");
  } else {
    $(".solution-title").removeClass("active");
  }
});
/* 솔루션 카드  애니메이션*/
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
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
    threshold: 0.1,
  }
);

// 각 카드에 옵저버 적용
cards.forEach((card) => observer.observe(card));

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
