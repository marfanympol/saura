// SAURA — product catalogue, carousels, the products page and the product page.
// To add a product, copy an entry and give it a unique id (used in product.html?id=…).
// gender: "men", "women" or "unisex" (unisex shows under both Men and Women).
// design: one of DESIGNS below; its slogan is shown on the product page.
// image: the main photo. image2 (optional): shown when the card is hovered;
// without it, the hover shows the garment outline marked with a "2".
// No image at all: the garment outline is drawn from "type".
// variants (optional): { colour: photo }. The colour picker then offers only
// these colours and swaps the photo; "colour" is the one shown first.
// Card text (gender, colour, type names, descriptions) is translated in js/i18n.js.

// The slogans printed on each design (kept in English, like "Built to move")
const DESIGNS = {
  signature:   "Move Further Together",
  dinamico:    "Move Further",
  minimalista: "Sportswear",
  monograma:   "Beyond Limits",
  organico:    "Natural Performance",
  tipografico: "Sportswear",
  geometrico:  "Built to Move",
  montana:     "Explore More",
  circulo:     "Everyday Progress",
  abstracto:   "Fuel Your Motion",
};

// Swatch look for every colour; products without variants offer the first five
const COLOURS = {
  black: "#111111",
  white: "#f1f1f1",
  grey: "#9b9b9b",
  navy: "#1f2c4f",
  green: "#36402f",
  "black-premium": "linear-gradient(135deg, #111111 55%, #b98a6e 55%, #b98a6e 68%, #111111 68%)",
};
const BASIC_COLOURS = ["black", "white", "grey", "navy", "green"];

// Signature line: one design in every colour, each colour with its own photo
const signatureVariants = (type, colours) =>
  Object.fromEntries(colours.map((c) => [c, `assets/products/signature-${type}-${c}.webp`]));

// One garment type in the nine designs, in sheet order, for a collection ("men" / "women").
// colours lists each design's colour in that order (fewer colours = fewer designs).
// Photos: assets/products/<gender>-<type>-<nn>-<design>.webp
const DESIGN_NAMES = {
  dinamico: "Dinámico", minimalista: "Minimalista", monograma: "Monograma", organico: "Orgánico",
  tipografico: "Tipográfico", geometrico: "Geométrico", montana: "Montaña", circulo: "Círculo", abstracto: "Abstracto",
};
// The same design names in English, used when the site is in English
const DESIGN_NAMES_EN = {
  dinamico: "Dynamic", minimalista: "Minimalist", monograma: "Monogram", organico: "Organic",
  tipografico: "Typographic", geometrico: "Geometric", montana: "Mountain", circulo: "Circle", abstracto: "Abstract",
};
// Product name in the current language: "Montaña Tee" stays as written in Spanish,
// and becomes "Mountain Tee" in English
const displayName = (p) =>
  SauraI18n.lang === "en" && DESIGN_NAMES_EN[p.design]
    ? p.name.replace(DESIGN_NAMES[p.design], DESIGN_NAMES_EN[p.design])
    : p.name;
const designLine = (gender, type, label, price, colours) =>
  colours.map((colour, i) => {
    const design = Object.keys(DESIGN_NAMES)[i];
    return {
      id: `${design}-${type}-${gender}`, name: `${DESIGN_NAMES[design]} ${label}`, design, type,
      gender, price, colour,
      image: `assets/products/${gender}-${type}-${String(i + 1).padStart(2, "0")}-${design}.webp`,
    };
  });

