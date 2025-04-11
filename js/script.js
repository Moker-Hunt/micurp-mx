document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeaderScroll();
    initCookieConsent();
    initSmoothScroll();
});

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100 && scrollTop > lastScrollTop) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

function initCookieConsent() {
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptButton = document.querySelector('.accept-cookies');
    
    if (cookieConsent && acceptButton) {
        const cookieAccepted = localStorage.getItem('cookieConsent');
        
        if (!cookieAccepted) {
            cookieConsent.style.display = 'block';
            
            acceptButton.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'true');
                cookieConsent.style.display = 'none';
            });
        }
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimations() {
        animatedElements.forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
    
    checkAnimations();
    
    window.addEventListener('scroll', checkAnimations);
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, complete todos los campos requeridos.');
            }
        });
    });
}

function initFontSizeControls() {
    const increaseFontBtn = document.querySelector('.increase-font');
    const decreaseFontBtn = document.querySelector('.decrease-font');
    const resetFontBtn = document.querySelector('.reset-font');
    
    let currentFontSize = 100;
    
    if (increaseFontBtn && decreaseFontBtn && resetFontBtn) {
        increaseFontBtn.addEventListener('click', function() {
            if (currentFontSize < 150) {
                currentFontSize += 10;
                document.body.style.fontSize = currentFontSize + '%';
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
        
        decreaseFontBtn.addEventListener('click', function() {
            if (currentFontSize > 70) {
                currentFontSize -= 10;
                document.body.style.fontSize = currentFontSize + '%';
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
        
        resetFontBtn.addEventListener('click', function() {
            currentFontSize = 100;
            document.body.style.fontSize = '100%';
            localStorage.setItem('fontSize', 100);
        });
        
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            currentFontSize = parseInt(savedFontSize);
            document.body.style.fontSize = currentFontSize + '%';
        }
    }
}

function initThemeToggle() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.textContent = 'Modo Claro';
        } else {
            themeToggleBtn.textContent = 'Modo Oscuro';
        }
        
        themeToggleBtn.addEventListener('click', function() {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = 'Modo Oscuro';
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = 'Modo Claro';
            }
        });
    }
}
