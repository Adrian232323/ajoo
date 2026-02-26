


export function initDetails() {
    const btn = document.querySelector('.btn-show-more');
    const cardsTexts = document.querySelectorAll('.community-card-text');
    
    if (!btn) return;

    const btnText = btn.querySelector('.btn-show-more__text');

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Rozwijanie kart
        cardsTexts.forEach(card => {
            card.classList.toggle('active');
        });

        // 2. Obrót strzałki (klasa .rotate w SCSS obraca ikonę o 180st)
        btn.classList.toggle('rotate');

        // 3. Logika tekstu
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        btnText.textContent = isExpanded ? 'Pokaż więcej' : 'Pokaż mniej';
    });
}


