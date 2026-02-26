/**
 * Inicjalizuje obsługę tabów w sekcji pobierania.
 * Zarządza widocznością kategorii PDF oraz stanami aktywności przycisków.
 */
export function initDownloads() {
    const tabsContainer = document.querySelector('.tabs-bar');
    
    // Guard clause - jeśli na stronie nie ma tabów, nie wykonuj kodu
    if (!tabsContainer) return;

    const buttons = tabsContainer.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (!targetContent) {
                console.warn(`Nie znaleziono kontenera o ID: ${targetId}`);
                return;
            }

            // 1. Aktualizacja przycisków
            buttons.forEach(btn => {
                const isActive = btn === button;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive);
            });

            // 2. Aktualizacja widoczności treści (Taby)
            contents.forEach(content => {
                const isTarget = content.id === targetId;
                
                if (isTarget) {
                    content.classList.add('active');
                    content.setAttribute('aria-hidden', 'false');
                } else {
                    content.classList.remove('active');
                    content.setAttribute('aria-hidden', 'true');
                }
            });
        });
    });
}
