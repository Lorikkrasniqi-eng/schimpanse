
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