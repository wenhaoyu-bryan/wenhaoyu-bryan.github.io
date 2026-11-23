import {
  defaultTheme,
  themeModes,
  themePreferenceKey,
} from "./appearance-options";

let theme =
  themeModes.find(mode => mode === document.documentElement.dataset.theme) ??
  defaultTheme;

function reflect(): void {
  document.documentElement.dataset.theme = theme;

  const toggle = document.querySelector<HTMLButtonElement>("#theme-btn");
  const label =
    theme === "dark" ? toggle?.dataset.labelLight : toggle?.dataset.labelDark;
  if (label) toggle?.setAttribute("aria-label", label);

  const color = window.getComputedStyle(document.body).backgroundColor;
  document.querySelector("meta#theme-color")?.setAttribute("content", color);
}

document.addEventListener("click", event => {
  if (!(event.target instanceof Element) || !event.target.closest("#theme-btn"))
    return;

  theme = theme === "dark" ? "light" : "dark";

  try {
    localStorage.setItem(themePreferenceKey, theme);
  } catch {
    /* The theme still applies to the open site if storage is blocked. */
  }
  reflect();
});

reflect();
document.addEventListener("astro:after-swap", reflect);

document.addEventListener("astro:before-swap", event => {
  const { newDocument } = event as { newDocument: Document };
  newDocument.documentElement.dataset.theme = theme;

  const color = document
    .querySelector("meta#theme-color")
    ?.getAttribute("content");
  if (color)
    newDocument
      .querySelector("meta#theme-color")
      ?.setAttribute("content", color);
});

window.addEventListener("storage", event => {
  if (event.key !== themePreferenceKey && event.key !== null) return;
  theme = themeModes.find(mode => mode === event.newValue) ?? defaultTheme;
  reflect();
});