const PRODUCTS = [
  // Signature (colour picker swaps the photo)
  { id: "signature-tee",     name: "Signature Tee",     design: "signature", type: "tee",     gender: "men", price: 35, tag: "new", colour: "black",
    variants: signatureVariants("tee",     ["black", "white", "green", "navy", "grey"]) },
  { id: "signature-hoodie",  name: "Signature Hoodie",  design: "signature", type: "hoodie",  gender: "men", price: 85, tag: "new", colour: "black",
    variants: signatureVariants("hoodie",  ["black", "white", "green", "navy", "grey"]) },
  { id: "signature-joggers", name: "Signature Joggers", design: "signature", type: "joggers", gender: "men", price: 70, tag: "new", colour: "black",
    variants: signatureVariants("joggers", ["black", "grey", "green", "navy", "black-premium"]) },
  { id: "signature-shorts",  name: "Signature Shorts",  design: "signature", type: "shorts",  gender: "men", price: 45, tag: "new", colour: "black",
    variants: signatureVariants("shorts",  ["black", "grey", "green", "navy", "black-premium"]) },

  // T-shirts
  { id: "dinamico-tee",    name: "Dinámico Tee",    design: "dinamico",    type: "tee", gender: "men", price: 35, colour: "black", image: "assets/products/men-tee-01-dinamico.webp" },
  { id: "minimalista-tee", name: "Minimalista Tee", design: "minimalista", type: "tee", gender: "men", price: 35, colour: "white", image: "assets/products/men-tee-02-minimalista.webp" },
  { id: "monograma-tee",   name: "Monograma Tee",   design: "monograma",   type: "tee", gender: "men", price: 35, colour: "green", image: "assets/products/men-tee-03-monograma.webp" },
  { id: "organico-tee",    name: "Orgánico Tee",    design: "organico",    type: "tee", gender: "men", price: 35, colour: "navy",  image: "assets/products/men-tee-04-organico.webp" },
  { id: "tipografico-tee", name: "Tipográfico Tee", design: "tipografico", type: "tee", gender: "men", price: 35, colour: "black", image: "assets/products/men-tee-05-tipografico.webp" },
  { id: "geometrico-tee",  name: "Geométrico Tee",  design: "geometrico",  type: "tee", gender: "men", price: 35, colour: "grey",  image: "assets/products/men-tee-06-geometrico.webp" },
  { id: "montana-tee",     name: "Montaña Tee",     design: "montana",     type: "tee", gender: "men", price: 35, colour: "black", image: "assets/products/men-tee-07-montana.webp" },
  { id: "circulo-tee",     name: "Círculo Tee",     design: "circulo",     type: "tee", gender: "men", price: 35, colour: "white", image: "assets/products/men-tee-08-circulo.webp" },
  { id: "abstracto-tee",   name: "Abstracto Tee",   design: "abstracto",   type: "tee", gender: "men", price: 35, colour: "black", image: "assets/products/tee-09-abstracto.webp" },

  // Hoodies
  { id: "dinamico-hoodie",    name: "Dinámico Hoodie",    design: "dinamico",    type: "hoodie", gender: "men", price: 85, colour: "black", image: "assets/products/hoodie-01-dinamico.webp" },
  { id: "minimalista-hoodie", name: "Minimalista Hoodie", design: "minimalista", type: "hoodie", gender: "men", price: 85, colour: "white", image: "assets/products/hoodie-02-minimalista.webp" },
  { id: "monograma-hoodie",   name: "Monograma Hoodie",   design: "monograma",   type: "hoodie", gender: "men", price: 85, colour: "green", image: "assets/products/hoodie-03-monograma.webp" },
  { id: "organico-hoodie",    name: "Orgánico Hoodie",    design: "organico",    type: "hoodie", gender: "men", price: 85, colour: "navy",  image: "assets/products/hoodie-04-organico.webp" },
  { id: "tipografico-hoodie", name: "Tipográfico Hoodie", design: "tipografico", type: "hoodie", gender: "men", price: 85, colour: "black", image: "assets/products/hoodie-05-tipografico.webp" },
  { id: "geometrico-hoodie",  name: "Geométrico Hoodie",  design: "geometrico",  type: "hoodie", gender: "men", price: 85, colour: "grey",  image: "assets/products/hoodie-06-geometrico.webp" },
  { id: "montana-hoodie",     name: "Montaña Hoodie",     design: "montana",     type: "hoodie", gender: "men", price: 85, colour: "black", image: "assets/products/hoodie-07-montana.webp" },
  { id: "circulo-hoodie",     name: "Círculo Hoodie",     design: "circulo",     type: "hoodie", gender: "men", price: 85, colour: "white", image: "assets/products/hoodie-08-circulo.webp" },
  { id: "abstracto-hoodie",   name: "Abstracto Hoodie",   design: "abstracto",   type: "hoodie", gender: "men", price: 85, colour: "black", image: "assets/products/hoodie-09-abstracto.webp" },

  // Joggers
  { id: "dinamico-joggers",    name: "Dinámico Joggers",    design: "dinamico",    type: "joggers", gender: "men", price: 70, colour: "black", image: "assets/products/men-joggers-01-dinamico.webp" },
  { id: "minimalista-joggers", name: "Minimalista Joggers", design: "minimalista", type: "joggers", gender: "men", price: 70, colour: "grey",  image: "assets/products/men-joggers-02-minimalista.webp" },
  { id: "monograma-joggers",   name: "Monograma Joggers",   design: "monograma",   type: "joggers", gender: "men", price: 70, colour: "green", image: "assets/products/men-joggers-03-monograma.webp" },
  { id: "organico-joggers",    name: "Orgánico Joggers",    design: "organico",    type: "joggers", gender: "men", price: 70, colour: "navy",  image: "assets/products/men-joggers-04-organico.webp" },
  { id: "tipografico-joggers", name: "Tipográfico Joggers", design: "tipografico", type: "joggers", gender: "men", price: 70, colour: "black", image: "assets/products/men-joggers-05-tipografico.webp" },
  { id: "geometrico-joggers",  name: "Geométrico Joggers",  design: "geometrico",  type: "joggers", gender: "men", price: 70, colour: "grey",  image: "assets/products/men-joggers-06-geometrico.webp" },
  { id: "montana-joggers",     name: "Montaña Joggers",     design: "montana",     type: "joggers", gender: "men", price: 70, colour: "black", image: "assets/products/men-joggers-07-montana.webp" },
  { id: "circulo-joggers",     name: "Círculo Joggers",     design: "circulo",     type: "joggers", gender: "men", price: 70, colour: "navy",  image: "assets/products/men-joggers-08-circulo.webp" },
  { id: "abstracto-joggers",   name: "Abstracto Joggers",   design: "abstracto",   type: "joggers", gender: "men", price: 70, colour: "black", image: "assets/products/men-joggers-09-abstracto.webp" },

  // Men's shorts and tank tops
  ...designLine("men", "shorts", "Shorts", 40, ["black", "white", "green", "navy", "black", "grey", "black", "white", "black"]),
  ...designLine("men", "tank",   "Tank",   30, ["black", "white", "green", "navy", "black", "grey", "black", "white", "black"]),

  // Women's collection
  ...designLine("women", "tee",      "Tee",      35, ["black", "white", "green", "navy", "black", "grey", "black", "white"]),
  ...designLine("women", "shorts",   "Shorts",   45, ["black", "white", "green", "navy", "black", "grey", "black", "white", "black"]),
  ...designLine("women", "leggings", "Leggings", 65, ["black", "black", "green", "navy", "black", "grey", "black", "black", "black"]),
  ...designLine("women", "tank",     "Tank",     30, ["black", "white", "green", "navy", "black", "grey", "black", "white", "black"]),
];

