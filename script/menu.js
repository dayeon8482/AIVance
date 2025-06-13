export function initMenuButton() {
  $(".top-bar-menu-btn").click(function () {
    $(".menu-wrap").toggleClass("active");
    $(this).toggleClass("active");

    if (!$(this).hasClass("open")) {
      $(".menu > li").removeClass("active");
    }
  });
}

export function initSubMenu() {
  $(".menu > li").click(function () {
    const $this = $(this);
    $this.siblings(".active").removeClass("active");
    $this.addClass("active");
  });
}
