document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isActive = mainNav.classList.contains('active');
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isActive ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // 4. FAQ Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions (optional, but good for minimal aesthetic)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            header.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 5. WhatsApp Form Submission Logic
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const formContato = document.getElementById('form-contato');
    
    if (btnWhatsapp && formContato) {
        btnWhatsapp.addEventListener('click', () => {
            // Check if form is valid before submitting
            if (!formContato.checkValidity()) {
                formContato.reportValidity();
                return;
            }

            const nome = document.getElementById('nome').value;
            const area = document.getElementById('area').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Format message for WhatsApp
            const texto = `Olá, meu nome é ${nome}.\nGostaria de falar sobre: ${area}.\n\nMensagem: ${mensagem}`;
            const textoCodificado = encodeURIComponent(texto);
            
            // WhatsApp Number (Real phone number retrieved from site)
            const numeroTelefone = "5533998572823"; 
            
            const whatsappUrl = `https://wa.me/${numeroTelefone}?text=${textoCodificado}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // 6. Subtle Parallax for Images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    
    // Only apply parallax if user hasn't reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && parallaxImages.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxImages.forEach(img => {
                    const rect = img.getBoundingClientRect();
                    const viewHeight = window.innerHeight;
                    
                    // Only calculate if image is in viewport
                    if (rect.top <= viewHeight && rect.bottom >= 0) {
                        const yPos = (rect.top / viewHeight) * 20; // Max 20px move
                        img.style.transform = `translateY(${yPos}px) scale(1.05)`; // Scale avoids edges showing
                    }
                });
            });
        }, { passive: true });
    }
});
