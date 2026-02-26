
export function initContactForm() {
    const form = document.getElementById('proContactForm');
    const textarea = document.getElementById('userMessage');
    const charCounter = document.getElementById('charCounter');

    if (!form) return;

    // --- LICZNIK ZNAKÓW ---
    textarea.addEventListener('input', () => {
        const remaining = textarea.value.length;
        charCounter.innerText = `${remaining} / 150`;
        charCounter.style.color = remaining >= 140 ? "red" : "#666";
    });

    // --- OBSŁUGA WYSYŁKI ---
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const policy = document.getElementById('privacyPolicy').checked;
        const honeypot = document.getElementById('website_url').value;
        const userMessage = textarea.value.trim();

        // 1. Honeypot (Bot Trap)
        if (honeypot.length > 0) {
            showMessage("Dziękujemy za kontakt!", "success");
            form.reset();
            return;
        }

        // 2. Podstawowa walidacja (Imię i Polityka)
        if (!name || !policy) {
            showMessage("Imię i akceptacja polityki są wymagane.", "error");
            return;
        }

        // 3. Walidacja: Mail LUB Telefon
        if (!email && !phone) {
            showMessage("Musisz podać e-mail lub numer telefonu.", "error");
            return;
        }

        // 4. Walidacja maila (znak @ i kropka)
        if (email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessage("Wpisz poprawny adres e-mail.", "error");
                return;
            }
        }

        // 5. Walidacja długości wiadomości
        if (userMessage.length > 150) {
            showMessage("Wiadomość jest za długa (maks. 150 znaków).", "error");
            return;
        }

        // 6. WYSYŁKA AJAX (Fetch)
        const formData = new FormData(form);

        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success") {
                showMessage("Dziękujemy za wysłanie danych kontaktowych!", "success");
                form.reset();
                charCounter.innerText = "0 / 150";
            } else {
                showMessage("Błąd: " + data.message, "error");
            }
        })
        .catch(() => {
            showMessage("Wystąpił błąd połączenia z serwerem.", "error");
        });
    });

    function showMessage(text, type) {
        const msg = document.getElementById('formMessage');
        msg.innerText = text;
        msg.className = "form-message " + type;
        msg.style.display = "block";
    }
}