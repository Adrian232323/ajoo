export function initContactForm() {
    const form = document.querySelector('#cnt-form');
    const successScreen = document.querySelector('#success-message');
    const reloadBtn = successScreen?.querySelector('.btn-secondary');

    if (!form) return;

    const submitBtn = form.querySelector('#submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    const setPending = (isPending) => {
        submitBtn.disabled = isPending;
        btnText.style.opacity = isPending ? '0.5' : '1';
        btnLoader.style.display = isPending ? 'inline-block' : 'none';
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const honeyPot = form.querySelector('input[name="robot_trap"]').value;
        if (honeyPot) return;

        setPending(true);

        try {
            const formData = new FormData(form);
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Błąd serwera: ' + response.status);

            const result = await response.json();

            if (result.status === 'success') {
                form.style.display = 'none';
                successScreen.style.display = 'block';
                form.reset();
            } else {
                throw new Error(result.message || 'Wystąpił błąd.');
            }

        } catch (error) {
            alert(error.message);
            setPending(false);
        }
    });

    if (reloadBtn) {
        reloadBtn.addEventListener('click', () => {
            successScreen.style.display = 'none';
            form.style.display = 'block';
            setPending(false);
        });
    }
}