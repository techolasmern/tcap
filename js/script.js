/* =====================================================================
   1. CONTENT — edit everything here. Empty values are hidden automatically.
   All text below is SAMPLE content: replace it with your real details.
   ===================================================================== */
const CONFIG = {
    name: "VISHNU M K",
    initials: "VMK",
    title: "Full Stack Developer",
    roles: ["Full Stack Developer", "MERN Stack Engineer", "Problem Solver"],
    greeting: "Hi, I'm Your Name.",
    headline: "I build fast, reliable web products.",
    description: "SAMPLE: Replace this with one or two sentences about what you build and the value you bring to teams and clients.",
    availability: "Open to new opportunities", // "" hides the badge
    profileImage: "", // e.g. "assets/images/profile.jpg" — blank shows an initials avatar
    resume: "", // e.g. "assets/resume.pdf" — blank hides the button
    about: [
        "SAMPLE: Introduce yourself and your career journey in a few honest sentences.",
        "SAMPLE: Describe how you approach problems, what you enjoy working on and where you want to grow."
    ],
    focus: { title: "Areas of focus", items: ["Frontend development", "REST API design", "Databases"] },
    stats: [], // e.g. [{ value: "3+", label: "Years of experience" }] — only add numbers you can verify
    skills: [
        { category: "Frontend", items: [{ n: "HTML5", i: "layout" }, { n: "CSS3", i: "palette" }, { n: "JavaScript", i: "braces" }, { n: "Tailwind CSS", i: "wind" }] },
        { category: "Backend", items: [{ n: "Node.js", i: "server" }, { n: "Express", i: "route" }] },
        { category: "Databases", items: [{ n: "MongoDB", i: "database" }, { n: "PostgreSQL", i: "database" }] },
        { category: "Tools", items: [{ n: "Git & GitHub", i: "git-branch" }, { n: "VS Code", i: "code" }, { n: "Figma", i: "figma" }] }
    ],
    // category must match one of the filters shown; filters are generated from your projects
    projects: [
        { title: "Sample Project One", category: "Web Development", image: "", description: "SAMPLE: What it does and the problem it solves.", features: ["Key feature", "Another feature"], tech: ["Node.js", "MongoDB"], demo: "", code: "", caseStudy: "" },
        { title: "Sample Project Two", category: "Data Analytics", image: "", description: "SAMPLE: Describe the analysis, dataset and outcome.", features: ["Dashboard", "Insights"], tech: ["Python", "SQL"], demo: "", code: "", caseStudy: "" },
        { title: "Sample Project Three", category: "Web Development", image: "", description: "SAMPLE: Another project summary.", features: ["Responsive UI"], tech: ["HTML", "CSS", "JavaScript"], demo: "", code: "", caseStudy: "" }
    ],
    experience: [
        { role: "Your Job Title", org: "Company or Institution", start: "Mon YYYY", end: "Present", type: "Work", points: ["SAMPLE: A responsibility or achievement."], tech: ["JavaScript"] },
        { role: "Your Degree", org: "University Name", start: "YYYY", end: "YYYY", type: "Education", points: ["SAMPLE: Relevant coursework or achievements."], tech: [] }
    ],
    achievements: [], // e.g. [{ title: "Certificate name", issuer: "Issuer", year: "2025", link: "" }]
    contact: { // leave blank to hide a card. Phone/WhatsApp use digits with country code, e.g. "919876543210"
        email: "hello@example.com", // SAMPLE
        phone: "",
        whatsapp: "",
        whatsappMessage: "Hi! I found your portfolio and would like to connect.",
        linkedin: "", github: "", instagram: "",
        location: ""
    }
};

/* =====================================================================
   2. HELPERS
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = (u) => (/^https?:\/\//i.test(u) ? esc(u) : "");
const icons = () => window.lucide && window.lucide.createIcons();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];
const SOCIALS = [["github", "GitHub", "github"], ["linkedin", "LinkedIn", "linkedin"], ["instagram", "Instagram", "instagram"]];

/* =====================================================================
   3. RENDER
   ===================================================================== */
