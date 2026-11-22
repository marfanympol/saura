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
  monograma:   "Beyond Limits",
  tipografico: "Sportswear",
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

// Design names as written on the products (Spanish), and in English for the English site
const DESIGN_NAMES = { monograma: "Monograma", tipografico: "Tipográfico" };
const DESIGN_NAMES_EN = { monograma: "Monogram", tipografico: "Typographic" };
// Each design's number in the photo file names (it comes from the original design sheets)
const DESIGN_NUMBERS = { monograma: "03", tipografico: "05" };

// Product name in the current language: "Monograma Tee" stays as written in Spanish,
// and becomes "Monogram Tee" in English
const displayName = (p) =>
  SauraI18n.lang === "en" && DESIGN_NAMES_EN[p.design]
    ? p.name.replace(DESIGN_NAMES[p.design], DESIGN_NAMES_EN[p.design])
    : p.name;

// One garment type in both designs, for a collection ("men" / "women").
// colours: each design's colour, e.g. { monograma: "green", tipografico: "black" }.
// Photos: assets/products/<gender>-<type>-<nn>-<design>.webp
const designLine = (gender, type, label, price, colours) =>
  Object.entries(colours).map(([design, colour]) => ({
    id: `${design}-${type}-${gender}`, name: `${DESIGN_NAMES[design]} ${label}`, design, type,
    gender, price, colour,
    image: `assets/products/${gender}-${type}-${DESIGN_NUMBERS[design]}-${design}.webp`,
  }));

const BOTH = { monograma: "green", tipografico: "black" };   // the colour each design comes in

const PRODUCTS = [
  // Men's tees, hoodies and joggers (written out: their ids and photo names predate designLine)
  { id: "monograma-tee",       name: "Monograma Tee",       design: "monograma",   type: "tee",     gender: "men", price: 35, colour: "green", image: "assets/products/men-tee-03-monograma.webp" },
  { id: "tipografico-tee",     name: "Tipográfico Tee",     design: "tipografico", type: "tee",     gender: "men", price: 35, colour: "black", image: "assets/products/men-tee-05-tipografico.webp" },
  { id: "monograma-hoodie",    name: "Monograma Hoodie",    design: "monograma",   type: "hoodie",  gender: "men", price: 85, colour: "green", image: "assets/products/hoodie-03-monograma.webp" },
  { id: "tipografico-hoodie",  name: "Tipográfico Hoodie",  design: "tipografico", type: "hoodie",  gender: "men", price: 85, colour: "black", image: "assets/products/hoodie-05-tipografico.webp" },
  { id: "monograma-joggers",   name: "Monograma Joggers",   design: "monograma",   type: "joggers", gender: "men", price: 70, colour: "green", image: "assets/products/men-joggers-03-monograma.webp" },
  { id: "tipografico-joggers", name: "Tipográfico Joggers", design: "tipografico", type: "joggers", gender: "men", price: 70, colour: "black", image: "assets/products/men-joggers-05-tipografico.webp" },

  // Men's shorts and tank tops
  ...designLine("men", "shorts", "Shorts", 40, BOTH),
  ...designLine("men", "tank",   "Tank",   30, BOTH),

  // Women's collection
  ...designLine("women", "tee",      "Tee",      35, BOTH),
  ...designLine("women", "shorts",   "Shorts",   45, BOTH),
  ...designLine("women", "leggings", "Leggings", 65, BOTH),
  ...designLine("women", "tank",     "Tank",     30, BOTH),
];

// Sports each garment type is made for (a product can have several). Order = filter order.
const SPORTS = ["gym", "crossfit", "running"];
const SPORTS_BY_TYPE = {
  tee:      ["gym", "running"],
  tank:     ["gym", "running"],
  hoodie:   ["gym", "running"],
  leggings: ["crossfit", "running"],
  shorts:   ["crossfit", "running"],
  joggers:  ["running"],
};
// A product's sports: its own "sports" list if it has one, otherwise its type's
const sportsOf = (p) => p.sports || SPORTS_BY_TYPE[p.type] || [];

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

// The quick "add to cart" button sits outside the card's link on purpose: a button inside
// a link is invalid HTML, and the click would also open the product page. The wrapper
// lets the CSS place it over the photo's bottom-right corner.
function productCard(p) {
  return `
    <div class="product-card-wrap">
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
    </a>
    <button type="button" class="card-add" data-id="${p.id}" aria-label="${t("card.add", { name: displayName(p) })}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M12 11v6M9 14h6"/></svg>
    </button>
    </div>`;
}

// One listener for every card's quick-add button (cards are redrawn often, e.g. when
// filtering or switching language, so listening on the document saves re-attaching).
// Adds the product in its default colour, and plays the same animation as the product page.
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".card-add");
  if (!btn) return;
  const p = findProduct(btn.dataset.id);
  SauraCart.add(p.id, p.colour);
  SauraCart.playAnimation(btn, "is-added");
});

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
  men: { 1: "monograma-tee" },
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

