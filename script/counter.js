export function initCounter() {
    // 1. Definiujemy zmienne na podstawie Twojego HTML
    const counterSection = document.querySelector('.counter-section'); 
    const counters = document.querySelectorAll('.counter-value');
    let hasAnimated = false;

    // Bezpiecznik: jeśli nie ma sekcji na stronie, nie rób nic
    if (!counterSection || counters.length === 0) return;

    // TWOJA FUNKCJA (Logika obliczeń)
    function animateCounter(counterElement, targetValue, prefix = '', suffix = '') {
        const target = parseInt(targetValue);
        if (isNaN(target)) return;
        
        const duration = 2000;
        const startValue = 0;
        let startTime;
        
        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.round(startValue + target * progress);
            
            // Formatowanie wyświetlania
            counterElement.textContent = prefix + currentValue.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counterElement.textContent = prefix + target.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(step);
    }

    // TWOJA FUNKCJA (Uruchomienie wszystkich liczników)
    function startCounters() {
        counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            animateCounter(counter, target, prefix, suffix);
        });
    }

    // TWOJA FAZA 2: OBSERVER (Wyzwalanie)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jeśli sekcja wejdzie w 30% widoczności i jeszcze nie animowaliśmy
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                startCounters();
                observer.unobserve(entry.target); // Przestań obserwować po odpaleniu
            }
        });
    }, {
        root: null,
        rootMargin: '0px', // Zmienione na 0px dla pewności testu
        threshold: 0.3
    });

    observer.observe(counterSection); 
}