export function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length === 0) return;

    // Funkcja pomocnicza do zmiany stanu pojedynczego elementu
    const toggleItem = (header, forceClose = false) => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.icon');
        
        // Sprawdzamy czy element faktycznie ma być zamknięty (forceClose) 
        // czy przełączamy stan (toggle)
        const shouldActive = forceClose ? false : !header.classList.contains('active');

        header.classList.toggle('active', shouldActive);
        header.setAttribute('aria-expanded', shouldActive.toString());
        
        if (content) {
            content.classList.toggle('show', shouldActive);
        }

        // Bezpieczna zmiana ikony (tylko jeśli istnieje)
        if (icon) {
            icon.textContent = shouldActive ? '▼' : '▶';
        }
    };

    function closeAllExcept(currentHeader) {
        accordionHeaders.forEach(header => {
            if (header !== currentHeader) {
                toggleItem(header, true); // Wymuszamy zamknięcie
            }
        });
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isClosing = header.classList.contains('active');

            if (!isClosing) {
                // Najpierw zamknij inne
                closeAllExcept(header);
            }

            // Przełącz stan klikniętego elementu
            toggleItem(header);
        });
    });
}