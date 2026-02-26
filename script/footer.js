export function initFooterYear() {
    const footerYear = document.querySelector('.footer-year');
    
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = currentYear;
    }
}