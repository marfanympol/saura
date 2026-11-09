// SAURA — English / Spanish translations.
// English lives in the HTML itself. Elements marked data-i18n="key" get their
// content swapped from ES below; data-i18n-attr="attr:key; attr:key" does the
// same for attributes (aria-label, alt, content…). UI holds the strings that
// scripts build at runtime (product cards, filters, menu labels).
// A key missing from ES keeps its English text — that's how the "Built to move"
// slogan stays in English on the Spanish site.

const ES = {
  // Page meta
  "meta.home.desc": "Saura es ropa de rendimiento pensada para entrenar y para el día a día. Prendas fiables con energía de sobra.",
  "meta.products.title": "Productos — Saura",
  "meta.product.desc": "Ropa deportiva Saura: diseño, precio, colores y descripción del producto.",
  "meta.products.desc": "Compra ropa deportiva Saura para hombre y mujer: prendas de rendimiento hechas para entrenar y para el día a día.",

  // Shared: nav, footer, language switch
  "nav.brand": "La marca",
  "nav.products": "Productos",
  "nav.team": "Equipo",
  "nav.contact": "Contacto",
  "nav.cta": "Contáctanos",
  "logo.home": "Saura — inicio",
  "lang.label": "Idioma",
  "footer.rights": "Saura. Todos los derechos reservados.",
  "footer.top": "Volver arriba ↑",

  // Hero
  "hero.eyebrow": "Rendimiento y día a día",
  "hero.lead": "Ropa diseñada para entrenar y pensada para la calle. Fiable cuando cuenta, impecable incluso cuando no hace falta.",
  "hero.discover": "Descubre Saura",
  "hero.contact": "Contáctanos",
  "hero.scroll": "Ir a la sección de la marca",

  // Marquee
  "marquee.reliable": "Fiable",
  "marquee.relentless": "Incansable",
  "marquee.versatile": "Versátil",

  // Brand
  "brand.eyebrow": "La marca",
  "brand.title": "Ropa que aguanta el ritmo.<br>Estilo que perdura.",
  "brand.p1": "Saura nació de una idea sencilla: la ropa con la que entrenas debería ser lo bastante buena como para vivir con ella. Diseñamos ropa deportiva que rinde bajo presión, resiste lavado tras lavado y queda bien tanto en la pista como cuando sales por la noche.",
  "brand.p2": "Sin artificios, sin concesiones: solo prendas de calidad con energía de serie.",
  "pillar.reliable.title": "Fiable",
  "pillar.reliable.text": "Tejidos duraderos y una confección cuidada. Hechas para usarse a fondo y a menudo.",
  "pillar.relentless.title": "Incansable",
  "pillar.relentless.text": "Diseño atrevido que aporta energía a cada repetición, cada carrera, cada día.",
  "pillar.versatile.title": "Versátil",
  "pillar.versatile.text": "Cortes y colores que pasan sin esfuerzo del entrenamiento a tu día a día.",

  // Products section (front page)
  "products.eyebrow": "La colección",
  "products.title": "Equipación para<br>cada sesión.",
  "products.shopAll": "Ver todo",
  "carousel.men": "Hombre",
  "carousel.women": "Mujer",
  "carousel.viewAll": "Ver todo",
  "carousel.men.prev": "Productos de hombre anteriores",
  "carousel.men.next": "Siguientes productos de hombre",
  "carousel.men.track": "Productos de hombre",
  "carousel.women.prev": "Productos de mujer anteriores",
  "carousel.women.next": "Siguientes productos de mujer",
  "carousel.women.track": "Productos de mujer",

  // Team
  "team.eyebrow": "El equipo",
  "team.title": "Las personas<br>detrás de Saura.",

  // Contact
  "contact.eyebrow": "Contacto",
  "contact.title": "Hablemos.",
  "contact.lead": "¿Preguntas, colaboraciones, prensa o quieres saber cuándo lanzamos? Escríbenos.",
  "contact.email": "Email",
  "contact.social": "Redes",
  "contact.write": "Escríbenos",

  // Products page
  "shop.eyebrow": "Tienda",
  "shop.title": 'La <span class="accent">colección.</span>',
  "shop.lead": "Prendas de rendimiento para hombre y mujer. Hechas para entrenar, pensadas para todo lo que viene después.",
  "filter.label": "Filtrar por colección",
  "filter.all": "Todo",
  "filter.men": "Hombre",
  "filter.women": "Mujer",
  "filter.typeLabel": "Tipo de producto",
};

