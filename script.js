
document.addEventListener("DOMContentLoaded", () => {

    // 1. Elemente beim Scrollen einblenden
    const elements = document.querySelectorAll(
        "section h2, .card, .responsive-img"
    );

    elements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(element => observer.observe(element));


    // 2. 3D-Effekt für die Karten
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -10;
            const rotateY = ((x / rect.width) - 0.5) * 10;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg)";
        });
    });


    // 3. Parallax-Effekt im Header
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (header && window.scrollY < window.innerHeight) {
            header.style.backgroundPositionY =
                `${window.scrollY * 0.4}px`;
        }
    }, { passive: true });


    // 4. Grünes Leuchten unter der Maus
    const glow = document.createElement("div");
    glow.className = "mouse-glow";
    document.body.appendChild(glow);

    document.addEventListener("mousemove", event => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
    });


    // 5. Schwebender Nach-oben-Button
    const topButton = document.createElement("button");
    topButton.innerHTML = "↑";
    topButton.className = "back-to-top";
    topButton.setAttribute("aria-label", "Nach oben");
    topButton.type = "button";
    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        topButton.classList.toggle("show", window.scrollY > 300);
    }, { passive: true });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 6. Smooth Scrolling für die Navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

});
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Gespeicherten Modus laden
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Lightmode aktivieren");
}

// Zwischen Darkmode und Lightmode wechseln
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Lightmode aktivieren");
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Darkmode aktivieren");
        localStorage.setItem("theme", "light");
    }
});
const chimpImage = document.getElementById("chimp-image");

let clickCount = 0;

chimpImage.addEventListener("click", function () {

    clickCount++;

    if (clickCount === 8) {

        // Explosion starten
        for (let i = 0; i < 100; i++) {

            const monkey = document.createElement("span");

            monkey.classList.add("monkey");
            monkey.textContent = "🐒";

            // Position des Bildes ermitteln
            const rect = chimpImage.getBoundingClientRect();

            monkey.style.left = rect.left + rect.width / 2 + "px";
            monkey.style.top = rect.top + rect.height / 2 + "px";

            // Zufällige Flugrichtung
            const x = (Math.random() - 0.5) * 500;
            const y = (Math.random() - 0.5) * 500;

            monkey.style.setProperty("--dx", x + "px");
            monkey.style.setProperty("--dy", y + "px");

            document.body.appendChild(monkey);

            // Emoji wieder entfernen
            monkey.addEventListener("animationend", function () {
                monkey.remove();
            });
        }

        // Zähler zurücksetzen
        clickCount = 0;
    }
});




const skeletonImage = document.getElementById("skeleton-image");

let skeletonClickCount = 0;

skeletonImage.addEventListener("click", function () {
    skeletonClickCount++;

    if (skeletonClickCount !== 8) return;

    skeletonClickCount = 0;

    const rect = skeletonImage.getBoundingClientRect();
    const dots = [];

    // Jeder Buchstabe ist ein eigenes 5x7-Raster
    const alphabet = {
        L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
        O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
        R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
        I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
        K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"]
    };

    const word = ["L", "O", "R", "I", "K"];

    const spacing = 7;
const letterGap = 5;
const dotSize = 3;

    const totalWidth = 5 * 5 * spacing + 4 * letterGap * spacing;
    const startX = (window.innerWidth - totalWidth) / 2;
    const startY = window.innerHeight / 2 - 10;

    // Alle Zielpositionen vorbereiten
    const positions = [];

    let offset = 0;

    word.forEach(letter => {
        alphabet[letter].forEach((line, row) => {
            line.split("").forEach((pixel, col) => {
                if (pixel === "#") {
                    positions.push({
                        x: startX + offset + col * spacing,
                        y: startY + row * spacing
                    });
                }
            });
        });

        offset += (5 + letterGap) * spacing;
    });

    // 100 Punkte erzeugen
    for (let i = 0; i < 100; i++) {
        const dot = document.createElement("div");

        dot.style.position = "fixed";
        dot.style.width = dotSize + "px";
        dot.style.height = dotSize + "px";
        dot.style.borderRadius = "50%";
        dot.style.background = "#000";
        dot.style.zIndex = "99999";
        dot.style.pointerEvents = "none";
        dot.style.left = rect.left + rect.width / 2 + "px";
        dot.style.top = rect.top + rect.height / 2 + "px";
        dot.style.transition =
            "left 1.5s ease, top 1.5s ease, opacity 1s ease";

        document.body.appendChild(dot);
        dots.push(dot);
    }

    // Explosion
    dots.forEach(dot => {
        dot.style.left =
            rect.left + rect.width / 2 +
            (Math.random() - 0.5) * 500 + "px";

        dot.style.top =
            rect.top + rect.height / 2 +
            (Math.random() - 0.5) * 400 + "px";
    });

    // Punkte formen den Namen LORIK
    setTimeout(() => {
        positions.forEach((pos, i) => {
            if (dots[i]) {
                dots[i].style.left = pos.x + "px";
                dots[i].style.top = pos.y + "px";
            }
        });

        // Überschüssige Punkte entfernen
        dots.slice(positions.length).forEach(dot => {
            dot.style.opacity = "0";
        });

        // Nach 3 Sekunden verschwinden
        setTimeout(() => {
            dots.forEach(dot => {
                dot.style.opacity = "0";
                setTimeout(() => dot.remove(), 1000);
            });
        }, 3000);

    }, 1500);
});
