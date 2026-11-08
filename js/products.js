// SAURA — product catalogue, carousels and the products page.
// Placeholder data until real products exist. To add a product, copy an entry.
// "image" is optional: without it, a garment outline is drawn from "type".

const PRODUCTS = [
  // Men
  { name: "Pace Tee",        gender: "men",   type: "tee",      price: 35,  colours: 4, tag: "New" },
  { name: "Drive Hoodie",    gender: "men",   type: "hoodie",   price: 85,  colours: 3 },
  { name: "Stride Shorts",   gender: "men",   type: "shorts",   price: 45,  colours: 3 },
  { name: "Core Joggers",    gender: "men",   type: "joggers",  price: 70,  colours: 2 },
  { name: "Summit Jacket",   gender: "men",   type: "jacket",   price: 120, colours: 2, tag: "New" },
  { name: "Tempo Tank",      gender: "men",   type: "tank",     price: 30,  colours: 4 },
  { name: "Base Long Sleeve", gender: "men",  type: "tee",      price: 45,  colours: 3 },
  { name: "Apex Training Tee", gender: "men", type: "tee",      price: 40,  colours: 5 },
  { name: "Ridge Hoodie",    gender: "men",   type: "hoodie",   price: 90,  colours: 2 },
  { name: "Sprint Shorts",   gender: "men",   type: "shorts",   price: 40,  colours: 4 },
  { name: "Track Joggers",   gender: "men",   type: "joggers",  price: 75,  colours: 3 },
  { name: "Storm Shell",     gender: "men",   type: "jacket",   price: 140, colours: 2, tag: "New" },
  { name: "Vector Half-Zip", gender: "men",   type: "jacket",   price: 75,  colours: 3 },
  { name: "Pulse Tank",      gender: "men",   type: "tank",     price: 32,  colours: 3 },

  // Women
  { name: "Flow Leggings",   gender: "women", type: "leggings", price: 65,  colours: 4, tag: "New" },
  { name: "Lift Sports Bra", gender: "women", type: "bra",      price: 40,  colours: 5 },
  { name: "Pace Tee",        gender: "women", type: "tee",      price: 35,  colours: 4 },
  { name: "Drive Hoodie",    gender: "women", type: "hoodie",   price: 85,  colours: 3 },
  { name: "Stride Shorts",   gender: "women", type: "shorts",   price: 45,  colours: 3 },
  { name: "Summit Jacket",   gender: "women", type: "jacket",   price: 120, colours: 2, tag: "New" },
  { name: "Tempo Tank",      gender: "women", type: "tank",     price: 30,  colours: 4 },
  { name: "Sculpt Leggings", gender: "women", type: "leggings", price: 70,  colours: 3 },
  { name: "Motion Sports Bra", gender: "women", type: "bra",    price: 45,  colours: 4, tag: "New" },
  { name: "Apex Training Tee", gender: "women", type: "tee",    price: 40,  colours: 5 },
  { name: "Ridge Hoodie",    gender: "women", type: "hoodie",   price: 90,  colours: 2 },
  { name: "Sprint Shorts",   gender: "women", type: "shorts",   price: 40,  colours: 4 },
  { name: "Track Joggers",   gender: "women", type: "joggers",  price: 75,  colours: 3 },
  { name: "Pulse Crop Tank", gender: "women", type: "tank",     price: 32,  colours: 3 },
];

const PRICE = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

const TYPE_LABELS = {
  tee: "Tees", tank: "Tanks", hoodie: "Hoodies", jacket: "Jackets",
  shorts: "Shorts", joggers: "Joggers", leggings: "Leggings", bra: "Sports bras",
};

