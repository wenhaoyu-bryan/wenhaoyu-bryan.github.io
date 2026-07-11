// Scroll-reveal for the homepage (en + zh both import this module).
//
// Marks each element with data-revealed once processed so repeat firings
// (e.g. navigating home -> away -> home again within one SPA session) never
// re-hide already-visible content — the bug this replaced did exactly that,
// stacking a fresh "hide" pass on top of content that was already shown.

function initHomeReveal(): void {
  const main = document.querySelector<HTMLElement>('[data-layout="index"]');
  if (!main) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const firstVisitThisSession = !sessionStorage.getItem("homeAnimated");
  sessionStorage.setItem("homeAnimated", "true");

  if (firstVisitThisSession) {
    main
      .querySelectorAll<HTMLElement>(":scope > section")
      .forEach((section, index) => {
        if (section.dataset.revealed) return;
        section.dataset.revealed = "pending";
        section.classList.add("opacity-0");
        setTimeout(() => {
          section.classList.add("animate-fadeInUp");
        }, index * 100);
      });
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  main
    .querySelectorAll<HTMLElement>("section > div > a, section > div > div")
    .forEach(card => {
      if (card.dataset.revealed) return;
      if (
        card.classList.contains("border") ||
        card.parentElement?.classList.contains("grid")
      ) {
        card.dataset.revealed = "pending";
        card.classList.add("opacity-0");
        observer.observe(card);
      }
    });
}

// Registered once per module load (Astro's client router reuses the same
// document across navigations, so a top-level listener here — like the one
// in scripts/theme.ts — never gets re-attached and can't accumulate.
document.addEventListener("astro:page-load", initHomeReveal);