function renderStatic() {
    const c = CONFIG;
    document.title = `${c.name} – ${c.title} Portfolio`;
    $("#logo").innerHTML = `${esc(c.initials)}<span class="accent-text">.</span>`;
    const link = (id, label) => `<a href="#${id}" class="nav-link" data-nav="${id}">${label}</a>`;
    $("#desktop-nav").innerHTML = NAV.map(([id, l]) => link(id, l)).join("");
    $("#mobile-menu").innerHTML = NAV.map(([id, l]) => link(id, l)).join("") + `<a href="#contact" class="btn btn-primary">Let's Connect</a>`;
    $("#footer-nav").innerHTML = NAV.map(([id, l]) => `<a href="#${id}" class="muted hover:text-[var(--text)]">${l}</a>`).join("");

    $("#greeting").textContent = c.greeting;
    $("#hero-title").textContent = c.headline;
    $("#hero-desc").textContent = c.description;
    if (c.availability) { $("#availability").hidden = false; $("#availability-text").textContent = c.availability; }

    const img = $("#profile-img");
    img.src = c.profileImage || "data:image/svg+xml," + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#1b1f27"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Space Grotesk,sans-serif" font-size="140" font-weight="700" fill="#6ee7b7">${esc(c.initials)}</text></svg>`);
    img.alt = c.profileImage ? `Portrait of ${c.name}` : `${c.name} initials avatar`;

    $("#about-text").innerHTML = c.about.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#about-focus").innerHTML = `<h3>${esc(c.focus.title)}</h3><ul class="mt-3 flex flex-wrap gap-2">${c.focus.items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul>`;
    $("#about-stats").innerHTML = c.stats.map((s) => `<div class="card stat"><strong>${esc(s.value)}</strong><span class="muted text-sm">${esc(s.label)}</span></div>`).join("");
    if (c.resume) { const r = $("#resume-btn"); r.href = esc(c.resume); r.hidden = false; }

    $("#skills-grid").innerHTML = c.skills.map((g) => `
    <div class="card reveal"><h3>${esc(g.category)}</h3>
      <ul class="mt-4 flex flex-wrap gap-2">${g.items.map((s) => `<li class="chip"><i data-lucide="${esc(s.i || "check")}" width="14" height="14"></i>${esc(s.n)}</li>`).join("")}</ul>
    </div>`).join("");

    $("#timeline").innerHTML = c.experience.map((e) => `
    <li class="card reveal">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3>${esc(e.role)}</h3><span class="text-sm muted">${esc(e.start)} – ${esc(e.end)}</span>
      </div>
      <p class="accent-text text-sm font-medium">${esc(e.org)} <span class="muted">(${esc(e.type)})</span></p>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-sm muted">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${e.tech.length ? `<ul class="mt-4 flex flex-wrap gap-2">${e.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>` : ""}
    </li>`).join("");

    if (c.achievements.length) {
        $("#achievements").hidden = false;
        $("#achievements-grid").innerHTML = c.achievements.map((a) => {
            const u = safeUrl(a.link || "");
            const body = `<i data-lucide="award" class="accent-text"></i><h3 class="mt-3">${esc(a.title)}</h3><p class="text-sm muted">${esc(a.issuer || "")} ${esc(a.year || "")}</p>`;
            return u ? `<a class="card reveal link-card block" href="${u}" target="_blank" rel="noopener noreferrer"><div>${body}</div></a>` : `<div class="card reveal">${body}</div>`;
        }).join("");
    }

    const socials = SOCIALS.filter(([k]) => safeUrl(c.contact[k])).map(([k, label, icon]) =>
        `<li><a class="social-link" href="${safeUrl(c.contact[k])}" target="_blank" rel="noopener noreferrer" aria-label="${label}"><i data-lucide="${icon}"></i></a></li>`).join("");
    $("#hero-socials").innerHTML = socials; $("#footer-socials").innerHTML = socials;
    $("#footer-name").textContent = c.name; $("#footer-name-2").textContent = c.name;
    $("#year").textContent = new Date().getFullYear();
}

function renderContact() {
    const k = CONFIG.contact, cards = [];
    const add = (icon, label, value, href, ext) => cards.push(`
    <a class="card link-card reveal" href="${href}" ${ext ? 'target="_blank" rel="noopener noreferrer"' : ""}>
      <span class="ico"><i data-lucide="${icon}"></i></span>
      <span><span class="block font-heading font-semibold">${label}</span><span class="block break-all text-sm muted">${esc(value)}</span></span>
    </a>`);
    if (k.email) add("mail", "Email", k.email, `mailto:${esc(k.email)}`);
    const digits = (v) => String(v || "").replace(/[^\d]/g, "");
    if (digits(k.phone)) add("phone", "Phone", k.phone, `tel:+${digits(k.phone)}`);
    if (digits(k.whatsapp)) add("message-circle", "WhatsApp", "Chat directly", `https://wa.me/${digits(k.whatsapp)}${k.whatsappMessage ? "?text=" + encodeURIComponent(k.whatsappMessage) : ""}`, true);
    if (safeUrl(k.linkedin)) add("linkedin", "LinkedIn", "View profile", safeUrl(k.linkedin), true);
    if (safeUrl(k.github)) add("github", "GitHub", "View repositories", safeUrl(k.github), true);
    if (safeUrl(k.instagram)) add("instagram", "Instagram", "View profile", safeUrl(k.instagram), true);
    let html = cards.join("");
    if (k.location) html += `<div class="card link-card reveal"><span class="ico"><i data-lucide="map-pin"></i></span><span><span class="block font-heading font-semibold">Location</span><span class="block text-sm muted">${esc(k.location)}</span></span></div>`;
    $("#contact-grid").innerHTML = html;
}

function renderProjects() {
    const cats = ["All", ...new Set(CONFIG.projects.map((p) => p.category))];
    const filters = $("#project-filters");
    filters.hidden = CONFIG.projects.length < 4; // filters only when there are enough projects
    filters.innerHTML = cats.map((c, i) => `<button type="button" class="filter-btn" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");
    $("#projects-grid").innerHTML = CONFIG.projects.map((p) => {
        const links = [
            safeUrl(p.demo) && `<a href="${safeUrl(p.demo)}" target="_blank" rel="noopener noreferrer"><i data-lucide="external-link"></i>Live demo</a>`,
            safeUrl(p.code) && `<a href="${safeUrl(p.code)}" target="_blank" rel="noopener noreferrer"><i data-lucide="github"></i>Source code</a>`,
            safeUrl(p.caseStudy) && `<a href="${safeUrl(p.caseStudy)}" target="_blank" rel="noopener noreferrer"><i data-lucide="file-text"></i>Case study</a>`
        ].filter(Boolean).join("");
        return `<article class="card project reveal" data-category="${esc(p.category)}">
      <div class="project-thumb">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" width="640" height="400" loading="lazy" decoding="async">` : `<i data-lucide="image" width="32" height="32" aria-hidden="true"></i>`}</div>
      <div class="project-body">
        <h3 class="text-xl">${esc(p.title)}</h3>
        <p class="text-sm muted">${esc(p.description)}</p>
        ${p.features?.length ? `<ul class="list-disc pl-5 text-sm muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <ul class="flex flex-wrap gap-2">${p.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
        ${links ? `<div class="project-links">${links}</div>` : ""}
      </div></article>`;
    }).join("");
}

/* =====================================================================
   4. BEHAVIOUR
   ===================================================================== */
function initTheme() {
    const root = document.documentElement, btn = $("#theme-toggle");
    const sync = () => btn.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    sync();
    btn.addEventListener("click", () => {
        root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
        try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { }
        sync();
    });
}

function initMenu() {
    const menu = $("#mobile-menu"), btn = $("#menu-toggle");
    const set = (open) => {
        menu.hidden = !open;
        btn.setAttribute("aria-expanded", String(open));
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        btn.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`; icons();
    };
    btn.addEventListener("click", () => set(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#site-header")) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => e.matches && set(false));
}

function initActiveNav() {
    const links = $$("[data-nav]"), ids = NAV.map(([id]) => id);
    const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            links.forEach((a) => { const on = a.dataset.nav === en.target.id; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const s = document.getElementById(id); s && io.observe(s); });
}

function initReveal() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) return items.forEach((el) => el.classList.add("in"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
}

function initFilters() {
    const wrap = $("#project-filters");
    wrap.addEventListener("click", (e) => {
        const b = e.target.closest(".filter-btn"); if (!b) return;
        $$(".filter-btn", wrap).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        $$("#projects-grid .project").forEach((card) => { card.hidden = !(b.dataset.filter === "All" || card.dataset.category === b.dataset.filter); });
    });
}

function initRoles() {
    const el = $("#role-text"), roles = CONFIG.roles;
    if (!roles.length) return;
    if (reduceMotion || roles.length === 1) { el.textContent = roles[0]; return; }
    let r = 0, c = 0, del = false;
    (function tick() {
        const word = roles[r];
        el.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
        if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 40 : 80);
    })();
}

function initBackToTop() {
    $("#back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}

/* =====================================================================
   5. INIT
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    renderStatic(); renderContact(); renderProjects();
    icons();
    initTheme(); initMenu(); initActiveNav(); initReveal(); initFilters(); initRoles(); initBackToTop();
});