

export function initAnker() {


const backToTopButton = document.getElementById('backToTop');
        
      // Funkcja sprawdzająca pozycję przewinięcia i pokazująca/ukrywająca przycisk
      function toggleBackToTopButton() {
          // Obliczenie procentu przewinięcia strony
          const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          const scrollPercent = (scrolled / scrollTotal) * 100;
          
          // Pokazanie przycisku, gdy przewinięto co najmniej 20% strony
          if (scrollPercent >= 7) {
              backToTopButton.classList.add('visible');
          } else {
              backToTopButton.classList.remove('visible');
          }
      }
      
      // Funkcja przewijająca na górę strony
      function scrollToTop() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      }
      
      // Nasłuchiwanie na zdarzenie przewijania strony
      window.addEventListener('scroll', toggleBackToTopButton);
      
      // Nasłuchiwanie na kliknięcie przycisku
      backToTopButton.addEventListener('click', scrollToTop);


    }