const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

// Colours a product can be picked in, and the photo for a given colour
const coloursOf = (p) => (p.variants ? Object.keys(p.variants) : BASIC_COLOURS);
const imageFor = (p, colour) => (p.variants && p.variants[colour]) || p.image || (p.variants && p.variants[p.colour]);

// Does a product belong in the Men / Women collection?
const inCollection = (p, gender) => p.gender === gender || p.gender === "unisex";

const { t } = SauraI18n;
const formatPrice = (amount) =>
  new Intl.NumberFormat(SauraI18n.locale, { style: "currency", currency: "EUR" }).format(amount);

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

const garment = (type) => `<svg viewBox="0 0 100 100" aria-hidden="true">${GARMENTS[type]}</svg>`;

// Main image plus the hover image: the photos if given, otherwise the
// garment outline (main) and the outline marked "2" (hover).
function productMedia(p) {
  const photo = imageFor(p, p.colour);
  const main = photo ? `<img src="${photo}" alt="${displayName(p)}" loading="lazy">` : garment(p.type);
  const alt = p.image2
    ? `<img src="${p.image2}" alt="" loading="lazy">`
    : `${garment(p.type)}<span class="media-alt-mark">2</span>`;

  return `
        <div class="media-layer media-main">${main}</div>
        <div class="media-layer media-alt" aria-hidden="true">${alt}</div>`;
}

function productCard(p) {
  return `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="product-media">
        ${productMedia(p)}
        ${p.tag ? `<span class="product-tag">${t(`tag.${p.tag}`)}</span>` : ""}
      </div>
      <div class="product-info">
        <h3 class="product-name">${displayName(p)}</h3>
        <p class="product-meta">${t(`gender.${p.gender}`)} · ${p.variants
          ? t("product.colours", { n: coloursOf(p).length })
          : t(`colour.${p.colour}`)}</p>
        <p class="product-price">${formatPrice(p.price)}</p>
      </div>
    </a>`;
}