const UI = {
  en: {
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "gender.men": "Men",
    "gender.women": "Women",
    "gender.unisex": "Unisex",
    "colour.black": "Black", "colour.white": "White", "colour.grey": "Grey",
    "colour.navy": "Navy", "colour.green": "Green", "colour.black-premium": "Premium black",
    "product.colours": "{n} colours",
    "tag.new": "New",
    "count.one": "1 product",
    "count.other": "{n} products",
    "catalogue.empty": "No products match these filters yet.",
    "filter.allTypes": "All types",
    "type.tee": "Tees", "type.tank": "Tanks", "type.hoodie": "Hoodies", "type.jacket": "Jackets",
    "type.shorts": "Shorts", "type.joggers": "Joggers", "type.leggings": "Leggings", "type.bra": "Sports bras",
    "typeOne.tee": "T-shirt", "typeOne.hoodie": "Hoodie", "typeOne.joggers": "Joggers", "typeOne.shorts": "Shorts",

    // Product page (descriptions are placeholder copy, one per product type)
    "pd.crumb": "Products",
    "pd.colour": "Colour",
    "pd.add": "Add to cart",
    "pd.added": "Added to cart.",
    "pd.buy": "Buy now",
    "pd.buyNote": "Checkout isn't available yet. Coming soon.",
    "pd.description": "Description",
    "pd.notFound": "Product not found",
    "pd.back": "Back to all products",
    "pd.related": "Related products",
    "pd.viewAll": "View all",
    "pd.relatedPrev": "Previous related products",
    "pd.relatedNext": "Next related products",
    "desc.tee": "A lightweight training tee in a breathable technical fabric. Raglan sleeves give you freedom through every movement, flat seams keep it comfortable over long sessions, and the reflective details keep you visible on early runs. Built for the gym, styled for everything after.",
    "desc.hoodie": "A midweight fleece hoodie for warm-ups, cool-downs and everything in between. Soft brushed inside, durable outside, with an adjustable hood, a roomy front pocket and ribbed cuffs that stay in place.",
    "desc.joggers": "Tapered joggers in a stretch fabric that moves with you. An elastic drawcord waistband, zip pockets to keep your essentials secure and ankle cuffs that sit clean over your trainers. From training sessions to rest days.",
    "desc.shorts": "Training shorts in a light, quick-moving fabric with a mid-thigh cut that stays out of your way. An elastic drawcord waistband, zip pockets for keys and phone, and reflective details for early and late sessions.",

    // Cart
    "cart.label": "Cart",
    "cart.open": "Open cart, {n} items",
    "cart.title": "Your cart",
    "cart.close": "Close cart",
    "cart.remove": "Remove {name}",
    "cart.subtotal": "Subtotal",
    "cart.checkout": "Checkout · coming soon",
  },
  es: {
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "gender.men": "Hombre",
    "gender.women": "Mujer",
    "gender.unisex": "Unisex",
    "colour.black": "Negro", "colour.white": "Blanco", "colour.grey": "Gris",
    "colour.navy": "Azul marino", "colour.green": "Verde", "colour.black-premium": "Negro premium",
    "product.colours": "{n} colores",
    "tag.new": "Nuevo",
    "count.one": "1 producto",
    "count.other": "{n} productos",
    "catalogue.empty": "Todavía no hay productos con estos filtros.",
    "filter.allTypes": "Todos los tipos",
    "type.tee": "Camisetas", "type.tank": "Camisetas de tirantes", "type.hoodie": "Sudaderas", "type.jacket": "Chaquetas",
    "type.shorts": "Pantalones cortos", "type.joggers": "Joggers", "type.leggings": "Mallas", "type.bra": "Sujetadores deportivos",
    "typeOne.tee": "Camiseta", "typeOne.hoodie": "Sudadera", "typeOne.joggers": "Joggers", "typeOne.shorts": "Pantalón corto",

    "pd.crumb": "Productos",
    "pd.colour": "Color",
    "pd.add": "Añadir al carrito",
    "pd.added": "Añadido al carrito.",
    "pd.buy": "Comprar ahora",
    "pd.buyNote": "El pago aún no está disponible. Próximamente.",
    "pd.description": "Descripción",
    "pd.notFound": "Producto no encontrado",
    "pd.back": "Volver a todos los productos",
    "pd.related": "Productos relacionados",
    "pd.viewAll": "Ver todo",
    "pd.relatedPrev": "Productos relacionados anteriores",
    "pd.relatedNext": "Siguientes productos relacionados",
    "desc.tee": "Una camiseta de entrenamiento ligera en un tejido técnico transpirable. Las mangas raglán te dan libertad en cada movimiento, las costuras planas la hacen cómoda en sesiones largas y los detalles reflectantes te mantienen visible en las carreras al amanecer. Hecha para el gimnasio, pensada para todo lo que viene después.",
    "desc.hoodie": "Una sudadera de felpa de peso medio para calentar, recuperar y todo lo que hay entre medias. Suave por dentro, resistente por fuera, con capucha ajustable, un amplio bolsillo frontal y puños acanalados que se quedan en su sitio.",
    "desc.joggers": "Joggers entallados en un tejido elástico que se mueve contigo. Cintura elástica con cordón, bolsillos con cremallera para llevar lo esencial seguro y puños en el tobillo que quedan limpios sobre tus zapatillas. Del entrenamiento a los días de descanso.",
    "desc.shorts": "Pantalón corto de entrenamiento en un tejido ligero, con un corte a medio muslo que no estorba. Cintura elástica con cordón, bolsillos con cremallera para llaves y móvil, y detalles reflectantes para las sesiones al amanecer o de noche.",

    "cart.label": "Carrito",
    "cart.open": "Abrir carrito, {n} artículos",
    "cart.title": "Tu carrito",
    "cart.close": "Cerrar carrito",
    "cart.remove": "Quitar {name}",
    "cart.subtotal": "Subtotal",
    "cart.checkout": "Pagar · próximamente",
  },
};

