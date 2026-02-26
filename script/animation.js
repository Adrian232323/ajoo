/**
 * Moduł animacji wejścia (Entrance Animations)
 * Wykorzystuje Intersection Observer do wyzwalania animacji CSS
 */
export const initAnimations = () => {
    // 1. Pobieramy wszystkie elementy "uzbrojone" w klasę .reveal
    const targets = document.querySelectorAll('.reveal');
    
    // Safety check: jeśli nie ma elementów, nie obciążamy przeglądarki
    if (targets.length === 0) return;

    // 2. Konfiguracja obserwatora
    const options = {
        // 0.1 oznacza, że 10% elementu musi być w oknie, by animacja ruszyła
        threshold: 0.1, 
        // rootMargin z ujemną wartością na dole sprawia, że elementy
        // nie "wyskakują" dokładnie na krawędzi ekranu, co wygląda lepiej
        rootMargin: '0px 0px -50px 0px'
    };

    // 3. Logika wyzwalacza
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Sprawdzamy czy element przecina się z viewportem
            if (entry.isIntersecting) {
                // Dodajemy klasę aktywującą animację CSS
                entry.target.classList.add('is-visible');
                
                // Po jednorazowym pokazaniu przestajemy obserwować element (wydajność!)
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // 4. Rejestracja wszystkich elementów w obserwatorze
    targets.forEach(target => {
        observer.observe(target);
    });
};