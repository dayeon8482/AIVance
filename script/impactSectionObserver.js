export function initImpactSectionObserver() {
  const section = document.querySelector(".impact-section");
  if (!section) return;

  requestAnimationFrame(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          section.classList.toggle("graph-animate", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
  });
}