// ---------- Carousels (front page, and "Related products" on the product page) ----------
// getItems returns the products to show; it's called again when the language changes.
function initCarousel(carousel, getItems) {
  const track = carousel.querySelector(".carousel-track");
  const prev = carousel.querySelector('[data-dir="-1"]');
  const next = carousel.querySelector('[data-dir="1"]');

  const updateButtons = () => {
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };

  const render = () => {
    if (!carousel.isConnected) return;   // the product page redraws itself; skip old copies
    track.innerHTML = getItems().map(productCard).join("");
    updateButtons();
  };

  // Scroll one "page" of cards at a time
  const scrollByPage = (dir) => track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
  prev.addEventListener("click", () => scrollByPage(-1));
  next.addEventListener("click", () => scrollByPage(1));

  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  SauraI18n.onChange(render);
  render();
}

// Front-page picks: put a chosen product in a given carousel slot (1 = first card).
// The product that was in that slot swaps places with it, so nothing disappears.
// Only affects the front page; the catalogue keeps the PRODUCTS order.
const FRONT_PAGE_PICKS = {
  men: { 1: "monograma-tee", 5: "organico-tee" },
  women: {},
};

function frontPageItems(gender) {
  const items = PRODUCTS.filter((p) => inCollection(p, gender));
  Object.entries(FRONT_PAGE_PICKS[gender] || {}).forEach(([slot, id]) => {
    const to = slot - 1;
    const from = items.findIndex((p) => p.id === id);
    if (from !== -1 && to < items.length) [items[to], items[from]] = [items[from], items[to]];
  });
  return items;
}

document.querySelectorAll(".carousel[data-gender]").forEach((carousel) =>
  initCarousel(carousel, () => frontPageItems(carousel.dataset.gender)));

// ---------- Catalogue (products page) ----------
function initCatalogue(grid) {
  const genderButtons = document.querySelectorAll("[data-filter-gender]");
  const typeSelect = document.getElementById("filter-type");
  const count = document.getElementById("product-count");
  const params = new URLSearchParams(location.search);
  const types = [...new Set(PRODUCTS.map((p) => p.type))];

  const state = {
    gender: ["men", "women"].includes(params.get("gender")) ? params.get("gender") : "all",
    type: types.includes(params.get("type")) ? params.get("type") : "all",
  };

  // Type dropdown: only the types that exist in the catalogue, in the current language
  const renderTypeOptions = () => {
    typeSelect.replaceChildren(
      new Option(t("filter.allTypes"), "all"),
      ...types.map((type) => new Option(t(`type.${type}`), type)),
    );
  };

  const render = () => {
    const items = PRODUCTS.filter((p) =>
      (state.gender === "all" || inCollection(p, state.gender)) &&
      (state.type === "all" || p.type === state.type));

    grid.innerHTML = items.length
      ? items.map(productCard).join("")
      : `<p class="catalogue-empty">${t("catalogue.empty")}</p>`;
    count.textContent = items.length === 1 ? t("count.one") : t("count.other", { n: items.length });

    genderButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterGender === state.gender)));
    typeSelect.value = state.type;

    // Keep the URL shareable, e.g. products.html?gender=women&type=joggers
    const query = new URLSearchParams();
    if (state.gender !== "all") query.set("gender", state.gender);
    if (state.type !== "all") query.set("type", state.type);
    history.replaceState(null, "", query.toString() ? `?${query}` : location.pathname);
  };

  genderButtons.forEach((b) => b.addEventListener("click", () => { state.gender = b.dataset.filterGender; render(); }));
  typeSelect.addEventListener("change", () => { state.type = typeSelect.value; render(); });
  SauraI18n.onChange(() => { renderTypeOptions(); render(); });
  renderTypeOptions();
  render();
}

const catalogueGrid = document.getElementById("product-grid");
if (catalogueGrid) initCatalogue(catalogueGrid);