// ---------- Shop by sport (front page): rotating pieces on hover ----------
// Hovering a sport card swaps its text for a few pieces of that sport, one at a time:
// a small photo with the piece's name and price, changing every SHOWCASE_EVERY ms.
// Pick the pieces here (product ids):
const SPORT_SHOWCASE = {
  gym:      ["monograma-tee", "tipografico-hoodie", "monograma-tank-men"],
  crossfit: ["tipografico-shorts-women", "monograma-leggings-women", "monograma-shorts-men"],
  running:  ["monograma-joggers", "tipografico-tee", "tipografico-leggings-women"],
};
const SHOWCASE_EVERY = 3000;

function initSportShowcase(card) {
  const pieces = (SPORT_SHOWCASE[card.dataset.sport] || []).map(findProduct).filter(Boolean);
  if (!pieces.length) return;

  // The card text and the piece share one spot (.sport-copy); hovering swaps them.
  // The photos are only downloaded on the first hover.
  const text = card.querySelector("p");
  const copy = document.createElement("div");
  copy.className = "sport-copy";
  text.replaceWith(copy);
  const piece = document.createElement("div");
  piece.className = "sport-piece";
  piece.setAttribute("aria-hidden", "true");
  piece.innerHTML = `
    <div class="sport-piece-photo">${pieces.map((p) => `<img data-src="${imageFor(p, p.colour)}" alt="">`).join("")}</div>
    <p class="sport-piece-name"></p>`;
  copy.append(text, piece);
  const photos = piece.querySelectorAll("img");
  const name = piece.querySelector(".sport-piece-name");

  let current = 0;
  let timer = null;
  const show = (i) => {
    current = i;
    photos.forEach((img, n) => img.classList.toggle("is-active", n === i));
    name.innerHTML = `${displayName(pieces[i])}<br>${formatPrice(pieces[i].price)}`;
  };
  const stop = () => { clearInterval(timer); timer = null; };

  const canHover = window.matchMedia("(hover: hover)").matches;
  const wideEnough = window.matchMedia("(min-width: 761px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  card.addEventListener("mouseenter", () => {
    if (!canHover || !wideEnough.matches) return;   // phones: the still image only
    photos.forEach((img) => { if (!img.src) img.src = img.dataset.src; });
    stop();                                          // never two timers at once
    show(current);
    if (!reduceMotion && pieces.length > 1) {
      timer = setInterval(() => show((current + 1) % pieces.length), SHOWCASE_EVERY);
    }
  });
  card.addEventListener("mouseleave", () => {
    stop();
    current = (current + 1) % pieces.length;   // next hover starts with the following piece
  });
  SauraI18n.onChange(() => show(current));     // name and price in the new language
  show(current);
}
document.querySelectorAll(".sports .pillar[data-sport]").forEach(initSportShowcase);

// ---------- Catalogue (products page) ----------
function initCatalogue(grid) {
  const genderButtons = document.querySelectorAll("[data-filter-gender]");
  const sportButtons = document.querySelectorAll("[data-filter-sport]");
  const typeSelect = document.getElementById("filter-type");
  const count = document.getElementById("product-count");
  const params = new URLSearchParams(location.search);
  const types = [...new Set(PRODUCTS.map((p) => p.type))];

  const state = {
    gender: ["men", "women"].includes(params.get("gender")) ? params.get("gender") : "all",
    type: types.includes(params.get("type")) ? params.get("type") : "all",
    sport: SPORTS.includes(params.get("sport")) ? params.get("sport") : "all",
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
      (state.type === "all" || p.type === state.type) &&
      (state.sport === "all" || sportsOf(p).includes(state.sport)));

    grid.innerHTML = items.length
      ? items.map(productCard).join("")
      : `<p class="catalogue-empty">${t("catalogue.empty")}</p>`;
    count.textContent = items.length === 1 ? t("count.one") : t("count.other", { n: items.length });

    genderButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterGender === state.gender)));
    sportButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterSport === state.sport)));
    typeSelect.value = state.type;

    // Keep the URL shareable, e.g. products.html?gender=women&sport=running&type=shorts
    const query = new URLSearchParams();
    if (state.gender !== "all") query.set("gender", state.gender);
    if (state.sport !== "all") query.set("sport", state.sport);
    if (state.type !== "all") query.set("type", state.type);
    history.replaceState(null, "", query.toString() ? `?${query}` : location.pathname);
  };

  genderButtons.forEach((b) => b.addEventListener("click", () => { state.gender = b.dataset.filterGender; render(); }));
  sportButtons.forEach((b) => b.addEventListener("click", () => { state.sport = b.dataset.filterSport; render(); }));
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
      <nav class="breadcrumb" aria-label="${t("pd.breadcrumb")}">
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

    root.querySelector("#pd-add").addEventListener("click", (e) => {
      SauraCart.add(p.id, colour);
      SauraCart.playAnimation(e.currentTarget, "is-added");   // orange ring around the button
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