// Simple line drawings, viewBox 0 0 100 100
const GARMENTS = {
  tee: '<path d="M30 18L42 14Q50 21 58 14L70 18L86 32L77 42L70 37V86H30V37L23 42L14 32Z"/>',
  tank: '<path d="M37 12H42Q50 26 58 12H63Q61 30 70 38V86H30V38Q39 30 37 12Z"/>',
  hoodie: '<path d="M34 22Q36 8 50 8T66 22L80 30L90 74L80 76L72 46V88H28V46L20 76L10 74L20 30Z"/><path d="M41 22Q50 32 59 22M38 66H62L58 78H42Z"/>',
  jacket: '<path d="M38 14L50 20L62 14L80 24L90 74L80 76L72 46V88H28V46L20 76L10 74L20 24Z"/><path d="M50 20V88M38 14L44 28L50 20L56 28L62 14"/>',
  shorts: '<path d="M26 22H74L80 70L56 74L50 46L44 74L20 70Z"/><path d="M26 30H74"/>',
  joggers: '<path d="M32 10H68L70 82L72 90H56L50 34L44 90H28L30 82Z"/><path d="M32 18H68M30 82H44M56 82H70"/>',
  leggings: '<path d="M36 10H64L63 90H54L50 34L46 90H37Z"/><path d="M36 18H64"/>',
  bra: '<path d="M24 74V56Q24 44 36 38V14H42Q50 66 58 14H64V38Q76 44 76 56V74Z"/><path d="M24 63H76"/>',
};

function productCard(p) {
  const media = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<svg viewBox="0 0 100 100" aria-hidden="true">${GARMENTS[p.type]}</svg>`;
  const genderLabel = p.gender === "men" ? "Men" : "Women";

  return `
    <article class="product-card">
      <div class="product-media">
        ${media}
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-meta">${genderLabel} · ${p.colours} colours</p>
        <p class="product-price">${PRICE.format(p.price)}</p>
      </div>
    </article>`;
}

// ---------- Carousels (front page) ----------
function initCarousel(carousel) {
  const track = carousel.querySelector(".carousel-track");
  const prev = carousel.querySelector('[data-dir="-1"]');
  const next = carousel.querySelector('[data-dir="1"]');

  track.innerHTML = PRODUCTS.filter((p) => p.gender === carousel.dataset.gender).map(productCard).join("");

  // Scroll one "page" of cards at a time
  const scrollByPage = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
  prev.addEventListener("click", () => scrollByPage(-1));
  next.addEventListener("click", () => scrollByPage(1));

  const updateButtons = () => {
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
}

document.querySelectorAll(".carousel").forEach(initCarousel);

// ---------- Catalogue (products page) ----------
function initCatalogue(grid) {
  const genderButtons = document.querySelectorAll("[data-filter-gender]");
  const typeSelect = document.getElementById("filter-type");
  const count = document.getElementById("product-count");
  const params = new URLSearchParams(location.search);

  const state = {
    gender: ["men", "women"].includes(params.get("gender")) ? params.get("gender") : "all",
    type: params.get("type") in TYPE_LABELS ? params.get("type") : "all",
  };

  // Fill the type dropdown with the types that exist in the catalogue
  [...new Set(PRODUCTS.map((p) => p.type))].forEach((type) => {
    typeSelect.add(new Option(TYPE_LABELS[type], type));
  });

  const render = () => {
    const items = PRODUCTS.filter((p) =>
      (state.gender === "all" || p.gender === state.gender) &&
      (state.type === "all" || p.type === state.type));

    grid.innerHTML = items.length
      ? items.map(productCard).join("")
      : '<p class="catalogue-empty">No products match these filters yet.</p>';
    count.textContent = `${items.length} ${items.length === 1 ? "product" : "products"}`;

    genderButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterGender === state.gender)));
    typeSelect.value = state.type;

    // Keep the URL shareable, e.g. products.html?gender=women&type=leggings
    const query = new URLSearchParams();
    if (state.gender !== "all") query.set("gender", state.gender);
    if (state.type !== "all") query.set("type", state.type);
    history.replaceState(null, "", query.toString() ? `?${query}` : location.pathname);
  };

  genderButtons.forEach((b) => b.addEventListener("click", () => { state.gender = b.dataset.filterGender; render(); }));
  typeSelect.addEventListener("change", () => { state.type = typeSelect.value; render(); });
  render();
}

const catalogueGrid = document.getElementById("product-grid");
if (catalogueGrid) initCatalogue(catalogueGrid);