// ---------- Product page (product.html?id=…) ----------
function initProductPage(root) {
  const params = new URLSearchParams(location.search);
  const product = findProduct(params.get("id"));
  // Start on the colour in the URL (e.g. &colour=navy) if the product has it
  let colour = product && coloursOf(product).includes(params.get("colour")) ? params.get("colour") : product?.colour;
  let note = "";   // message under the buttons: "Added to cart" / "Checkout coming soon"

  const notFound = () => `
    <div class="pd-missing">
      <h1 class="page-title">${t("pd.notFound")}</h1>
      <a href="products.html" class="btn">${t("pd.back")}</a>
    </div>`;

  const swatches = () => coloursOf(product).map((key) => `
          <button type="button" class="swatch" role="radio" data-colour="${key}"
            aria-checked="${key === colour}" aria-label="${t(`colour.${key}`)}" title="${t(`colour.${key}`)}"
            style="--swatch: ${COLOURS[key]}"></button>`).join("");

  const render = () => {
    if (!product) {
      document.title = `${t("pd.notFound")} — Saura`;
      root.innerHTML = notFound();
      return;
    }
    const p = product;
    document.title = `${displayName(p)} — Saura`;
    // Related products: for now, the other products of the same type in the same collection
    const related = PRODUCTS.filter((x) => x.type === p.type && x.gender === p.gender && x.id !== p.id);

    root.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="products.html">${t("pd.crumb")}</a><span aria-hidden="true">/</span>
        <a href="products.html?type=${p.type}">${t(`type.${p.type}`)}</a><span aria-hidden="true">/</span>
        <span aria-current="page">${displayName(p)}</span>
      </nav>

      <div class="pd-layout">
        <div class="pd-photo">
          ${imageFor(p, colour) ? `<img src="${imageFor(p, colour)}" alt="${displayName(p)} — ${t(`colour.${colour}`)}">` : garment(p.type)}
        </div>

        <div class="pd-details">
          <p class="eyebrow">${t(`typeOne.${p.type}`)} · ${t(`gender.${p.gender}`)}</p>
          <h1 class="pd-title">${displayName(p)}</h1>
          <p class="pd-tagline">${DESIGNS[p.design]}</p>
          <p class="pd-price">${formatPrice(p.price)}</p>

          <div class="pd-colours">
            <p class="pd-label">${t("pd.colour")}: <strong id="pd-colour-name">${t(`colour.${colour}`)}</strong></p>
            <div class="swatches" role="radiogroup" aria-label="${t("pd.colour")}">${swatches()}</div>
          </div>

          <div class="pd-actions">
            <button type="button" class="btn" id="pd-add">${t("pd.add")}</button>
            <button type="button" class="btn btn-ghost" id="pd-buy">${t("pd.buy")}</button>
          </div>
          <p class="pd-note" id="pd-note" aria-live="polite">${note}</p>

          <div class="pd-description">
            <h2 class="pd-subhead">${t("pd.description")}</h2>
            <p>${t(`desc.${p.type}`)}</p>
          </div>
        </div>
      </div>

      ${related.length ? `
      <section class="pd-related">
        <div class="carousel">
          <div class="carousel-head">
            <h2 class="carousel-title">${t("pd.related")}</h2>
            <div class="carousel-controls">
              <a href="products.html?type=${p.type}" class="carousel-link">${t("pd.viewAll")}</a>
              <button class="carousel-btn" data-dir="-1" aria-label="${t("pd.relatedPrev")}">←</button>
              <button class="carousel-btn" data-dir="1" aria-label="${t("pd.relatedNext")}">→</button>
            </div>
          </div>
          <div class="carousel-track" tabindex="0" aria-label="${t("pd.related")}"></div>
        </div>
      </section>` : ""}`;

    if (related.length) initCarousel(root.querySelector(".pd-related .carousel"), () => related);

    // Colour picker: updates the label, and the photo when the product has one per colour
    root.querySelectorAll(".swatch").forEach((btn) => btn.addEventListener("click", () => {
      colour = btn.dataset.colour;
      root.querySelectorAll(".swatch").forEach((b) => b.setAttribute("aria-checked", String(b === btn)));
      root.querySelector("#pd-colour-name").textContent = t(`colour.${colour}`);

      if (p.variants) {
        const img = root.querySelector(".pd-photo img");
        img.src = imageFor(p, colour);
        img.alt = `${displayName(p)} — ${t(`colour.${colour}`)}`;
        // Keep the colour in the URL so the link can be shared
        const query = new URLSearchParams(location.search);
        query.set("colour", colour);
        history.replaceState(null, "", `?${query}`);
      }
    }));

    const noteEl = root.querySelector("#pd-note");
    const showNote = (key) => { note = t(key); noteEl.textContent = note; };

    root.querySelector("#pd-add").addEventListener("click", () => {
      SauraCart.add(p.id, colour);
      showNote("pd.added");
    });
    // Placeholder until checkout exists
    root.querySelector("#pd-buy").addEventListener("click", () => showNote("pd.buyNote"));
  };

  SauraI18n.onChange(() => { note = ""; render(); });
  render();
}

const productRoot = document.getElementById("product-root");
if (productRoot) initProductPage(productRoot);
