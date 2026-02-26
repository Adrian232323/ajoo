export function initFaq() {

const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        // 2. Dodajemy nasłuchiwanie na kliknięcie do każdego pytania
        question.addEventListener('click', () => {
            // Otrzymujemy nadrzędny element 'faq-item'
            const parentItem = question.closest('.faq-item');
            // Sprawdzamy, czy kliknięty element jest już aktywny
            const isCurrentlyActive = parentItem.classList.contains('active');

            // 3. Logika Akordeonu: Zamykamy wszystkie aktywne elementy
            // Zapewnia, że tylko jedna odpowiedź jest otwarta w danym momencie
            document.querySelectorAll('.faq-item.active').forEach(item => {
                // Upewniamy się, że nie zamykamy właśnie klikniętego elementu,
                // jeśli jego celem jest pozostanie aktywnym (co jest naszym następnym krokiem)
                if (item !== parentItem) {
                    item.classList.remove('active');
                    // Opcjonalnie: Zmiana ikonki z powrotem na '+'
                    const icon = item.querySelector('.faq-toggle-icon');
                    if (icon) icon.textContent = '+';
                }
            });

            // 4. Przełączanie stanu: Jeśli nie był aktywny, otwieramy go. Jeśli był, zamykamy.
            if (!isCurrentlyActive) {
                // Otwieramy (dodajemy klasę 'active')
                parentItem.classList.add('active');
                // Zmieniamy ikonkę na '×' (lub '-')
                const icon = parentItem.querySelector('.faq-toggle-icon');
                if (icon) icon.textContent = '×'; // Używam '×' bo wygląda lepiej po transform: rotate(45deg)
            } else {
                // Zamykamy (usuwamy klasę 'active')
                parentItem.classList.remove('active');
                // Zmieniamy ikonkę z powrotem na '+'
                const icon = parentItem.querySelector('.faq-toggle-icon');
                if (icon) icon.textContent = '+';
            }
        });
    });
    }