console.clear();
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
new fullpage("#fullpage", {
  autoScrolling: true,
  scrollOverflow: false,
});
