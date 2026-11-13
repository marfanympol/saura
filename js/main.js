document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  // Solid header background once the page is scrolled
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const updateToggleLabel = () => {
    const open = menu.classList.contains("open");
    toggle.setAttribute("aria-label", SauraI18n.t(open ? "menu.close" : "menu.open"));
  };
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    updateToggleLabel();
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  SauraI18n.onChange(updateToggleLabel);
  updateToggleLabel();

  // Fade sections in as they scroll into view
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Hero video: only loaded on screens wider than 760px (tablets and up). Phones show the
  // still image set in the CSS and never download the video. Visitors who ask their device
  // for reduced motion get the poster frame instead of moving footage.
  const heroVideo = document.querySelector(".hero-video video");
  if (heroVideo) {
    const bigScreen = window.matchMedia("(min-width: 761px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadHeroVideo = () => {
      if (!bigScreen.matches) { heroVideo.pause(); return; }   // phone width: CSS hides it
      if (!heroVideo.poster) heroVideo.poster = heroVideo.dataset.poster;
      if (reduceMotion) return;                                // poster only, no playback
      if (!heroVideo.src) { heroVideo.preload = "auto"; heroVideo.src = heroVideo.dataset.src; }
      heroVideo.play().catch(() => {});   // if the browser blocks autoplay, the poster stays
    };
    loadHeroVideo();
    // e.g. a tablet rotated from portrait to landscape crosses the breakpoint
    bigScreen.addEventListener("change", loadHeroVideo);
  }

  // Brand cards: on devices with a mouse, hovering a card loads its clip (first time only)
  // and plays it slowed down (BRAND_VIDEO_SPEED); leaving pauses it. Touch screens never load the videos:
  // the CSS shows a still image instead. With reduced motion, hover shows the still frame.
  const BRAND_VIDEO_SPEED = 0.75;   // 1 = normal speed, 0.5 = half speed
  const canHover = window.matchMedia("(hover: hover)").matches;
  const reduceMotionPref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".pillar").forEach((card) => {
    const video = card.querySelector(".pillar-media video");
    if (!video || !canHover) return;
    card.addEventListener("mouseenter", () => {
      if (!video.poster) video.poster = video.dataset.poster;
      if (reduceMotionPref) return;
      if (!video.src) video.src = video.dataset.src;
      // defaultPlaybackRate survives the video loading; playbackRate alone gets reset
      video.defaultPlaybackRate = BRAND_VIDEO_SPEED;
      video.playbackRate = BRAND_VIDEO_SPEED;
      video.play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => video.pause());
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});
