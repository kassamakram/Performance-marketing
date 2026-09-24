
document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP or ScrollTrigger is missing.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* =========================================================
       HELPERS
    ========================================================= */

    function splitIntoWords(element) {
        if (!element) return [];

        const words = element.innerText.trim().split(/\s+/);

        element.innerHTML = words
            .map(function (word) {
                return '<span class="word">' + word + "</span>";
            })
            .join(" ");

        return element.querySelectorAll(".word");
    }

    function revealFromLeft(elements, options) {
        options = options || {};

        if (!elements || !elements.length) return;

        const xValue = options.x !== undefined ? options.x : -100;
        const scaleValue = options.scale !== undefined ? options.scale : 0.96;
        const blurValue = options.blur || "blur(8px)";
        const durationValue = options.duration || 0.65;
        const staggerValue = options.stagger || 0.08;
        const startValue = options.start || "top 85%";

        gsap.set(elements, {
            x: xValue,
            opacity: 0,
            scale: scaleValue,
            filter: blurValue
        });

        ScrollTrigger.batch(elements, {
            start: startValue,
            once: false,

            onEnter: function (batch) {
                gsap.to(batch, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: durationValue,
                    ease: "power3.out",
                    stagger: staggerValue,
                    overwrite: true
                });
            },

            onLeaveBack: function (batch) {
                gsap.to(batch, {
                    x: xValue,
                    opacity: 0,
                    scale: scaleValue,
                    filter: blurValue,
                    duration: 0.3,
                    ease: "power2.in",
                    stagger: 0.04,
                    overwrite: true
                });
            }
        });
    }


    /* =========================================================
       INTRO
       Word-by-word light gray → black
    ========================================================= */

    const intro = document.querySelector(".intro");

    if (intro) {
        const introEyebrow = intro.querySelector(".eyebrow");
        const introParagraphs = intro.querySelectorAll("p");
        const introWords = [];

        introParagraphs.forEach(function (paragraph) {
            if (!paragraph.classList.contains("bold")) {
                const words = splitIntoWords(paragraph);
                introWords.push.apply(introWords, Array.from(words));
            }
        });

        if (introWords.length) {
            gsap.set(introWords, {
                color: "#b8b8b8"
            });

            const introTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: intro,
                    start: "top 80%",
                    end: "bottom 40%",
                    scrub: 0.5
                }
            });

            introTimeline.to(introWords, {
                color: "#0B0B0B",
                stagger: 0.025,
                ease: "power1.out"
            });
        }

        if (introEyebrow) {
            gsap.from(introEyebrow, {
                opacity: 0,
                y: 20,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: intro,
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        const boldIntro = intro.querySelector(".bold");

        if (boldIntro) {
            gsap.from(boldIntro, {
                y: 35,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: boldIntro,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }


    /* =========================================================
       OPPORTUNITY
    ========================================================= */

    const opportunity = document.querySelector(".opportunity");

    if (opportunity) {
        const title = opportunity.querySelector(".opp-title");
        const copy = opportunity.querySelector(".opp-copy");

        if (title) {
            gsap.from(title, {
                x: -90,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (copy) {
            gsap.from(copy, {
                x: 90,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.75,
                delay: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: copy,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }



        const process = document.querySelector(".process");

        if (process && processSteps.length) {
            const processTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: process,
                    start: "top 82%",
                    end: "bottom 55%",
                    scrub: 0.5
                }
            });

            processSteps.forEach(function (step, index) {
                processTimeline.to(
                    step,
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.4,
                        ease: "power3.out"
                    },
                    index * 0.42
                );

                if (processArrows[index]) {
                    processTimeline.to(
                        processArrows[index],
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.2,
                            ease: "power2.out"
                        },
                        index * 0.42 + 0.18
                    );
                }
            });
        }
    }


    /* =========================================================
       APPROACH
    ========================================================= */

    const approach = document.querySelector(".approach");

    if (approach) {
        const approachTitle = approach.querySelector(".approach-title");
        const approachCopy = approach.querySelector(".approach-copy");
        const approachCards = gsap.utils.toArray(".approach-card");

        if (approachTitle) {
            gsap.from(approachTitle, {
                y: 70,
                opacity: 0,
                scale: 0.95,
                filter: "blur(12px)",
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: approachTitle,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (approachCopy) {
            gsap.from(approachCopy, {
                y: 40,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.65,
                delay: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: approachCopy,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        revealFromLeft(approachCards, {
            x: -130,
            duration: 0.65,
            stagger: 0.1,
            start: "top 88%"
        });
    }


    /* =========================================================
       MEASUREMENT
    ========================================================= */

    const measure = document.querySelector(".measure");

    if (measure) {
        const measureTitle = measure.querySelector(".measure-title");
        const measureCopy = measure.querySelector(".measure-copy");
        const metricItems = gsap.utils.toArray(".metric-item");
        const measureImage = measure.querySelector(".measure-image");

        if (measureTitle) {
            gsap.from(measureTitle, {
                x: -80,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: measureTitle,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (measureCopy) {
            gsap.from(measureCopy, {
                y: 35,
                opacity: 0,
                filter: "blur(7px)",
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: measureCopy,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (metricItems.length) {
            gsap.set(metricItems, {
                y: 45,
                opacity: 0,
                filter: "blur(7px)"
            });

            ScrollTrigger.batch(metricItems, {
                start: "top 90%",
                once: false,

                onEnter: function (batch) {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 0.5,
                        stagger: 0.06,
                        ease: "power3.out",
                        overwrite: true
                    });
                },

                onLeaveBack: function (batch) {
                    gsap.to(batch, {
                        y: 45,
                        opacity: 0,
                        filter: "blur(7px)",
                        duration: 0.25,
                        overwrite: true
                    });
                }
            });
        }

        if (measureImage) {
            gsap.from(measureImage, {
                x: 100,
                opacity: 0,
                scale: 0.94,
                filter: "blur(10px)",
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: measureImage,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }


    /* =========================================================
       CHANNEL SYNERGY
    ========================================================= */

    const synergy = document.querySelector(".synergy");

    if (synergy) {
        const title = synergy.querySelector(".synergy-title");
        const copy = synergy.querySelector(".synergy-copy");

        if (title) {
            gsap.from(title, {
                y: 80,
                opacity: 0,
                scale: 0.95,
                filter: "blur(12px)",
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (copy) {
            gsap.from(copy, {
                x: 80,
                opacity: 0,
                filter: "blur(9px)",
                duration: 0.75,
                delay: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: copy,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }


    /* =========================================================
       CONTINUOUS OPTIMIZATION
    ========================================================= */

    const optimize = document.querySelector(".optimize");

    if (optimize) {
        const title = optimize.querySelector(".optimize-title");
        const copy = optimize.querySelector(".optimize-copy");
        const cards = gsap.utils.toArray(".optimize-card");
        const note = optimize.querySelector(".optimize-note");

        if (title) {
            gsap.from(title, {
                y: 70,
                opacity: 0,
                filter: "blur(12px)",
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (copy) {
            gsap.from(copy, {
                y: 45,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.7,
                delay: 0.05,
                scrollTrigger: {
                    trigger: copy,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (cards.length) {
            gsap.set(cards, {
                x: -100,
                opacity: 0,
                scale: 0.94,
                rotate: -2,
                filter: "blur(9px)"
            });

            ScrollTrigger.batch(cards, {
                start: "top 88%",
                once: false,

                onEnter: function (batch) {
                    gsap.to(batch, {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        filter: "blur(0px)",
                        duration: 0.65,
                        stagger: 0.1,
                        ease: "power3.out",
                        overwrite: true
                    });
                },

                onLeaveBack: function (batch) {
                    gsap.to(batch, {
                        x: -100,
                        opacity: 0,
                        scale: 0.94,
                        rotate: -2,
                        filter: "blur(9px)",
                        duration: 0.3,
                        overwrite: true
                    });
                }
            });
        }

        if (note) {
            gsap.from(note, {
                y: 30,
                opacity: 0,
                duration: 0.55,
                scrollTrigger: {
                    trigger: note,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }


    /* =========================================================
       PHILOSOPHY
    ========================================================= */

    const philosophy = document.querySelector(".philosophy");

    if (philosophy) {
        const title = philosophy.querySelector(".phi-title");
        const heading4 = philosophy.querySelectorAll("h4");
        const copy = philosophy.querySelector(".phi-copy");
        const image = philosophy.querySelector(".phi-image");

        if (title) {
            gsap.from(title, {
                x: -80,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (heading4.length) {
            gsap.from(heading4, {
                y: 30,
                opacity: 0,
                filter: "blur(7px)",
                duration: 0.55,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 78%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (copy) {
            gsap.from(copy, {
                y: 40,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.65,
                scrollTrigger: {
                    trigger: copy,
                    start: "top 88%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (image) {
            gsap.from(image, {
                x: 100,
                opacity: 0,
                scale: 0.94,
                filter: "blur(10px)",
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: image,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }


    /* =========================================================
       CTA
    ========================================================= */

    const cta = document.querySelector(".cta-banner");

    if (cta) {
        const eyebrow = cta.querySelector(".eyebrow");
        const title = cta.querySelector(".cta-title");
        const copy = cta.querySelector(".cta-copy");
        const buttons = cta.querySelector(".cta-buttons");
        const miniItems = gsap.utils.toArray(".cta-mini-item");

        const ctaTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: cta,
                start: "top 78%",
                toggleActions: "play none none reverse"
            }
        });

        if (eyebrow) {
            ctaTimeline.from(eyebrow, {
                y: 25,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }

        if (title) {
            ctaTimeline.from(
                title,
                {
                    y: 70,
                    opacity: 0,
                    scale: 0.94,
                    filter: "blur(12px)",
                    duration: 0.7,
                    ease: "power3.out"
                },
                "-=0.15"
            );
        }

        if (copy) {
            ctaTimeline.from(
                copy,
                {
                    y: 40,
                    opacity: 0,
                    filter: "blur(8px)",
                    duration: 0.65,
                    ease: "power2.out"
                },
                "-=0.35"
            );
        }

        if (buttons) {
            ctaTimeline.from(
                buttons,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.25"
            );
        }

        if (miniItems.length) {
            ctaTimeline.from(
                miniItems,
                {
                    y: 25,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "power2.out"
                },
                "-=0.15"
            );
        }
    }


    /* =========================================================
       REFRESH SCROLLTRIGGER
    ========================================================= */

    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });
});

