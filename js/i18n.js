// SAURA — English / Spanish translations.
// English lives in the HTML itself. Elements marked data-i18n="key" get their
// content swapped from ES below; data-i18n-attr="attr:key; attr:key" does the
// same for attributes (aria-label, alt, content…). UI holds the strings that
// scripts build at runtime (product cards, filters, menu labels).

const ES = {
  // Page meta
  "meta.home.title": "Saura — Hecho para moverse",
  "meta.home.desc": "Saura es ropa de rendimiento pensada para entrenar y para el día a día. Prendas fiables con energía de sobra.",
  "meta.products.title": "Productos — Saura",
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
  "hero.title": 'Hecho<br>para <span class="accent">moverse.</span>',
  "hero.lead": "Ropa diseñada para entrenar y pensada para la calle. Fiable cuando cuenta, impecable incluso cuando no hace falta.",
  "hero.discover": "Descubre Saura",
  "hero.contact": "Contáctanos",
  "hero.scroll": "Ir a la sección de la marca",

  // Marquee
  "marquee.reliable": "Fiable",
  "marquee.relentless": "Incansable",
  "marquee.versatile": "Versátil",
  "marquee.built": "Hecho para moverse",

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
  "team.member": "Miembro del equipo",
  "team.role.ceo": "Fundador/a y CEO",
  "team.role.design": "Dirección de diseño",
  "team.role.ops": "Producto y operaciones",
  "team.role.marketing": "Marketing y comunidad",

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
    "product.colours": "{n} colours",
    "tag.new": "New",
    "count.one": "1 product",
    "count.other": "{n} products",
    "catalogue.empty": "No products match these filters yet.",
    "filter.allTypes": "All types",
    "type.tee": "Tees", "type.tank": "Tanks", "type.hoodie": "Hoodies", "type.jacket": "Jackets",
    "type.shorts": "Shorts", "type.joggers": "Joggers", "type.leggings": "Leggings", "type.bra": "Sports bras",
  },
  es: {
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "gender.men": "Hombre",
    "gender.women": "Mujer",
    "product.colours": "{n} colores",
    "tag.new": "Nuevo",
    "count.one": "1 producto",
    "count.other": "{n} productos",
    "catalogue.empty": "Todavía no hay productos con estos filtros.",
    "filter.allTypes": "Todos los tipos",
    "type.tee": "Camisetas", "type.tank": "Camisetas de tirantes", "type.hoodie": "Sudaderas", "type.jacket": "Chaquetas",
    "type.shorts": "Pantalones cortos", "type.joggers": "Joggers", "type.leggings": "Mallas", "type.bra": "Sujetadores deportivos",
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

  // Saved choice first; first-time visitors get Spanish
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  lang = LANGS.includes(saved) ? saved : "es";
  apply();

  document.querySelectorAll("[data-lang]").forEach((btn) => btn.addEventListener("click", () => set(btn.dataset.lang)));

  return {
    get lang() { return lang; },
    get locale() { return LOCALES[lang]; },
    t: (key, vars = {}) => (UI[lang][key] ?? UI.en[key] ?? key).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? ""),
    onChange: (fn) => listeners.push(fn),
  };
})();
