import { initNavbar } from './navbar.js';
import { initContactForm } from './contact-form.js';
import { initAccordion } from './accordian.js';
import { initFaq } from './faq.js';
import { initCounter } from './counter.js';
import { initAnimations } from './animation.js';
import { initAnker } from './anker.js';
import { initCookie } from './cookie.js';
import { initDownloads } from './downloads.js';
import { initDetails } from './details.js';
import { initFooterYear } from './footer.js';



document.addEventListener('DOMContentLoaded', () => {
    
   
    
    if (document.getElementById('navbar')) {
        initNavbar();
    }
     if (document.getElementById('counter')) {
        initCounter();
    }
    if (document.getElementById('cnt-form')) {
        initContactForm();
    }

     if (document.getElementById('accordion-section')) {
        initAccordion();
    }
       initAnimations();
    
     if (document.getElementById('faq-section')) {
        initFaq();
    }
      if (document.getElementById('backToTop')) {
        initAnker();
    }
      if (document.getElementById('cookie-banner')) {
        initCookie();
    }
     if (document.getElementById('downloads-section')) {
        initDownloads();
    }
     initDetails();
     initFooterYear();

    
  
});