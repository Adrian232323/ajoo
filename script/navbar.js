export function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.getElementById("navbar-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const items = mobileMenu.querySelectorAll(".menu-logo, .menu-item, .social-link");

    let lastScrollTop = 0;
    const scrollThreshold = 80; // Pasek nie zniknie od razu na samej górze

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Nie ukrywaj navbara, jeśli menu mobilne jest otwarte
        if (toggleBtn.classList.contains("open")) return;

        // Ukrywanie/Pokazywanie przy scrollu
        if (currentScrollTop > scrollThreshold) {
            if (currentScrollTop > lastScrollTop) {
                navbar.classList.add('sticky-hidden'); // W dół - chowaj
            } else {
                navbar.classList.remove('sticky-hidden'); // W górę - pokazuj
            }
            navbar.classList.add('scrolled-bg');
        } else {
            navbar.classList.remove('sticky-hidden');
            navbar.classList.remove('scrolled-bg');
        }

        lastScrollTop = Math.max(0, currentScrollTop);
    }, { passive: true });

    // Menu Mobilne
    function toggleMenu() {
        const isOpen = toggleBtn.classList.toggle("open");
        mobileMenu.classList.toggle("menu-open");
        
        // Blokada przewijania tła
        document.body.style.overflow = isOpen ? "hidden" : "";

        if (isOpen) {
            items.forEach((item, index) => {
                setTimeout(() => item.classList.add("show"), 100 * index);
            });
        } else {
            items.forEach(item => item.classList.remove("show"));
        }
    }

    toggleBtn.addEventListener("click", toggleMenu);

    // Zamknij menu po kliknięciu w link (kotwicę)
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (toggleBtn.classList.contains("open")) toggleMenu();
        });
    });
}