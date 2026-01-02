
document.addEventListener('DOMContentLoaded', () => {
 
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        body.className = savedTheme;
        updateToggleIcon(savedTheme);
    };

    const updateToggleIcon = (theme) => {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark-theme') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    const toggleTheme = () => {
        const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
        const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
        
        body.classList.remove(currentTheme);
        body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    };

    const toggleMobileMenu = () => {
        navbar.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    };

    const closeMobileMenu = () => {
        navbar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    };

    const smoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScroll(targetId);
            closeMobileMenu();
        });
    });

    const scrollIndicator = document.querySelector('.scroll-indicator a');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll('#about');
        });
    }

    themeToggle.addEventListener('click', toggleTheme);
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    window.addEventListener('scroll', updateActiveNavLink);

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    initializeTheme();
    updateActiveNavLink();

    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
   
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .about-card, .skill-category, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