const LANGS = ["en", "es"];
const LOCALES = { en: "en-IE", es: "es-ES" };
const STORAGE_KEY = "saura-lang";

const SauraI18n = (() => {
  const listeners = [];
  const originals = new Map();   // element -> its English HTML and attributes
  let lang = "en";

  const parseAttrs = (el) => el.dataset.i18nAttr.split(";").map((pair) => pair.split(":").map((s) => s.trim()));

  const remember = (el) => {
    if (originals.has(el)) return originals.get(el);
    const saved = { html: el.innerHTML, attrs: {} };
    if (el.dataset.i18nAttr) parseAttrs(el).forEach(([attr]) => { saved.attrs[attr] = el.getAttribute(attr); });
    originals.set(el, saved);
    return saved;
  };

  const apply = () => {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const saved = remember(el);
      el.innerHTML = lang === "en" ? saved.html : (ES[el.dataset.i18n] ?? saved.html);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const saved = remember(el);
      parseAttrs(el).forEach(([attr, key]) => {
        el.setAttribute(attr, lang === "en" ? saved.attrs[attr] : (ES[key] ?? saved.attrs[attr]));
      });
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
  };

  const set = (next) => {
    if (!LANGS.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked: choice lasts this visit */ }
    apply();
    listeners.forEach((fn) => fn(lang));
  };

  // Saved choice first; first-time visitors get English
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  lang = LANGS.includes(saved) ? saved : "en";
  apply();

  document.querySelectorAll("[data-lang]").forEach((btn) => btn.addEventListener("click", () => set(btn.dataset.lang)));

  return {
    get lang() { return lang; },
    get locale() { return LOCALES[lang]; },
    t: (key, vars = {}) => (UI[lang][key] ?? UI.en[key] ?? key).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? ""),
    onChange: (fn) => listeners.push(fn),
  };
})();
