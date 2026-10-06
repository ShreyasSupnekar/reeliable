/* =====================================================================
   SCRIPT — makes the website work.
   You don't need to edit this file. Edit content.js instead.
   ===================================================================== */
(function () {
  "use strict";

  // Safe fallbacks in case something in content.js is missing
  const info = (typeof agencyInfo !== "undefined" && agencyInfo) || {};
  const hero = (typeof heroContent !== "undefined" && heroContent) || {};
  const work = (typeof projects !== "undefined" && Array.isArray(projects)) ? projects.slice(0, 5) : [];
  const formCfg = (typeof formSettings !== "undefined" && formSettings) || {};

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const escapeHTML = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const withItalics = (s) => escapeHTML(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
  const pad = (n) => String(n).padStart(2, "0");
  const isImage = (src) => /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(src || "");
  const isFilled = (v) => typeof v === "string" && v.trim() !== "" && !/^\[?\s*add\b/i.test(v.trim()) && !/^your\b/i.test(v.trim());

  /* ---------------- 1. Text from content.js ---------------- */
  function fillText() {
    const name = isFilled(info.name) ? info.name.trim() : "Studio";
    $$("[data-agency-name]").forEach((el) => (el.textContent = name));
    document.title = name + " — AI UGC Ad Studio";

    if (hero.eyebrow) $("[data-hero-eyebrow]").textContent = hero.eyebrow;
    if (hero.headline) $("[data-hero-headline]").innerHTML = withItalics(hero.headline);
    if (hero.subtitle) $("[data-hero-subtitle]").textContent = hero.subtitle;

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------------- 2. Contact details ---------------- */
  function setContact(id, href, label, external) {
    const old = document.getElementById(id);
    if (!old) return;
    let el;
    if (href) {
      el = document.createElement("a");
      el.href = href;
      if (external) { el.target = "_blank"; el.rel = "noopener"; }
    } else {
      el = document.createElement("span");
    }
    el.id = id;
    el.className = "contact__value";
    el.textContent = label;
    old.replaceWith(el);
  }

  function socialLink(value, base) {
    if (!isFilled(value)) return null;
    let v = value.trim();
    if (/^https?:\/\//i.test(v)) {
      const handle = v.replace(/\/+$/, "").split("/").pop().split("?")[0];
      return { href: v, label: handle ? "@" + handle.replace(/^@/, "") : v };
    }
    v = v.replace(/^@/, "");
    return { href: base + v, label: "@" + v };
  }

  function fillContact() {
    const digits = String(info.phone || "").replace(/\D/g, "");
    const cc = String(info.countryCode || "").replace(/\D/g, "");
    if (digits) {
      const pretty = cc === "91" && digits.length === 10
        ? "+91 " + digits.slice(0, 5) + " " + digits.slice(5)
        : (cc ? "+" + cc + " " : "") + digits;
      setContact("contact-phone", "tel:" + (cc ? "+" + cc : "") + digits, pretty);
    } else {
      setContact("contact-phone", null, "Coming soon");
    }

    const email = isFilled(info.email) && /\S+@\S+\.\S+/.test(info.email) ? info.email.trim() : "";
    setContact("contact-email", email ? "mailto:" + email : null, email || "Coming soon");

    const ig = socialLink(info.instagram, "https://instagram.com/");
    setContact("contact-instagram", ig && ig.href, ig ? ig.label : "Coming soon", true);

    const x = socialLink(info.x, "https://x.com/");
    setContact("contact-x", x && x.href, x ? x.label : "Coming soon", true);
  }

  /* ---------------- 3. Media (video / image with placeholder) ---------------- */
  const PLAY_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>';

  function placeholder(i) {
    const ph = document.createElement("div");
    ph.className = "ph ph--" + (i % 5);
    ph.innerHTML = '<span class="ph__num">' + pad(i + 1) + '</span><span class="ph__note">Your ad goes here</span>';
    return ph;
  }

  // Adds the real file on top of the placeholder. If the file is missing,
  // the placeholder simply stays. Videos load only when they scroll into view.
  function addMedia(container, src, alt) {
    if (!isFilled(src)) return null;
    let el;
    if (isImage(src)) {
      el = document.createElement("img");
      el.alt = alt || "";
      el.loading = "lazy";
      el.decoding = "async";
      el.addEventListener("error", () => el.remove());
      el.src = src;
    } else {
      el = document.createElement("video");
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.setAttribute("muted", "");
      el.setAttribute("playsinline", "");
      el.preload = "none";
      el.dataset.src = src;
      el.setAttribute("aria-hidden", "true");
      el.addEventListener("error", () => el.remove());
      videoObserver.observe(el);
    }
    container.appendChild(el);
    return el;
  }

  const videoObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            if (!v.src && v.dataset.src) { v.preload = "metadata"; v.src = v.dataset.src; }
            if (!reduceMotion) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { rootMargin: "200px 0px", threshold: 0.15 })
    : { observe: (v) => { v.src = v.dataset.src; } };

  /* ---------------- 4. Recent Work grid ---------------- */
  function buildWork() {
    const grid = $("#work-grid");
    if (!grid) return;
    const list = work.length ? work : Array.from({ length: 5 }, (_, i) => ({ title: "Project " + pad(i + 1), category: "AI UGC Ad", description: "", media: "" }));

    list.forEach((p, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card reveal";
      card.setAttribute("aria-label", "Watch " + (p.title || "project " + (i + 1)) + (p.category ? " — " + p.category : ""));

      const media = document.createElement("div");
      media.className = "card__media";
      media.appendChild(placeholder(i));
      addMedia(media, p.media, p.title);

      card.appendChild(media);
      card.insertAdjacentHTML("beforeend",
        '<span class="card__index">' + pad(i + 1) + "</span>" +
        '<span class="card__play">' + PLAY_ICON + "</span>" +
        '<span class="card__overlay">' +
          (p.category ? '<span class="card__cat">' + escapeHTML(p.category) + "</span>" : "") +
          '<span class="card__title">' + escapeHTML(p.title || "") + "</span>" +
          (p.description ? '<span class="card__desc">' + escapeHTML(p.description) + "</span>" : "") +
        "</span>");

      card.addEventListener("click", () => openLightbox(p, i));
      grid.appendChild(card);
    });
  }

  /* ---------------- 5. Hero phones ---------------- */
  function buildHeroPhones() {
    $$("[data-hero-phone]").forEach((phone) => {
      const i = Number(phone.dataset.heroPhone);
      const box = $(".phone__media", phone);
      box.appendChild(placeholder(i));
      const p = work[i];
      if (p) addMedia(box, p.media, "");
    });
  }

  /* ---------------- 6. Dialog helpers ---------------- */
  function openDialog(d) {
    if (!d) return;
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    document.documentElement.classList.add("is-locked");
  }
  function closeDialog(d) {
    if (!d) return;
    if (typeof d.close === "function" && d.open) d.close(); else { d.removeAttribute("open"); d.dispatchEvent(new Event("close")); }
  }
  $$("dialog").forEach((d) => {
    d.addEventListener("close", () => {
      if (!$$("dialog").some((x) => x.open)) document.documentElement.classList.remove("is-locked");
    });
    // click on the dark backdrop closes
    d.addEventListener("click", (e) => { if (e.target === d) closeDialog(d); });
  });
  $$("[data-close-modal]").forEach((btn) => btn.addEventListener("click", () => closeDialog(btn.closest("dialog"))));

  /* ---------------- 7. Lightbox (watch an ad) ---------------- */
  const lightbox = $("#lightbox");
  function openLightbox(p, i) {
    const stage = $("#lightbox-stage");
    stage.innerHTML = "";
    stage.appendChild(placeholder(i));
    if (isFilled(p.media)) {
      let el;
      if (isImage(p.media)) {
        el = document.createElement("img");
        el.alt = p.title || "";
      } else {
        el = document.createElement("video");
        el.controls = true;
        el.autoplay = true;
        el.playsInline = true;
        el.setAttribute("playsinline", "");
      }
      el.style.position = "absolute";
      el.style.inset = "0";
      el.addEventListener("error", () => el.remove());
      el.src = p.media;
      stage.appendChild(el);
    }
    $("#lightbox-cat").textContent = p.category || "";
    $("#lightbox-title").textContent = p.title || "";
    $("#lightbox-desc").textContent = p.description || "";
    openDialog(lightbox);
  }
  lightbox.addEventListener("close", () => {
    const v = $("video", lightbox);
    if (v) v.pause();
    $("#lightbox-stage").innerHTML = "";
  });

  /* ---------------- 8. Booking modal + form ---------------- */
  const booking = $("#booking-modal");
  const form = $("#booking-form");
  const formView = $("#booking-form-view");
  const successView = $("#booking-success");
  const submitBtn = $("#booking-submit");
  const note = $("#form-note");

  function openBooking() {
    closeMenu();
    formView.hidden = false;
    successView.hidden = true;
    openDialog(booking);
    setTimeout(() => { const f = $("#f-first"); if (f && window.innerWidth > 600) f.focus(); }, 60);
  }
  $$("[data-open-booking]").forEach((b) => b.addEventListener("click", openBooking));

  booking.addEventListener("close", () => {
    if (!successView.hidden) {
      form.reset();
      $$("input, textarea", form).forEach((f) => f.removeAttribute("aria-invalid"));
      $$(".field__error", form).forEach((e) => (e.textContent = ""));
      attempted = false;
    }
  });

  const rules = {
    "f-first": (v) => v.trim() ? "" : "Please enter your first name.",
    "f-last": (v) => v.trim() ? "" : "Please enter your last name.",
    "f-email": (v) => !v.trim() ? "Please enter your email." : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
    "f-whatsapp": (v) => {
      if (!v.trim()) return "Please enter your WhatsApp number.";
      const d = v.replace(/\D/g, "");
      return /^[+\d\s()\-]+$/.test(v.trim()) && d.length >= 7 && d.length <= 15 ? "" : "Please enter a valid WhatsApp number.";
    },
  };
  let attempted = false;

  function validateField(id) {
    const input = document.getElementById(id);
    const msg = rules[id](input.value);
    const err = document.getElementById(id + "-err");
    err.textContent = msg;
    if (msg) { input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", id + "-err"); }
    else { input.removeAttribute("aria-invalid"); input.removeAttribute("aria-describedby"); }
    return !msg;
  }
  Object.keys(rules).forEach((id) => {
    document.getElementById(id).addEventListener("input", () => { if (attempted) validateField(id); });
  });

  async function sendForm(data) {
    const subject = "New strategy call request — " + data.first_name + " " + data.last_name;
    if (isFilled(formCfg.web3formsKey)) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ access_key: formCfg.web3formsKey.trim(), subject: subject, from_name: "Website" }, data)),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || "Request failed");
      return;
    }
    const email = isFilled(info.email) && /\S+@\S+\.\S+/.test(info.email) ? info.email.trim() : "";
    if (email) {
      const res = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(email), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ _subject: subject, _template: "table", _captcha: "false" }, data)),
      });
      if (!res.ok) throw new Error("Request failed");
      return;
    }
    // No email or key yet: nothing to send to (preview mode).
    console.info("[Form preview] Add your email in content.js to receive these requests:", data);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    attempted = true;
    note.textContent = "";
    const results = Object.keys(rules).map(validateField);
    if (results.includes(false)) {
      const firstBad = $("[aria-invalid='true']", form);
      if (firstBad) firstBad.focus();
      return;
    }
    if (form.botcheck && form.botcheck.checked) return; // spam bot

    const data = {
      first_name: form.first_name.value.trim(),
      last_name: form.last_name.value.trim(),
      email: form.email.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      comments: form.comments.value.trim() || "—",
    };

    submitBtn.disabled = true;
    const label = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    try {
      await sendForm(data);
      formView.hidden = true;
      successView.hidden = false;
      const closeBtn = $("[data-close-modal]", successView);
      if (closeBtn) closeBtn.focus();
    } catch (err) {
      const digits = String(info.phone || "").replace(/\D/g, "");
      const cc = String(info.countryCode || "").replace(/\D/g, "");
      note.innerHTML = "Something went wrong. Please try again" +
        (digits ? ', or <a href="https://wa.me/' + cc + digits + '" target="_blank" rel="noopener">message us on WhatsApp</a>.' : ".");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = label;
    }
  });

  /* ---------------- 9. Navigation ---------------- */
  const nav = $("#nav");
  const toggle = $(".nav__toggle");
  const menu = $("#mobile-menu");

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.documentElement.classList.add("is-locked");
    nav.classList.add("is-scrolled");
  }
  function closeMenu() {
    if (menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (!$$("dialog").some((x) => x.open)) document.documentElement.classList.remove("is-locked");
    onScroll();
  }
  toggle.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 960) closeMenu(); });

  // Smooth scrolling for every in-page link
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    const behavior = reduceMotion ? "auto" : "smooth";
    if (id === "home" || id === "main") window.scrollTo({ top: 0, behavior: behavior });
    else target.scrollIntoView({ behavior: behavior, block: "start" });
    if (id === "main") target.setAttribute("tabindex", "-1"), target.focus({ preventScroll: true });
  });

  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 10 || !menu.hidden); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the current section in the menu
  if ("IntersectionObserver" in window) {
    const links = $$("[data-nav]");
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id === "book" ? "why-us" : entry.target.id;
        links.forEach((a) => a.classList.toggle("is-active", a.dataset.nav === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "work", "why-ai-ugc", "why-us", "book", "contact"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) sectionObserver.observe(s);
    });
  }

  /* ---------------- 10. Reveal on scroll ---------------- */
  function setupReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => obs.observe(el));
  }

  /* ---------------- Start ---------------- */
  fillText();
  fillContact();
  buildWork();
  buildHeroPhones();
  setupReveal();
})();
