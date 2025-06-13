import { initCustomCursor } from "./cursor.js";
import { handleCardScrollEffects, initCardObserver } from "./cardObserver.js";
import { initMenuButton, initSubMenu } from "./menu.js";
import { initScrollHandler } from "./scrollHandler.js";
import { throttle } from "./throttle.js";
import { initImpactSectionObserver } from "./impactSectionObserver.js";
import { initSlide4Observer, initSwiperHandler } from "./swiperHandler.js";

console.clear();

document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  initMenuButton();
  initSubMenu();
  initScrollHandler();
  initCardObserver();
  window.addEventListener("scroll", throttle(handleCardScrollEffects, 100));
  handleCardScrollEffects(); // 초기 상태 체크
  initImpactSectionObserver();
  initSwiperHandler();
  initSlide4Observer();
});
