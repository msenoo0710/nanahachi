window.addEventListener("load", () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (window.scrollY === 0) {
        // ✅ アニメーション再生（最上部のみ）
        const introTL = gsap.timeline();

        gsap.set(".intro", {
            opacity: 0
        });

        introTL.to(".intro", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        introTL.to(".intro", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            delay: 0.5
        });

        introTL.set(".intro", { display: "none" });

        introTL.add(() => {
            const tl = gsap.timeline();

            // ✅ 修正：ズームを削除してフェードインのみ
            gsap.set(".mainvisual__center", {
                opacity: 0
            });

            tl.to(".mainvisual__center", {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            });

            gsap.set(".mainvisual__left", {
                x: -100,
                opacity: 0
            });

            tl.to(".mainvisual__left", {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power1.out"
            }, "-=0.4");

            gsap.set(".mainvisual__right", {
                x: 100,
                opacity: 0
            });

            tl.to(".mainvisual__right", {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power1.out"
            }, "<");
        });

    } else {
        // ✅ アニメーション再生しない場合 → mainvisual を即時表示に
        gsap.set(".mainvisual__center", {
            opacity: 1
        });

        gsap.set(".mainvisual__left", {
            x: 0,
            opacity: 1
        });

        gsap.set(".mainvisual__right", {
            x: 0,
            opacity: 1
        });

        // intro自体は不要なので非表示に（あれば）
        gsap.set(".intro", { display: "none" });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const duration = 0.8; // フェード速度（秒）
    const delay = 3.0;    // 切り替え間隔（秒）

    document.querySelectorAll(".js-slider").forEach((slider) => {
        const slides = slider.querySelectorAll("div");
        if (slides.length === 0) return;

        // 最初のスライドだけ表示
        gsap.set(slides, { opacity: 0, zIndex: 0 });
        gsap.set(slides[0], { opacity: 1, zIndex: 1 });

        let current = 0;
        const total = slides.length;

        const fadeNextSlide = () => {
            const next = (current + 1) % total;

            gsap.to(slides[current], {
                opacity: 0,
                duration: duration,
                ease: "power2.out",
                zIndex: 0
            });

            gsap.to(slides[next], {
                opacity: 1,
                duration: duration,
                ease: "power2.out",
                zIndex: 1
            });

            current = next;
        };

        // インターバルごとにスライド切り替え
        setInterval(fadeNextSlide, delay * 1000);
    });
});
