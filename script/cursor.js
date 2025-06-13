export function initCustomCursor() {
  document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".custom-cursor");
    if (cursor) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }
  });
}
