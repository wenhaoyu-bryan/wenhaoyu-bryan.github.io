import { themeModes, themePreferenceKey } from "./appearance-options";

const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
let preference =
  themeModes.find(
    mode => mode === document.documentElement.dataset.themePreference
  ) ?? "system";

function applyToRoot(root: HTMLElement): void {
  root.dataset.themePreference = preference;
  const systemTheme = darkMode.matches ? "dark" : "light";
  root.dataset.theme = preference === "system" ? systemTheme : preference;
}

function reflect(): void {
  applyToRoot(document.documentElement);

  for (const input of document.querySelectorAll<HTMLInputElement>(
    "input[data-appearance-choice]"
  )) {
    input.checked = input.value === preference;
  }

  const color = window.getComputedStyle(document.body).backgroundColor;
  document.querySelector("meta#theme-color")?.setAttribute("content", color);
}

document.addEventListener("change", event => {
  const input = event.target;
  if (
    !(input instanceof HTMLInputElement) ||
    !input.hasAttribute("data-appearance-choice")
  )
    return;

  const mode = themeModes.find(value => value === input.value);
  if (!mode) return;
  preference = mode;

  try {
    if (mode === "system") localStorage.removeItem(themePreferenceKey);
    else localStorage.setItem(themePreferenceKey, mode);
  } catch {
    /* The theme still applies to the open site if storage is blocked. */
  }
  reflect();
});

reflect();
document.addEventListener("astro:after-swap", reflect);

document.addEventListener("astro:before-swap", event => {
  const { newDocument } = event as { newDocument: Document };
  applyToRoot(newDocument.documentElement);

  const color = document
    .querySelector("meta#theme-color")
    ?.getAttribute("content");
  if (color)
    newDocument
      .querySelector("meta#theme-color")
      ?.setAttribute("content", color);
});

darkMode.addEventListener("change", () => {
  if (preference === "system") reflect();
});

window.addEventListener("storage", event => {
  if (event.key !== themePreferenceKey && event.key !== null) return;
  preference = themeModes.find(mode => mode === event.newValue) ?? "system";
  reflect();
});
