console.clear();
//풀페이지
new fullpage("#fullpage", {
  autoScrolling: false,
  scrollOverflow: false,
});
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
