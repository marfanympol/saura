// SAURA — shopping cart (layout only: there is no checkout yet).
// Items are saved in the browser as [{ id, colour, qty }], so the cart survives
// page changes and visits. The navbar button is added to every page by this
// script and only appears once the cart has something in it.

const SauraCart = (() => {
  const KEY = "saura-cart";
  let memory = [];   // fallback when the browser blocks storage

  const read = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(saved) ? saved.filter((item) => findProduct(item.id)) : [];
    } catch (e) {
      return memory;
    }
  };

  const write = (items) => {
    memory = items;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* keep it in memory */ }
    render();
  };

  const count = () => read().reduce((n, item) => n + item.qty, 0);

  const add = (id, colour) => {
    const items = read();
    const existing = items.find((item) => item.id === id && item.colour === colour);
    if (existing) existing.qty += 1;
    else items.push({ id, colour, qty: 1 });
    write(items);
  };

  const remove = (index) => {
    const items = read();
    items.splice(index, 1);
    write(items);
  };

  // ---------- Navbar button + panel ----------
  const nav = document.querySelector(".nav");

  const button = document.createElement("button");
  button.type = "button";
  button.className = "cart-btn";
  button.hidden = true;
  button.setAttribute("aria-controls", "cart-panel");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
    <span class="cart-btn-label"></span>
    <span class="cart-count"></span>`;
  nav.append(button);

  const panel = document.createElement("div");
  panel.className = "cart-panel";
  panel.id = "cart-panel";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  document.body.append(panel);

  const setOpen = (open) => {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  };

  function render() {
    const items = read();
    const total = items.reduce((n, item) => n + item.qty, 0);

    button.hidden = total === 0;
    button.querySelector(".cart-btn-label").textContent = t("cart.label");
    button.querySelector(".cart-count").textContent = total;
    button.setAttribute("aria-label", t("cart.open", { n: total }));
    if (total === 0) setOpen(false);

    const subtotal = items.reduce((sum, item) => sum + findProduct(item.id).price * item.qty, 0);
    panel.setAttribute("aria-label", t("cart.title"));
    panel.innerHTML = `
      <div class="cart-head">
        <p class="cart-title">${t("cart.title")} <span>(${total})</span></p>
        <button type="button" class="cart-close" aria-label="${t("cart.close")}">×</button>
      </div>
      <ul class="cart-items">
        ${items.map((item, i) => {
          const p = findProduct(item.id);
          const photo = imageFor(p, item.colour);
          const link = `product.html?id=${p.id}&colour=${item.colour}`;
          return `
          <li class="cart-item">
            <a href="${link}" class="cart-thumb">${photo ? `<img src="${photo}" alt="">` : garment(p.type)}</a>
            <div>
              <a href="${link}" class="cart-item-name">${p.name}</a>
              <p class="cart-item-meta">${t(`colour.${item.colour}`)} · ${item.qty} × ${formatPrice(p.price)}</p>
            </div>
            <button type="button" class="cart-remove" data-index="${i}" aria-label="${t("cart.remove", { name: p.name })}">×</button>
          </li>`;
        }).join("")}
      </ul>
      <div class="cart-foot">
        <p class="cart-subtotal"><span>${t("cart.subtotal")}</span><strong>${formatPrice(subtotal)}</strong></p>
        <button type="button" class="btn btn-full" disabled>${t("cart.checkout")}</button>
      </div>`;

    panel.querySelector(".cart-close").addEventListener("click", () => { setOpen(false); button.focus(); });
    panel.querySelectorAll(".cart-remove").forEach((b) =>
      b.addEventListener("click", () => remove(Number(b.dataset.index))));
  }

  button.addEventListener("click", () => setOpen(panel.hidden));

  // Close when clicking outside the panel or pressing Escape.
  // Clicks inside stop here, because removing an item redraws the panel and the
  // clicked button would no longer count as "inside".
  panel.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !button.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { setOpen(false); button.focus(); }
  });

  // Keep the count in sync with other open tabs, and with the language
  window.addEventListener("storage", (e) => { if (e.key === KEY) render(); });
  SauraI18n.onChange(render);
  render();

  return { add, count };
})();
