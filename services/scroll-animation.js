document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP or ScrollTrigger is missing.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* =========================================================
       HELPERS
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

    /* =========================================================
       1. HERO
    ========================================================= */

    const heroHeading = document.querySelector(".hero-heading");
    const heroBtnCont = document.querySelector(".hero-section .btn-cont");

    fadeFrom(heroHeading, { y: 50, opacity: 0, filter: "blur(10px)", duration: 0.9, scrollTrigger: { trigger: ".hero-section", start: "top top", toggleActions: "play none none none" } });
    if (heroBtnCont) {
        gsap.from(heroBtnCont, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            delay: 0.25,
            ease: "power2.out"
        });
    }

    /* =========================================================
       2. LOGOS BAR
    ========================================================= */

    const logoItems = gsap.utils.toArray(".logo-item");
    revealUp(logoItems, { y: 20, blur: "blur(3px)", stagger: 0.06, start: "top 92%" });

    /* =========================================================
       3. INTRO STATEMENT
    ========================================================= */

    const eyebrow = document.querySelector(".intro-section .eyebrow");
    const introText = document.querySelector(".intro-text");

    fadeFrom(eyebrow, { y: 20, opacity: 0 });
    fadeFrom(introText, { y: 35, opacity: 0, filter: "blur(8px)", duration: 0.8 }, { start: "top 82%" });

    /* =========================================================
       4. VALUE PROPOSITION
    ========================================================= */

    const valueTag = document.querySelector(".value-copy .section-tag");
    const valueHeading = document.querySelector(".value-heading");
    const valueDesc = document.querySelector(".value-desc");
    const featureCards = gsap.utils.toArray(".feature-card");

    fadeFrom(valueTag, { y: 15, opacity: 0 });
    fadeFrom(valueHeading, { x: -60, opacity: 0, filter: "blur(8px)", duration: 0.75 }, { start: "top 82%" });
    fadeFrom(valueDesc, { y: 25, opacity: 0, duration: 0.6 }, { start: "top 85%" });
    revealUp(featureCards, { y: 45, stagger: 0.09, start: "top 90%" });

    /* =========================================================
       5. SERVICES GRID
    ========================================================= */

    const servicesHeading = document.querySelector(".section-heading");
    const servicesTitle = document.querySelector(".services-title");
    const serviceCards = gsap.utils.toArray(".service-card");

    fadeFrom(servicesHeading, { y: 20, opacity: 0 });
    fadeFrom(servicesTitle, { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.7 }, { start: "top 82%" });
    revealUp(serviceCards, { y: 55, stagger: 0.1, start: "top 90%" });

    /* =========================================================
       6. ACTION STATS BANNER
    ========================================================= */

    const statsTitle = document.querySelector(".stats-main-title");
    const statBoxes = gsap.utils.toArray(".stat-box");

    fadeFrom(statsTitle, { x: -60, opacity: 0, filter: "blur(9px)", duration: 0.75 }, { start: "top 82%" });
    revealUp(statBoxes, { y: 35, stagger: 0.08, start: "top 88%" });

    /* =========================================================
       7. SOCIAL ADS LIST
    ========================================================= */

    const socialCopyBlock = document.querySelector(".social-layout > div:first-child");
    const socialItems = gsap.utils.toArray(".social-item");

    if (socialCopyBlock) {
        gsap.from(socialCopyBlock.children, {
            x: -50,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: socialCopyBlock,
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        });
    }

    gsap.set(socialItems, { x: 60, opacity: 0 });
    ScrollTrigger.batch(socialItems, {
        start: "top 90%",
        once: false,
        onEnter: function (batch) {
            gsap.to(batch, { x: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", overwrite: true });
        },
        onLeaveBack: function (batch) {
            gsap.to(batch, { x: 60, opacity: 0, duration: 0.3, overwrite: true });
        }
    });

    /* =========================================================
       8. CONNECTED BANNER
    ========================================================= */

    const connectedContent = document.querySelector(".connected-content");
    if (connectedContent) {
        gsap.from(connectedContent.children, {
            y: 35,
            opacity: 0,
            filter: "blur(7px)",
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: connectedContent,
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        });
    }

    /* =========================================================
       9. GROWTH ENGINE SPLIT
    ========================================================= */

    const growthCopy = document.querySelector(".growth-layout > div:first-child");
    const growthImg = document.querySelector(".growth-img-container");

    if (growthCopy) {
        gsap.from(growthCopy.children, {
            x: -60,
            opacity: 0,
            filter: "blur(7px)",
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: growthCopy,
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        });
    }

    fadeFrom(growthImg, { x: 90, opacity: 0, scale: 0.94, filter: "blur(9px)", duration: 0.8 }, { start: "top 80%" });

    /* =========================================================
       10. CALL TO ACTION CARD
    ========================================================= */

    const ctaCard = document.querySelector(".cta-card");
    if (ctaCard) {
        gsap.from(ctaCard.children, {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ctaCard,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    }

    /* =========================================================
       REFRESH
    ========================================================= */

    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });
});