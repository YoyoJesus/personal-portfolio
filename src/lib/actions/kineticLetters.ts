interface Options {
  enabled: boolean;
  baseline?: number;
}

export function kineticLetters(node: HTMLElement, initial: Options) {
  let options = initial;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const target = node.closest("section") ?? node;
  let stop = () => {};

  const sync = () => {
    stop();
    const letters = [...node.querySelectorAll<HTMLElement>("[data-kinetic-letter]")];
    if (!options.enabled || reduced.matches || !finePointer.matches) return;
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      for (const letter of letters) letter.style.removeProperty("--w");
    };
    const move = (event: Event) => {
      const pointer = event as PointerEvent;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const weights = letters.map(letter => {
          const rect = letter.getBoundingClientRect();
          const dx = pointer.clientX - rect.left - rect.width / 2;
          const dy = pointer.clientY - rect.top - rect.height / 2;
          const reach = rect.height * 1.1;
          const pull = Math.exp(-(dx * dx + dy * dy) / (2 * reach * reach));
          const base = options.baseline ?? (Number(getComputedStyle(letter).getPropertyValue("--base")) || 750);
          return Math.round(base + (900 - base) * pull);
        });
        letters.forEach((letter, i) => letter.style.setProperty("--w", String(weights[i])));
      });
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerleave", reset);
    stop = () => {
      reset();
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", reset);
    };
  };

  sync();
  reduced.addEventListener("change", sync);
  finePointer.addEventListener("change", sync);
  return {
    update(next: Options) { options = next; sync(); },
    destroy() {
      stop();
      reduced.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
    },
  };
}
