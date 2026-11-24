(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const hasIO = "IntersectionObserver" in window;

  /* Avisa cuando cada elemento entra o sale de pantalla: fn(entry, observer).
     Sin IntersectionObserver los da por visibles. */
  const watch = (els, fn, opts) => {
    if (!hasIO) return els.forEach((el) => fn({ target: el, isIntersecting: true }));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => fn(e, io)), opts);
    els.forEach((el) => io.observe(el));
  };

  /* Traducción (js/i18n.js); si no cargó, usa el texto de respaldo */
  const t = (key, fallback) => (window.i18n && window.i18n.t(key)) || fallback;

  /* ---------- Tema claro / oscuro ---------- */
  const themeBtn = $(".theme-toggle");
  const isLight = () => root.getAttribute("data-theme") === "light";
  const updateThemeLabel = () =>
    themeBtn?.setAttribute("aria-label", isLight() ? t("theme.toDark", "Cambiar a tema oscuro") : t("theme.toLight", "Cambiar a tema claro"));
  themeBtn?.addEventListener("click", () => {
    const next = isLight() ? "dark" : "light";
    root.setAttribute("data-theme", next);
    updateThemeLabel();
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* almacenamiento no disponible */
    }
  });
  updateThemeLabel();
  document.addEventListener("langchange", updateThemeLabel);

  /* ---------- Header con fondo al hacer scroll ---------- */
  const header = $(".site-header");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", scrollY > 12);
    // Pasada buena parte de la portada, el logo se convierte en "volver arriba"
    header.classList.toggle("show-top", scrollY > innerHeight * 0.6);
  };
  if (header) {
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menú móvil ---------- */
  const menuBtn = $(".menu-toggle");
  const navLinks = $(".nav-links");
  const setMenu = (open) => {
    navLinks.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
    navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !navLinks.classList.contains("is-open")) return;
      setMenu(false);
      menuBtn.focus();
    });
  }

  /* ---------- Link activo según la sección visible ----------
     Una "píldora" se desliza por debajo de los links: marca la sección
     activa, sigue al mouse (o al foco del teclado) y vuelve a la activa al
     salir. En la portada (#inicio) no hay ninguna activa y se oculta. */
  const links = $$(".nav-links a[href^='#']");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  let pill = null;
  let pointed = null; // link bajo el mouse o con foco
  let clickLock = null; // link clickeado, fijo mientras dura el scroll automático
  if (navLinks && links.length) {
    pill = Object.assign(document.createElement("span"), { className: "nav-pill" });
    pill.setAttribute("aria-hidden", "true");
    navLinks.prepend(pill);
    navLinks.classList.add("has-pill");
  }

  const placePill = (instant) => {
    if (!pill) return;
    const target = clickLock || pointed || links.find((a) => a.classList.contains("is-active"));
    // El texto resaltado siempre es el del link que tiene la píldora debajo
    links.forEach((a) => a.classList.toggle("is-pill", a === target));
    if (!target || !target.offsetWidth) return pill.classList.remove("is-on");
    // Si estaba oculta, aparece en su lugar en vez de deslizarse desde el borde
    const jump = instant || !pill.classList.contains("is-on");
    pill.classList.toggle("no-anim", jump);
    Object.assign(pill.style, {
      width: target.offsetWidth + "px",
      height: target.offsetHeight + "px",
      transform: `translate(${target.offsetLeft}px, ${target.offsetTop}px)`,
    });
    pill.classList.add("is-on");
    if (jump) {
      void pill.offsetWidth; // aplica la posición antes de reactivar la transición
      pill.classList.remove("no-anim");
    }
  };

  const setActive = (id) => {
    links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
    placePill();
  };

  /* Al hacer click, la píldora va directo al link elegido y queda fija ahí:
     ni el mouse ni las secciones que pasan durante el scroll suave la mueven.
     Se libera 1 s después de que el scroll se detiene (UNLOCK_DELAY cuenta
     desde el último evento de scroll; ~160 ms para darlo por terminado + 1 s). */
  const UNLOCK_DELAY = 1160;
  let unlockTimer = 0;
  const armUnlock = () => {
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlockNav, UNLOCK_DELAY);
  };
  const unlockNav = () => {
    clickLock = pointed = null; // lo apuntado durante el bloqueo no cuenta; reacciona al próximo movimiento
    removeEventListener("scroll", armUnlock);
    placePill();
  };
  links.forEach((a) =>
    a.addEventListener("click", () => {
      clickLock = a;
      setActive(a.getAttribute("href").slice(1));
      removeEventListener("scroll", armUnlock);
      addEventListener("scroll", armUnlock, { passive: true });
      armUnlock(); // si no hay scroll (ya estaba ahí), se libera igual
    })
  );

  if (pill) {
    const point = (a) => {
      if (a === pointed) return;
      pointed = a;
      placePill();
    };
    // mousemove (no solo mouseenter): al liberarse el bloqueo, la píldora
    // responde en cuanto el puntero se mueve, aunque no cambie de link
    navLinks.addEventListener("mousemove", (e) => {
      const a = e.target.closest("a");
      if (links.includes(a)) point(a);
    });
    links.forEach((a) => a.addEventListener("focus", () => point(a)));
    navLinks.addEventListener("mouseleave", () => point(null));
    navLinks.addEventListener("focusout", (e) => navLinks.contains(e.relatedTarget) || point(null));
    // Los textos cambian de ancho con la ventana, el idioma y al cargar la tipografía
    const replace = () => placePill(true);
    addEventListener("resize", replace);
    document.addEventListener("langchange", replace);
    document.fonts?.ready.then(replace);
  }

  if (hasIO && sections.length) {
    const hero = document.getElementById("inicio");
    const onSection = (e) => !clickLock && e.isIntersecting && setActive(e.target.id);
    watch(hero ? [hero, ...sections] : sections, onSection, { rootMargin: "-45% 0px -50% 0px" });
  }

  /* ---------- Capturas que se turnan dentro del teléfono o la laptop ----------
     Cada 3 s pasa a la siguiente con un fundido (CSS). Solo corre mientras
     está en pantalla y la pestaña visible. Con "reducir movimiento" queda
     fija la primera captura. */
  const SLIDE_MS = 3000;
  $$("[data-slideshow]").forEach((show) => {
    const slides = $$(".phone-slide, .laptop-slide", show);
    if (slides.length < 2 || reduceMotion) return;
    let index = 0;
    let timer = 0;
    let inView = false;
    const next = () => {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    };
    const sync = () => {
      const run = inView && !document.hidden;
      if (run && !timer) timer = setInterval(next, SLIDE_MS);
      if (!run && timer) {
        clearInterval(timer);
        timer = 0;
      }
    };
    watch([show], (e) => {
      inView = e.isIntersecting;
      sync();
    });
    document.addEventListener("visibilitychange", sync);
  });

  /* ---------- Aparición al hacer scroll ---------- */
  const revealEls = $$(".reveal");
  const reveal = (e, io) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-visible");
    io?.unobserve(e.target);
  };
  if (reduceMotion) revealEls.forEach((el) => el.classList.add("is-visible"));
  else watch(revealEls, reveal, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  /* ---------- Copiar email y teléfono ---------- */
  // Respaldo sin la API del portapapeles (por ejemplo, abriendo el archivo local)
  const fallbackCopy = (text) => {
    const ta = Object.assign(document.createElement("textarea"), { value: text, readOnly: true });
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      /* sin permiso para copiar */
    }
    ta.remove();
    return ok;
  };
  $$("[data-copy]").forEach((btn) => {
    const label = $(".copy-label", btn);
    let timer = 0;
    const setLabel = (key, fallback) => label && (label.textContent = t(key, fallback));
    const done = () => {
      btn.classList.add("is-copied");
      setLabel("copy.done", "¡Copiado!");
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.classList.remove("is-copied");
        setLabel("contact.copy", "Copiar");
      }, 1800);
    };
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-copy");
      if (navigator.clipboard && isSecureContext) {
        navigator.clipboard.writeText(value).then(done, () => fallbackCopy(value) && done());
      } else if (fallbackCopy(value)) done();
    });
  });

  /* ---------- Marquee de tecnologías ----------
     Se mueve solo. Con el cursor encima funciona como una lupa: los logos
     se agrandan e iluminan al pasar por debajo. También se puede arrastrar
     y lanzar (mouse o dedo); después recupera de a poco su velocidad. */
  const marquee = $(".marquee");
  const track = marquee && $(".marquee-track", marquee);
  if (track && window.requestAnimationFrame) {
    const SECONDS_PER_LOOP = 38; // misma velocidad que la animación CSS de respaldo
    const LENS_RADIUS = 110; // px de alcance de la lupa
    const MAX_FLING = 4000; // px/s
    const cloneSource = track.lastElementChild;
    let items = [];
    let groupW = 0, x = 0, autoV = 0, v = 0;
    let dragging = false, dragId = null, lastX = 0, lastT = 0;
    let pointerX = null, lensOn = false, lens = 0, rafId = 0, prevT = 0;
    marquee.classList.add("is-live");

    const measure = () => {
      groupW = track.firstElementChild.offsetWidth;
      if (!groupW) return;
      // En pantallas más anchas que la lista, se suman copias para que no quede un hueco
      while (track.children.length < 6 && track.children.length * groupW < groupW + marquee.offsetWidth) {
        track.appendChild(cloneSource.cloneNode(true));
      }
      items = $$(".marquee-item", track).map((el) => ({ el, center: el.offsetLeft + el.offsetWidth / 2, f: -1 }));
      autoV = reduceMotion ? 0 : -groupW / SECONDS_PER_LOOP;
    };

    const frame = (now) => {
      const dt = Math.min((now - prevT) / 1000, 0.05);
      prevT = now;
      if (!dragging) {
        // Tras un lanzamiento, la velocidad vuelve suavemente a la normal
        v += (autoV - v) * (1 - Math.exp(-dt * 2.2));
        x += v * dt;
      }
      if (groupW) x = ((x % groupW) - groupW) % groupW;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;

      // Lupa: entra y sale con suavidad; cada ítem crece según su distancia al cursor
      lens += ((lensOn ? 1 : 0) - lens) * (1 - Math.exp(-dt * 9));
      if (!lensOn && lens < 0.003) lens = 0;
      for (const it of items) {
        let f = 0;
        if (lens && pointerX !== null) {
          const d = (it.center + x - pointerX) / LENS_RADIUS;
          f = Math.exp(-d * d) * lens;
          if (f < 0.01) f = 0;
        }
        if (Math.abs(f - it.f) > 0.003 || (f === 0 && it.f !== 0)) {
          it.f = f;
          it.el.style.setProperty("--f", f.toFixed(3));
        }
      }
      rafId = requestAnimationFrame(frame);
    };
    const start = () => {
      if (rafId) return;
      prevT = performance.now();
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    marquee.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch") lensOn = true;
    });
    marquee.addEventListener("pointerleave", () => (lensOn = false));
    marquee.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "touch") pointerX = e.clientX - marquee.getBoundingClientRect().left;
      if (!dragging || e.pointerId !== dragId) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      x += dx;
      v = v * 0.25 + (dx / (Math.max(now - lastT, 8) / 1000)) * 0.75;
      lastX = e.clientX;
      lastT = now;
    });
    marquee.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      dragging = true;
      dragId = e.pointerId;
      lastX = e.clientX;
      lastT = performance.now();
      v = 0;
      marquee.classList.add("is-dragging");
      try {
        marquee.setPointerCapture(e.pointerId);
      } catch (err) {
        /* el puntero ya se soltó */
      }
    });
    const endDrag = (e) => {
      if (!dragging || e.pointerId !== dragId) return;
      dragging = false;
      dragId = null;
      // Si el puntero quedó quieto antes de soltar, no hay impulso
      v = performance.now() - lastT > 90 ? 0 : Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
      marquee.classList.remove("is-dragging");
    };
    marquee.addEventListener("pointerup", endDrag);
    marquee.addEventListener("pointercancel", endDrag);

    measure();
    document.fonts?.ready.then(measure);
    addEventListener("load", measure);
    let resizeQueued = false;
    addEventListener("resize", () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        measure();
      });
    });
    // Solo anima mientras está a la vista
    watch([marquee], (e) => (e.isIntersecting ? start() : stop()));
  }

  /* ---------- Año del footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
