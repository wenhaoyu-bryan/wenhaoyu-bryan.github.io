const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";

function readPreference(): string | null {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === LIGHT || stored === DARK ? stored : null;
  } catch {
    return null;
  }
}
let preference = readPreference();
function getPreferredTheme(): string {
  if (preference) return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK
    : LIGHT;
}

// Resolve with the same validated preference rules as the inline pre-paint script.
let themeValue = getPreferredTheme();

function persist(): void {
  preference = themeValue;
  try {
    localStorage.setItem(THEME_KEY, themeValue);
  } catch {
    /* Theme switching still works when browser storage is unavailable. */
  }
  reflect();
}

function reflect(): void {
  document.firstElementChild?.setAttribute("data-theme", themeValue);
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document.querySelector("meta#theme-color")?.setAttribute("content", bg);
}

function setup(): void {
  reflect();
  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === LIGHT ? DARK : LIGHT;
    persist();
  });
}

setup();

// Re-run after View Transitions navigation.
document.addEventListener("astro:after-swap", setup);

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener("astro:before-swap", event => {
  (event as { newDocument: Document }).newDocument.documentElement.setAttribute(
    "data-theme",
    themeValue
  );
  const color = document
    .querySelector("meta#theme-color")
    ?.getAttribute("content");
  if (color) {
    (event as { newDocument: Document }).newDocument
      .querySelector("meta#theme-color")
      ?.setAttribute("content", color);
  }
});

// Sync with OS-level dark/light preference changes.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches }) => {
    if (preference) return;
    themeValue = matches ? DARK : LIGHT;
    reflect();
  });
