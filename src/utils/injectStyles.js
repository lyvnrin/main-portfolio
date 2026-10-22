// Adds a component's CSS to <head> when its module loads, before React's first
// paint, so the page never flashes unstyled markup. Reuses the tag by id so hot
// reloads replace the old styles instead of stacking duplicates.
export function injectStyles(id, css) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}
