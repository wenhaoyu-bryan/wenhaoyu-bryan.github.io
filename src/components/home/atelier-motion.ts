/** Finite, visibility-aware playback. No canvas, network requests or live data. */
class AtelierMotion extends HTMLElement {
  private elapsed = 0;
  private frame = 0;
  private last = 0;
  private playing = false;
  private visible = false;
  private started = false;
  private hoverPlayback = false;
  private abort?: AbortController;
  private observer?: IntersectionObserver;
  private reduce = matchMedia("(prefers-reduced-motion: reduce)");
  private duration = 7600;

  connectedCallback() {
    this.abort = new AbortController();
    const { signal } = this.abort;
    const hero = this.hasAttribute("data-atelier-hero");
    this.querySelectorAll<HTMLElement>("[data-motion-controls]").forEach(
      el => (el.hidden = false)
    );
    this.querySelector("[data-playback]")?.addEventListener(
      "click",
      () => {
        this.hoverPlayback = false;
        if (this.playing) this.pause();
        else this.play(this.elapsed >= this.duration || !this.started);
      },
      { signal }
    );
    this.querySelector("[data-replay]")?.addEventListener(
      "click",
      () => this.play(true),
      { signal }
    );
    this.querySelectorAll<HTMLButtonElement>("[data-step]").forEach(button => {
      button.addEventListener(
        "click",
        () => {
          this.pause();
          this.started = true;
          this.elapsed = (Number(button.dataset.step) * this.duration) / 4;
          this.render();
        },
        { signal }
      );
    });
    this.querySelectorAll<HTMLButtonElement>("[data-lens-button]").forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            this.dataset.lens = button.dataset.lensButton;
            this.querySelectorAll("[data-lens-button]").forEach(el =>
              el.setAttribute("aria-pressed", String(el === button))
            );
            this.querySelectorAll<HTMLElement>("[data-lens-detail]").forEach(
              el => (el.hidden = el.dataset.lensDetail !== this.dataset.lens)
            );
          },
          { signal }
        );
      }
    );
    if (!hero) {
      this.addEventListener(
        "pointerover",
        event => {
          if (
            event.pointerType === "mouse" &&
            !this.reduce.matches &&
            !this.playing &&
            !this.contains(event.relatedTarget as Node | null) &&
            !(event.target as Element).closest("button")
          ) {
            this.hoverPlayback = true;
            this.play(true);
          }
        },
        { signal }
      );
      this.addEventListener(
        "pointerleave",
        () => {
          if (this.hoverPlayback) this.pause();
        },
        { signal }
      );
      this.addEventListener(
        "focusout",
        event => {
          if (!this.contains(event.relatedTarget as Node | null)) this.pause();
        },
        { signal }
      );
    }
    this.observer = new IntersectionObserver(
      entries => {
        this.visible = entries[0].isIntersecting;
        if (!this.visible) this.pause();
        else if (hero && !this.started && !this.reduce.matches) this.play(true);
      },
      { threshold: 0.2 }
    );
    this.observer.observe(this);
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) this.pause();
      },
      { signal }
    );
    this.reduce.addEventListener(
      "change",
      () => {
        this.pause();
        if (this.reduce.matches) {
          this.elapsed = this.duration;
          this.render();
        }
      },
      { signal }
    );
  }

  private render() {
    const stage = Math.min(3, Math.floor(this.elapsed / (this.duration / 4)));
    if (this.dataset.stage !== String(stage)) {
      this.dataset.stage = String(stage);
      this.querySelectorAll<HTMLElement>("[data-step]").forEach(el =>
        el.setAttribute(
          "aria-pressed",
          String(Number(el.dataset.step) === stage)
        )
      );
    }
    this.style.setProperty(
      "--scene-progress",
      String(this.elapsed / this.duration)
    );
  }

  private play(restart: boolean) {
    this.pause();
    this.started = true;
    if (this.reduce.matches) {
      this.elapsed = this.duration;
      this.render();
      return;
    }
    if (restart) this.elapsed = 0;
    this.playing = true;
    this.dataset.playing = "true";
    const button = this.querySelector("[data-playback]");
    button?.setAttribute(
      "aria-label",
      this.dataset.pauseLabel ??
        (this.dataset.zh === "true" ? "暂停演示" : "Pause demonstration")
    );
    this.last = performance.now();
    this.render();
    this.frame = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    if (!this.playing) return;
    this.elapsed = Math.min(this.duration, this.elapsed + now - this.last);
    this.last = now;
    this.render();
    if (this.elapsed >= this.duration) this.pause();
    else this.frame = requestAnimationFrame(this.tick);
  };

  private pause() {
    cancelAnimationFrame(this.frame);
    this.playing = false;
    this.dataset.playing = "false";
    this.querySelector("[data-playback]")?.setAttribute(
      "aria-label",
      this.dataset.playLabel ??
        (this.dataset.zh === "true" ? "播放演示" : "Play demonstration")
    );
  }

  disconnectedCallback() {
    this.pause();
    this.abort?.abort();
    this.observer?.disconnect();
  }
}
if (!customElements.get("atelier-motion"))
  customElements.define("atelier-motion", AtelierMotion);
