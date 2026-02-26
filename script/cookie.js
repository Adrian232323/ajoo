export function initCookie() {

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const closeBtn = document.getElementById('close-cookies');

    // 1. Sprawdź, czy zgoda już istnieje lub baner został zamknięty
    const isCookieAccepted = localStorage.getItem('speakAmigo_cookiesAccepted');
    const isBannerClosed = sessionStorage.getItem('speakAmigo_cookieBannerClosed');

    // 2. Jeśli nie ma zgody i baner nie został zamknięty, pokaż go po krótkim opóźnieniu
    if (!isCookieAccepted && !isBannerClosed) {
        setTimeout(() => {
            banner.classList.add('cookie-banner--active');
        }, 1000);
    }

    // 3. Obsługa kliknięcia w przycisk "Akceptuję"
    acceptBtn.addEventListener('click', function () {
        // Zapisz informację w localStorage (trwałe)
        localStorage.setItem('speakAmigo_cookiesAccepted', 'true');
        
        // Ukryj baner
        banner.classList.remove('cookie-banner--active');
    });

    // 4. Obsługa kliknięcia w przycisk zamknięcia (X)
    closeBtn.addEventListener('click', function () {
        // Ukryj baner bez zapisywania zgody
        banner.classList.remove('cookie-banner--active');
        
        // Zapisz informację, że użytkownik zamknął baner (tylko w tej sesji)
        sessionStorage.setItem('speakAmigo_cookieBannerClosed', 'true');
    });
}