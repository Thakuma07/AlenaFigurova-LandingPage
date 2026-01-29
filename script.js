gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.85, 0, 0.15, 1");

const counterProgress = document.querySelector(".counter h1");
const counter = { value: 0 };

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MANUAL SPLITTEXT (WORDS)
    =============================== */
    const heading = document.querySelector(".hero-header h1");
    const words = heading.textContent.trim().split(" ");

    heading.innerHTML = words
        .map(word => `<span class="word">${word}</span>`)
        .join(" ");

    /* ===============================
       TIMELINES (UNCHANGED)
    =============================== */
    const counterTl = gsap.timeline({ delay: 0.5 });
    const overlayTextTl = gsap.timeline({ delay: 0.75 });
    const revealTl = gsap.timeline({ delay: 0.5 });

    counterTl.to(counter, {
        value: 100,
        duration: 5,
        ease: "power2.out",
        onUpdate: () => {
            counterProgress.textContent = Math.floor(counter.value);
        },
    });

    overlayTextTl
        .to(".overlay-text", {
            y: "0",
            duration: 0.75,
            ease: "hop",
        })
        .to(".overlay-text", {
            y: "-2rem",
            duration: 0.75,
            ease: "hop",
            delay: 0.75,
        })
        .to(".overlay-text", {
            y: "-4rem",
            duration: 0.75,
            ease: "hop",
            delay: 0.75,
        })
        .to(".overlay-text", {
            y: "-6rem",
            duration: 0.75,
            ease: "hop",
            delay: 1,
        });

    revealTl
        .to(".img", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1,
            ease: "hop",
        })
        .to(".hero-images", {
            gap: "0.75vw",
            duration: 1,
            delay: 0.5,
            ease: "hop",
        })
        .to(".img", {
            scale: 1,
            duration: 1,
            ease: "hop",
        }, "<")
        .to(".img:not(.hero-img)", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            stagger: 0.1,
            ease: "hop",
        })
        .to(".hero-img", {
            scale: 2,
            duration: 1,
            ease: "hop",
        })
        .to(".hero-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
        })
        .to(".hero-header h1 .word", {
            y: "0",
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
        }, "-=0.5");
});
