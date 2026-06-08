(function() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    const menuBtn = document.getElementById("siteMenuBtn");
    const mobileMenu = document.getElementById("siteMobileMenu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function() {
            mobileMenu.classList.toggle("is-open");
            const open = mobileMenu.classList.contains("is-open");
            menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    window.toggleSitePanel = function(id) {
        const panel = document.getElementById(id);
        if (!panel) {
            return;
        }
        const open = panel.classList.toggle("is-open");
        const btn = panel.previousElementSibling;
        if (btn) {
            const chevron = btn.querySelector("[data-chevron]");
            if (chevron) {
                chevron.classList.toggle("is-open", open);
            }
        }
    };

    const previewCards = document.querySelectorAll("[data-preview-card]");
    if (previewCards.length) {
        const defaultCard = document.querySelector("[data-preview-card].is-active") || previewCards[0];

        previewCards.forEach(function(card) {
            card.addEventListener("mouseenter", function() {
                previewCards.forEach(function(c) {
                    c.classList.remove("is-active");
                });
                card.classList.add("is-active");
            });
        });

        const previewRoot = document.getElementById("heroPublications");
        if (previewRoot) {
            previewRoot.addEventListener("mouseleave", function() {
                previewCards.forEach(function(c) {
                    c.classList.remove("is-active");
                });
                if (defaultCard) {
                    defaultCard.classList.add("is-active");
                }
            });
        }
    }

    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        reveals.forEach(function(el) {
            el.classList.add("active");
        });
    }
})();
