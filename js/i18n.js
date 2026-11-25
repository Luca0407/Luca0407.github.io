/* =========================================================
   Traducciones ES / EN
   - El español es el texto original del HTML (no se repite acá).
   - Cada elemento traducible tiene data-i18n="clave" (se reemplaza su HTML)
     y/o data-i18n-attr="atributo:clave,otro:clave2".
   - Para editar el inglés, cambiá los textos de EN.
   - Link directo en inglés: index.html?lang=en
   ========================================================= */
(function () {
  "use strict";

  /* Textos que no están en el HTML (los usa main.js) */
  var UI_ES = {
    "theme.toLight": "Cambiar a tema claro",
    "theme.toDark": "Cambiar a tema oscuro",
    "lang.switch": "Switch to English",
    "copy.done": "¡Copiado!"
  };

  var EN = {
    /* ---- Interfaz ---- */
    "theme.toLight": "Switch to light theme",
    "theme.toDark": "Switch to dark theme",
    "lang.switch": "Cambiar a español",
    "copy.done": "Copied!",
    "meta.title": "Luca Elizondo — Flutter Developer · Offline-first apps",
    "meta.description": "Luca Elizondo, a Flutter developer from Chaco, Argentina. Offline-first apps in production: they store everything on the device, print over Bluetooth and sync when the connection comes back.",
    "skip": "Skip to content",
    "a11y.home": "Luca Elizondo, back to top",
    "a11y.sections": "Sections",
    "a11y.menu": "Open menu",
    "a11y.tech": "Technologies",

    /* ---- Navegación ---- */
    "nav.projects": "Projects",
    "nav.process": "Process",
    "nav.experience": "Experience",
    "nav.stack": "Stack",
    "nav.contact": "Contact",

    /* ---- Hero ---- */
    "hero.badge": "Available for projects or a full-time role",
    "hero.title": 'Flutter apps that keep working <span class="hl">offline.</span>',
    "hero.sub": "I specialize in apps for work out in the field and behind the counter: they store everything on the device, print receipts over Bluetooth, use the camera and sync when the connection comes back. Today they are used by municipal inspectors, drivers and shops.",
    "about.text": "I'm <strong>Luca Elizondo</strong>, a Flutter developer based in Chaco, Argentina. I have built systems for <strong>a municipality, a trade union organization and two businesses</strong> and, together with another developer, those of <strong>two ride-hailing companies</strong>. In SGM, the municipal app, I backed development with more than 540 automated tests.",
    "hero.cta": "View projects",
    "hero.contact": "Get in touch",
    "hero.cv": "View resume (PDF)",
    "about.eyebrow": "About me",
    "about.edu": "My background combines <strong>formal education</strong> (a Higher Technical Degree in Software Development), self-taught <strong>courses</strong> and <strong>projects</strong>, both my own and paid client work.",

    /* ---- Stats ---- */
    "stat1.dt": "Client systems",
    "stat1.label": "systems built for clients",
    "stat2.dt": "Tests in SGM",
    "stat2.label": "automated tests in SGM, the municipal app",
    "stat3.dt": "Platforms",
    "stat3.label": "platforms: Android, iOS, Windows and web",
    "stat4.dt": "Languages",
    "stat4.label": "English level · native Spanish",

    /* ---- Proyectos: comunes ---- */
    "projects.eyebrow": "Selected projects",
    "projects.title": 'Real systems, <span class="hl">in use.</span>',
    "projects.lead": "A municipal app, two ride-hailing ecosystems, a desktop system in production and a product of my own. I took part in requirements gathering, architecture, development and delivery on all of them; the ride-hailing ones were built together with another developer.",
    "status.private": "Private code",
    "visual.shots": "App screenshots · private code",
    "store.group": "Download the apps",
    "store.passengers": "Passengers",
    "store.customers": "Customers",
    "store.drivers": "Drivers",
    "p2.store.pax.android": "Tu Remis SP for passengers on Google Play",
    "p2.store.pax.ios": "Tu Remis SP for passengers on the App Store",
    "p2.store.drv.android": "Tu Remis SP Conductor (drivers) on Google Play",
    "p2.store.drv.ios": "Tu Remis SP Conductor (drivers) on the App Store",
    "p3.store.pax.android": "Remisses Sáenz Peña for customers on Google Play",
    "p3.store.drv.android": "Remisses Sáenz Peña Conductor (drivers) on Google Play",
    "role.codev": "<b>Role:</b> Flutter Developer · freelance, co-developed with another developer",

    /* SGM */
    "p1.status": "In production",
    "p1.kicker": "<b>01 / 05</b> · Mobile app · Android",
    "p1.sub": "Municipal Management System",
    "p1.desc": "An app for municipal inspectors in Chaco to issue violation reports in the field, with photo evidence, and print them on the spot on a portable thermal printer. I was responsible for the entire application.",
    "p1.c2": "Offline-first: local Drift/SQLite database, recoverable drafts, an outbox and catalog sync with the .NET API",
    "p1.c3": "Custom evidence camera, multipart photo uploads and ticket printing with barcode and QR code over Bluetooth",
    "p1.c4": "In-app APK updates, environments isolated by flavor, secure sessions and 540+ unit, widget and contract tests",
    "p1.decision": "<b>No duplicates:</b> each report carries a unique key generated on the phone, so resending it after losing signal doesn't create another one. If the server rejects a field, the report goes back to the inspector at the step to fix.",
    "p1.role": "<b>Role:</b> Mobile Developer · owned the entire app",
    "p1.aria": "SGM screenshots: sign-in, main menu and the first step of a new traffic violation report",

    /* Tu Remis SP */
    "p2.kicker": "<b>02 / 05</b> · Mobile apps · Android &amp; iOS",
    "p2.sub": "Passengers and drivers",
    "p2.status": "Published",
    "p2.desc": "An ecosystem of two apps, one for passengers and one for drivers, to request a ride, follow the trip on the map and share it in real time. It also includes an SOS system that contacts an emergency number.",
    "p2.c1": "Trips, statuses and driver location synced live with Cloud Firestore",
    "p2.c3": "Shareable trip tracking via link: deep links, a redirect Cloud Function and a page on Firebase Hosting",
    "p2.c4": "Email login with SMS verification, local notifications and forced updates via Remote Config",
    "p2.decision": "<b>Accepting a trip:</b> it's a Firestore transaction that only assigns it if it's still pending; if another driver took it first, the app tells them it's already taken.",
    "p2.aria": "Tu Remis SP screenshots: choosing a destination on the map, saved places and the driver-arrived notice with a verification code",

    /* Remisses Sáenz Peña */
    "p3.kicker": "<b>03 / 05</b> · Mobile apps + REST API",
    "p3.sub": "Customers and drivers",
    "p3.status": "Launching soon",
    "p3.desc": "Similar in scope to Tu Remis SP: two Flutter apps for a local ride service, one for customers and one for drivers, connected to a PHP and MySQL REST API hosted on Hostinger.",
    "p3.c2": "SOS button and emergency contacts for passengers and drivers",
    "p3.c3": "Push notifications with Firebase Cloud Messaging and PDF trip receipts",
    "p3.c4": "Map with live location, routes and saved places with Google Maps",
    "p3.aria": "Remisses Sáenz Peña screenshots: the passenger searches for nearby drivers, the driver receives the request, the passenger follows the driver on the way and the driver online on the map",

    /* STIMCh */
    "p4.kicker": "<b>04 / 05</b> · Desktop app · Windows",
    "p4.sub": "Member management · OSPIM",
    "p4.status": "In production",
    "p4.desc": "A desktop system to manage members, employer companies and family groups, in daily use. I started it as a C# WinForms prototype that was never used: the full system was built and put into production in Flutter for Windows.",
    "p4.c1": "Local SQLite database synced with Cloud Firestore from the desktop",
    "p4.c2": "Data entry, filterable lists and records for members, companies and family members",
    "p4.c3": "Keyboard shortcuts designed for efficient data entry, and PDF export of lists",
    "p4.role": "<b>Role:</b> Flutter Developer · freelance",
    "p4.aria": "STIMCh screenshots on a laptop: entering a company's data and the keyboard shortcuts list",

    /* Print-Table */
    "p5.kicker": "<b>05 / 05</b> · Own product · Android &amp; Windows",
    "p5.sub": "Repair shop management",
    "p5.status": "In use at two businesses",
    "p5.desc": "A system for a printer repair shop: each job is identified by a QR code, recorded in the daily cash register and tracked until delivery. Two businesses use it today.",
    "p5.decision": '<b>Sync:</b> it uses <a href="#outbox-sync">outbox_sync</a>, my open-source package. Changes made offline wait in a queue, and if another device changed the same job first, they come back as a conflict instead of overwriting it.',
    "p5.c2": "Jobs and orders with QR codes, daily cash register, balance and commissions with charts",
    "p5.c3": "Tickets on Bluetooth thermal printers (ESC/POS) and shareable PDF receipts",
    "p5.c4": "Firestore rules with schema validation and isolated tests with in-memory SQLite",
    "p5.role": "<b>Role:</b> Own project · design and development",
    "p5.aria": "Print-Table screenshots: on the laptop, the pending jobs list, the month's balance and entering a new job; on the phone, a new order, the shift's transactions and the daily cash register",

    /* ---- Código abierto · outbox_sync ---- */
    "oss.eyebrow": "Open source",
    "oss.lead": "Client code is private. This package is public: it's the sync <span class=\"nobr\">Print-Table</span> uses, so you can read the code and run the tests.",
    "oss.kicker": "<b>Dart package</b> · Dart &amp; Flutter · No dependencies",
    "oss.sub": "Offline-first sync",
    "oss.status": "Released · v0.1.0",
    "oss.license": "Open source · MIT",
    "oss.desc": "A package for apps that work without signal: it keeps every local change until the server confirms it, sends changes in order and retries without duplicating them. <span class=\"nobr\">Print-Table</span> uses it.",
    "oss.decision": "<b>No silent overwrites:</b> the server keeps each record's version and applies a change only if the record is still at the version it was made on. If another device changed it first, the change comes back as a conflict; device clocks are never compared.",
    "oss.c1": "Durable, ordered queue: saved after every step with an atomic write, so a crash never leaves it half-written",
    "oss.c2": "Idempotent retries with an id per operation, and exponential backoff with jitter between attempts",
    "oss.c3": "13 tests, including one that reproduces the data loss of deciding by modification time; CI runs format, analysis and tests",
    "oss.role": "<b>Role:</b> Author · design, code and tests",
    "oss.cta": "View on GitHub",
    "oss.code1": "// edited offline (version 4)",
    "oss.code2": "// back online",
    "oss.code3": "// show both versions",
    "oss.caption": "Package usage · public code",


    /* ---- Proceso ---- */
    "process.eyebrow": "How I work",
    "process.title": 'From requirements <span class="hl">to production.</span>',
    "process.lead": "The applications I build are used in the field, at service counters and in offices, often with limited connectivity. That is why I prioritize data design and how the system behaves when something fails.",
    "s1.title": "Requirements",
    "s1.text": "I meet with end users (inspectors, drivers, front-desk staff) to understand the actual workflow before development begins.",
    "s2.title": "Data and contracts",
    "s2.text": "I define the data model, the contracts with the backend and the offline strategy: local database, outbox and sync rules.",
    "s3.title": "Development with tests",
    "s3.text": "BLoC/Cubit state management and unit, widget and contract tests. In SGM, the municipal app, there are more than 540.",
    "s4.title": "Delivery and handover",
    "s4.text": "Per-environment builds, in-app updates and handover documentation, so the team that takes over can maintain the system without depending on me.",
    "note.title": "AI-assisted development, with judgment",
    "note.text": "I use Claude Code to audit code, write tests and document. Before each delivery, every change goes through my own review, following programming best practices and standards, and through the test suite.",

    /* ---- Experiencia ---- */
    "exp.eyebrow": "Experience",
    "exp.title": 'Background <span class="hl">and education.</span>',
    "exp.lead": "I work as a freelance developer, independently or as part of a team, while completing my Higher Technical Degree in Software Development.",
    "j1.org": "SGM · Municipality in Chaco",
    "j1.text": "Owned the entire municipal management mobile app, within an ecosystem of citizen apps and web dashboards built by other developers, on top of a .NET backend.",
    "j1.c1": "Designed and built violation reports for six areas, from the offline draft to the printed ticket",
    "j1.c2": "Integrated camera, GPS, Bluetooth, push notifications, a live bus map and a vehicle registry lookup",
    "j1.c3": "Set up APK distribution with in-app updates and environments isolated by flavor",
    "j1.c4": "Ensured quality with 540+ tests and technical documentation for the team",
    "j2.title": "Flutter Developer",
    "j2.text": "Co-developed, with another developer, two ride-hailing app ecosystems, each with one app for passengers and another for drivers, from the map and real-time trips to notifications and app store release.",
    "j2.c1": "Tu Remis SP: Firebase (Auth, Firestore, Cloud Functions, Hosting) and Google Maps. Published.",
    "j2.c2": "Remisses Sáenz Peña: PHP and MySQL REST API, real-time data on Firestore, push notifications and an SOS button. Launching soon.",
    "j3.date": "<b>2026</b>Freelance",
    "j3.title": "Desktop Software Developer",
    "j3.org": "STIMCh · Member management",
    "j3.text": "A system in production, built in Flutter for Windows with a local SQLite database and Firestore sync. I started it in C# with WinForms, but moved to Flutter before that version was ever used.",
    "j4.date": "<b>2024</b>Internship",
    "j4.title": "Developer",
    "j4.org": "Wipper Insumos · Professional Practice II",
    "j4.text": "A Python and Tkinter desktop management system for a real business, built in a team of two designers and two developers.",
    "j5.date": "<b>2023</b>Education",
    "j5.title": "Started my technical degree",
    "j5.org": "IES Juan Mantovani · Higher Technical Degree in Software Development",
    "j5.text": "Began the program, where I gained the foundations in programming, logic and databases that underpin my current work.",
    "edu.label": "Education",
    "edu.title": "Higher Technical Degree in Software Development",
    "edu.status": "Coursework complete · final exams in progress",
    "courses.label": "Courses",
    "course1": "Agile project management: Agile, Scrum and Kanban <span>Course</span>",
    "course2": "Introduction to cybersecurity <span>Udemy</span>",
    "course3": "Python for data analysis and Excel <span>Course</span>",
    "course4": "Object-oriented programming in Java <span>Bootcamp</span>",
    "langs.label": "Languages",
    "langs.es": "Spanish <span>Native</span>",
    "langs.en": "English <span>Advanced · C1</span>",

    /* ---- Stack ---- */
    "stack.eyebrow": "Stack",
    "stack.title": 'Languages and <span class="hl">tools.</span>',
    "stack.lead": "Flutter is my main tool, though I work across mobile, desktop and backend development depending on each project's requirements.",
    "stack.langs": "Languages",
    "stack.main": "Dart <small>Main</small>",
    "st1.camera": "Camera and sensors",
    "st2.title": "Desktop",
    "st3.title": "Backend and cloud",
    "st3.panel": "PHP - Web panel",
    "st4.title": "Data",
    "st5.title": "Integrations",
    "st5.printers": "ESC/POS thermal printers",
    "st5.codes": "QR codes and barcodes",
    "st6.title": "Quality and tools",
    "st6.git": "Git and GitHub",

    /* ---- Contacto ---- */
    "contact.eyebrow": "Contact",
    "contact.title": 'Let\'s work <span class="hl">together.</span>',
    "contact.lead": "I can take on part of a project, join a team for a project, or join a company in a permanent role, as a mobile or desktop developer, in Argentina or remotely.",
    "contact.copy": "Copy",
    "contact.copyAria": "Copy email",
    "contact.copyPhoneAria": "Copy phone number",
    "contact.waHref": "https://wa.me/5493644223841?text=Hi%20Luca%2C%20I%20saw%20your%20portfolio.",
    "contact.cv": "Resume in PDF",
    "cv.href": "assets/cv/Luca_Elizondo_CV_EN.pdf",

    /* ---- Footer ---- */
    "footer.top": "Back to top ↑"
  };

  var root = document.documentElement;
  var STORAGE_KEY = "lang";
  var esByKey = {}; // textos originales en español, por clave
  for (var k in UI_ES) esByKey[k] = UI_ES[k];

  var textNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var attrNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-attr]"));
  var metaDesc = document.querySelector('meta[name="description"]');

  // Guardar el español original
  textNodes.forEach(function (el) {
    el.__i18nEs = el.innerHTML;
    var key = el.getAttribute("data-i18n");
    if (!(key in esByKey)) esByKey[key] = el.innerHTML;
  });
  attrNodes.forEach(function (el) {
    el.__i18nEsAttr = {};
    parseAttrs(el).forEach(function (pair) {
      var value = el.getAttribute(pair.attr) || "";
      el.__i18nEsAttr[pair.attr] = value;
      if (!(pair.key in esByKey)) esByKey[pair.key] = value;
    });
  });
  esByKey["meta.title"] = document.title;
  if (metaDesc) esByKey["meta.description"] = metaDesc.getAttribute("content");

  function parseAttrs(el) {
    return el
      .getAttribute("data-i18n-attr")
      .split(",")
      .map(function (part) {
        var bits = part.split(":");
        return { attr: bits[0].trim(), key: (bits[1] || "").trim() };
      })
      .filter(function (p) {
        return p.attr && p.key;
      });
  }

  var current = root.lang === "en" ? "en" : "es";

  function t(key) {
    if (current === "en" && Object.prototype.hasOwnProperty.call(EN, key)) return EN[key];
    return esByKey[key] !== undefined ? esByKey[key] : "";
  }

  function apply(lang) {
    current = lang === "en" ? "en" : "es";
    var en = current === "en";

    textNodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.innerHTML = en && Object.prototype.hasOwnProperty.call(EN, key) ? EN[key] : el.__i18nEs;
    });
    attrNodes.forEach(function (el) {
      parseAttrs(el).forEach(function (pair) {
        var value = en && Object.prototype.hasOwnProperty.call(EN, pair.key) ? EN[pair.key] : el.__i18nEsAttr[pair.attr];
        el.setAttribute(pair.attr, value);
      });
    });

    root.lang = current;
    document.title = t("meta.title");
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));

    var toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) toggle.setAttribute("aria-label", t("lang.switch"));

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: current } }));
  }

  function set(lang, persist) {
    apply(lang);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, current);
      } catch (e) {
        /* almacenamiento no disponible */
      }
      try {
        var url = new URL(window.location.href);
        if (current === "en") url.searchParams.set("lang", "en");
        else url.searchParams.delete("lang");
        window.history.replaceState(null, "", url);
      } catch (e) {
        /* URL no modificable (por ejemplo, file://) */
      }
    }
  }

  window.i18n = {
    t: t,
    set: set,
    get lang() {
      return current;
    }
  };

  var toggle = document.querySelector("[data-lang-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      set(current === "en" ? "es" : "en", true);
    });
  }

  apply(current);
  root.classList.remove("i18n-pending");
})();
