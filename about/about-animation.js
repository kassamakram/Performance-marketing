document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP or ScrollTrigger is missing.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* =========================================================
       HELPERS (same pattern as components.js)
    ========================================================= */

    function revealUp(elements, options) {
        options = options || {};
        if (!elements) return;
        elements = elements.length !== undefined ? elements : [elements];
        if (!elements.length) return;

        gsap.set(elements, {
            y: options.y !== undefined ? options.y : 40,
            opacity: 0,
            filter: options.blur || "blur(6px)"
        });

        ScrollTrigger.batch(elements, {
            start: options.start || "top 88%",
            once: false,
            onEnter: function (batch) {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: options.duration || 0.65,
                    ease: "power3.out",
                    stagger: options.stagger !== undefined ? options.stagger : 0.08,
                    overwrite: true
                });
            },
            onLeaveBack: function (batch) {
                gsap.to(batch, {
                    y: options.y !== undefined ? options.y : 40,
                    opacity: 0,
                    filter: options.blur || "blur(6px)",
                    duration: 0.3,
                    ease: "power2.in",
                    stagger: 0.04,
                    overwrite: true
                });
            }
        });
    }

    function fadeFrom(el, vars, triggerOptions) {
        if (!el) return;
        gsap.from(el, Object.assign({
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: Object.assign({
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }, triggerOptions || {})
        }, vars));
    }

    // Counts up a "$4.2M", "3.2x", "100+", "24K" style number while keeping
    // the original suffix/prefix characters intact.
    function countUp(el, options) {
        if (!el) return;
        options = options || {};
        const raw = el.textContent.trim();
        const match = raw.match(/(-?[\d,.]+)/);
        if (!match) return;

        const numStr = match[1];
        const prefix = raw.slice(0, match.index);
        const suffix = raw.slice(match.index + numStr.length);
        const decimals = (numStr.split(".")[1] || "").length;
        const target = parseFloat(numStr.replace(/,/g, ""));
        if (isNaN(target)) return;

        const counter = { val: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: options.start || "top 90%",
            once: true,
            onEnter: function () {
                gsap.to(counter, {
                    val: target,
                    duration: options.duration || 1.4,
                    ease: "power2.out",
                    onUpdate: function () {
                        const v = decimals
                            ? counter.val.toFixed(decimals)
                            : Math.round(counter.val).toLocaleString();
                        el.textContent = prefix + v + suffix;
                    },
                    onComplete: function () {
                        el.textContent = raw;
                    }
                });
            }
        });
    }

    /* =========================================================
       01 — HERO
    ========================================================= */

    const heroEyebrow = document.querySelector(".about-hero-eyebrow");
    const heroH1 = document.querySelector(".about-hero-h1");
    const heroLede = document.querySelector(".about-hero-lede");
    const heroCta = document.querySelector(".about-hero-cta");
    const heroMetricsBar = document.querySelector(".about-hero-metrics");
    const heroMetrics = gsap.utils.toArray(".about-hero-metric");
    const heroFloatStats = gsap.utils.toArray(".hero-float-stat");
    const heroBg = document.querySelector(".about-hero-bg");

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
        .from(heroEyebrow, { y: 18, opacity: 0, duration: 0.55 })
        .from(heroH1, { y: 36, opacity: 0, filter: "blur(10px)", duration: 0.85 }, "-=0.3")
        .from(heroLede, { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(heroCta ? heroCta.children : null, { y: 22, opacity: 0, duration: 0.55, stagger: 0.1 }, "-=0.35")
        .from(heroMetricsBar, { opacity: 0, duration: 0.4 }, "-=0.2")
        .from(heroMetrics, { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from(heroFloatStats, { x: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.9");

    // subtle parallax on the hero background image as you scroll
    if (heroBg) {
        gsap.to(heroBg, {
            y: 60,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
                trigger: ".about-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // count up the hero metric numbers once the timeline has run
    heroMetrics.forEach(function (m) {
        const num = m.querySelector(".num");
        countUp(num, { start: "top 95%", duration: 1.2 });
    });

    /* =========================================================
       02 — WHO WE ARE
    ========================================================= */

    const whoAccentBar = document.querySelector(".who-accent-bar");
    const whoEyebrow = document.querySelector(".who-eyebrow");
    const whoH2 = document.querySelector(".who-h2");
    const whoPs = gsap.utils.toArray(".who-p");
    const whoMetricCards = gsap.utils.toArray(".who-metric-card");
    const whoBtn = document.querySelector(".who-content > .btn");
    const whoImgFrame = document.querySelector(".who-img-frame");

    fadeFrom(whoAccentBar, { scaleX: 0, opacity: 0, transformOrigin: "left center", duration: 0.5 });
    fadeFrom(whoEyebrow, { y: 16, opacity: 0 }, { start: "top 88%" });
    fadeFrom(whoH2, { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.75 }, { start: "top 85%" });
    if (whoPs.length) {
        gsap.from(whoPs, {
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: whoPs[0], start: "top 85%", toggleActions: "play none none reverse" }
        });
    }
    revealUp(whoMetricCards, { y: 30, stagger: 0.08, start: "top 90%" });
    fadeFrom(whoBtn, { y: 16, opacity: 0, duration: 0.5 }, { start: "top 92%" });
    fadeFrom(whoImgFrame, { x: 60, opacity: 0, scale: 0.95, filter: "blur(8px)", duration: 0.8 }, { start: "top 80%" });

    whoMetricCards.forEach(function (card) {
        const num = card.querySelector(".num");
        countUp(num, { start: "top 92%" });
    });

    /* =========================================================
       03 — PHILOSOPHY (DARK)
    ========================================================= */

    const philEyebrow = document.querySelector(".philosophy-eyebrow");
    const philH2 = document.querySelector(".philosophy-h2");
    const philLede = document.querySelector(".philosophy-lede");
    const philSub = document.querySelector(".philosophy-sub");
    const processCards = gsap.utils.toArray(".process-card");
    const philStrip = document.querySelector(".philosophy-strip");

    fadeFrom(philEyebrow, { y: 16, opacity: 0 }, { start: "top 85%" });
    fadeFrom(philH2, { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.75 }, { start: "top 82%" });
    fadeFrom(philLede, { y: 20, opacity: 0, duration: 0.6 }, { start: "top 82%" });
    fadeFrom(philSub, { y: 20, opacity: 0, duration: 0.6 }, { start: "top 80%" });
    revealUp(processCards, { y: 45, stagger: 0.1, start: "top 88%" });
    fadeFrom(philStrip, { opacity: 0, y: 14, duration: 0.6 }, { start: "top 95%" });

    /* =========================================================
       04 — WHAT MAKES US DIFFERENT
    ========================================================= */

    const diffAccentBar = document.querySelector(".diff-accent-bar");
    const diffEyebrow = document.querySelector(".diff-eyebrow");
    const diffH2 = document.querySelector(".diff-h2");
    const diffP = document.querySelector(".diff-p");
    const diffCards = gsap.utils.toArray(".diff-card");

    fadeFrom(diffAccentBar, { scaleX: 0, opacity: 0, transformOrigin: "left center", duration: 0.5 });
    fadeFrom(diffEyebrow, { y: 16, opacity: 0 }, { start: "top 85%" });
    fadeFrom(diffH2, { y: 40, opacity: 0, filter: "blur(10px)", duration: 0.85 }, { start: "top 82%" });
    fadeFrom(diffP, { y: 20, opacity: 0, duration: 0.6 }, { start: "top 82%" });

    gsap.set(diffCards, { x: 50, opacity: 0 });
    ScrollTrigger.batch(diffCards, {
        start: "top 90%",
        once: false,
        onEnter: function (batch) {
            gsap.to(batch, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true });
        },
        onLeaveBack: function (batch) {
            gsap.to(batch, { x: 50, opacity: 0, duration: 0.3, overwrite: true });
        }
    });

    /* =========================================================
       05 — DATA / BUDGET BANNER
    ========================================================= */

    const dataEyebrow = document.querySelector(".data-eyebrow");
    const dataH2 = document.querySelector(".data-h2");
    const dataLede = document.querySelector(".data-lede");
    const dataPills = gsap.utils.toArray(".data-pill");
    const dataSubRow = document.querySelector(".data-sub-row");
    const dataStatBox = document.querySelector(".data-stat-box");
    const dataBars = gsap.utils.toArray(".data-bars i");
    const dataStatVals = gsap.utils.toArray(".data-stat-item .val");
    const dataBadge = document.querySelector(".data-badge");

    fadeFrom(dataEyebrow, { y: 16, opacity: 0 }, { start: "top 85%" });
    fadeFrom(dataH2, { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.75 }, { start: "top 82%" });
    fadeFrom(dataLede, { y: 20, opacity: 0, duration: 0.6 }, { start: "top 82%" });
    revealUp(dataPills, { y: 16, blur: "blur(2px)", stagger: 0.06, start: "top 90%" });
    fadeFrom(dataSubRow, { opacity: 0, duration: 0.5 }, { start: "top 92%" });

    fadeFrom(dataStatBox, { y: 40, opacity: 0, scale: 0.96, filter: "blur(8px)", duration: 0.75 }, { start: "top 82%" });

    if (dataBars.length) {
        gsap.set(dataBars, { scaleY: 0, transformOrigin: "bottom" });
        ScrollTrigger.create({
            trigger: dataBars[0],
            start: "top 88%",
            once: true,
            onEnter: function () {
                gsap.to(dataBars, { scaleY: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" });
            }
        });
    }

    dataStatVals.forEach(function (v) { countUp(v, { start: "top 88%" }); });
    fadeFrom(dataBadge, { y: 12, opacity: 0, duration: 0.5 }, { start: "top 90%" });

    /* =========================================================
       06 — FLEXIBLE APPROACH
    ========================================================= */

    const approachImgFrame = document.querySelector(".approach-img-frame");
    const approachEyebrow = document.querySelector(".approach-eyebrow");
    const approachH2 = document.querySelector(".approach-h2");
    const approachPs = gsap.utils.toArray(".approach-p");
    const approachBadgeCards = gsap.utils.toArray(".approach-badge-card");
    const approachNote = document.querySelector(".approach-note");

    fadeFrom(approachImgFrame, { x: -60, opacity: 0, scale: 0.95, filter: "blur(8px)", duration: 0.8 }, { start: "top 80%" });
    fadeFrom(approachEyebrow, { y: 16, opacity: 0 }, { start: "top 85%" });
    fadeFrom(approachH2, { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.75 }, { start: "top 82%" });
    if (approachPs.length) {
        gsap.from(approachPs, {
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: approachPs[0], start: "top 85%", toggleActions: "play none none reverse" }
        });
    }
    revealUp(approachBadgeCards, { y: 24, stagger: 0.08, start: "top 90%" });
    fadeFrom(approachNote, { opacity: 0, x: -12, duration: 0.5 }, { start: "top 92%" });

    /* =========================================================
       07 — EDITORIAL STATEMENT
    ========================================================= */

    const statementBar = document.querySelector(".statement-bar");
    const statementQuote = document.querySelector(".statement-quote");

    fadeFrom(statementBar, { scaleX: 0, opacity: 0, duration: 0.5 }, { start: "top 88%" });
    fadeFrom(statementQuote, { y: 26, opacity: 0, filter: "blur(8px)", duration: 0.8 }, { start: "top 85%" });

    /* =========================================================
       08 — FINAL CTA BANNER
    ========================================================= */

    const ctaEyebrow = document.querySelector(".about-cta-eyebrow");
    const ctaHeading = document.querySelector(".about-cta-heading");
    const ctaSub = document.querySelector(".about-cta-sub");
    const ctaBtn = document.querySelector(".about-cta-inner > .btn");

    const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-cta-card", start: "top 82%", toggleActions: "play none none reverse" },
        defaults: { ease: "power3.out" }
    });
    ctaTl
        .from(ctaEyebrow, { y: 16, opacity: 0, duration: 0.5 })
        .from(ctaHeading, { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.75 }, "-=0.3")
        .from(ctaSub, { y: 18, opacity: 0, duration: 0.55 }, "-=0.4")
        .from(ctaBtn, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3");

    /* =========================================================
       09 — FOOTER
    ========================================================= */

    const footerCols = gsap.utils.toArray(".f-grid > div");
    revealUp(footerCols, { y: 28, stagger: 0.08, start: "top 92%" });

    const footerGhost = document.querySelector(".f-ghost");
    if (footerGhost) {
        gsap.from(footerGhost, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: footerGhost, start: "top 98%", toggleActions: "play none none reverse" }
        });
    }

    /* =========================================================
       REFRESH
    ========================================================= */

    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });
});