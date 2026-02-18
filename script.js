const { useState, useEffect, useRef } = React;

// Main App Component
const App = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Handle scroll for nav
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Initialize all animations
        initAnimations();
        initLoadingScreen();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <LoadingScreen />
            <Navigation scrolled={scrolled} />
            <Hero />
            <About />
            <Products />
            <Philosophy />
            <Contact />
            <Footer />
        </>
    );
};

// Loading Screen Component
const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-text">UMAA</div>
        </div>
    );
};

// Navigation Component
const Navigation = ({ scrolled }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="logo-container">
                    <img 
                        src={scrolled ? 'logo-t.png' : 'inverted-logo.png'}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'logo.jpg'; }}
                        alt="The House of Umaa"
                        style={{ transition: 'opacity 0.3s ease' }}
                    />
                </div>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#products">Collection</a></li>
                    <li><a href="#philosophy">Philosophy</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button 
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <ul className="mobile-menu-links">
                    <li><a href="#about" onClick={closeMenu}>About</a></li>
                    <li><a href="#products" onClick={closeMenu}>Collection</a></li>
                    <li><a href="#philosophy" onClick={closeMenu}>Philosophy</a></li>
                    <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                </ul>
                <p className="mobile-menu-tagline">Curated Accessories &amp; Artistry</p>
            </div>
        </>
    );
};

// Hero Component
const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-left">
                <div className="floating-text" style={{top: '20%', left: '-10%'}}>UMAA</div>
                <h1 className="hero-title">
                    <span>The House</span>
                    <span>of Umaa</span>
                </h1>
                <p className="hero-tagline">Curated Accessories & Artistry</p>
                <a href="#products" className="hero-cta">Explore Collection</a>
            </div>
            <div className="hero-right">
                <div className="hero-image-wrapper">
                    <div className="hero-image-placeholder"></div>
                </div>
            </div>
        </section>
    );
};

// About Component
const About = () => {
    return (
        <section className="about" id="about">
            <div className="about-container">
                <div className="about-image-wrapper">
                    <div className="about-image-placeholder"></div>
                </div>
                <div className="about-content">
                    <p className="section-label">Our Story</p>
                    <h2 className="about-title">Crafted with intention, worn with meaning</h2>
                    <p className="about-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris.
                    </p>
                    <p className="about-text">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </section>
    );
};

// Products Component
const Products = () => {
    const products = [
        { id: 1, name: 'Aurelia Ring', desc: 'Sterling Silver', price: '$000' },
        { id: 2, name: 'Celestia Necklace', desc: 'Gold Vermeil', price: '$000' },
        { id: 3, name: 'Luna Earrings', desc: 'Handcrafted Brass', price: '$000' },
        { id: 4, name: 'Solstice Bracelet', desc: 'Mixed Metals', price: '$000' },
        { id: 5, name: 'Vesper Chain', desc: 'Oxidized Silver', price: '$000' },
        { id: 6, name: 'Meridian Cuff', desc: 'Rose Gold', price: '$000' },
        { id: 7, name: 'Equinox Pendant', desc: 'Gemstone Accent', price: '$000' },
        { id: 8, name: 'Zenith Ring', desc: 'Textured Gold', price: '$000' },
        { id: 9, name: 'Arcane Brooch', desc: 'Vintage Inspired', price: '$000' }
    ];

    return (
        <section className="products" id="products">
            <div className="products-header">
                <h2 className="products-title">The Collection</h2>
                <p className="products-subtitle">Timeless Pieces for the Modern Soul</p>
            </div>
            <div className="products-grid">
                {products.map((product, index) => (
                    <div className="product-card" key={product.id} data-product-index={index}>
                        <div className="product-image-wrapper">
                            <div className="product-image-placeholder"></div>
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-desc">{product.desc}</p>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Philosophy Component
const Philosophy = () => {
    useEffect(() => {
        // Create animated background shapes
        const philosophySection = document.querySelector('.philosophy');
        
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'philosophy-bg-shape';
            
            const size = Math.random() * 300 + 100;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            
            philosophySection.appendChild(shape);
            
            gsap.to(shape, {
                x: `${Math.random() * 200 - 100}px`,
                y: `${Math.random() * 200 - 100}px`,
                rotation: 360,
                duration: 20 + Math.random() * 10,
                repeat: -1,
                yoyo: true,
                ease: 'none'
            });
        }
    }, []);

    return (
        <section className="philosophy" id="philosophy">
            <div className="philosophy-content">
                <blockquote className="philosophy-quote">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                </blockquote>
                <p className="philosophy-author">&#8212; The House of Umaa</p>
            </div>
        </section>
    );
};

// Contact Component
const Contact = () => {
    return (
        <section className="contact" id="contact">
            <div className="contact-container">
                <div className="contact-left">
                    <h2>Let's Connect</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="mailto:hello@thehouseofumaa.com" className="contact-email">
                        hello@thehouseofumaa.com
                    </a>
                    <div className="social-links">
                        <a href="#" className="social-link">Instagram</a>
                        <a href="#" className="social-link">E-mail</a>
                    </div>
                </div>
                <div className="contact-right">
                    <p className="section-label">Follow Our Journey</p>
                    <p className="about-text">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                        voluptate velit esse cillum dolore.
                    </p>
                    <p className="about-text">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">© 2026 The House of Umaa. All Rights Reserved.</p>
        </footer>
    );
};

// Animation Initialization
function initAnimations() {
    // Loading screen animation
    gsap.to('.loading-screen', {
        opacity: 0,
        duration: 1,
        delay: 2,
        onComplete: () => {
            document.querySelector('.loading-screen').style.display = 'none';
        }
    });

    const isMobile = window.innerWidth <= 768;

    // Logo fade in
    if (isMobile) {
        gsap.set('.logo-container', { opacity: 1 });
    } else {
        gsap.to('.logo-container', {
            opacity: 1,
            duration: 1,
            delay: 2.5
        });
    }

    // Nav links stagger - skip on mobile (hamburger menu used instead)
    if (!isMobile) {
        gsap.to('.nav-links li', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 2.7
        });
    } else {
        gsap.set('.nav-links li', { opacity: 1, y: 0 });
    }

    // Hero title animation - each word slides in
    gsap.to('.hero-title span', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 3,
        ease: 'power3.out'
    });

    gsap.to('.hero-tagline', {
        opacity: 1,
        duration: 1,
        delay: 3.5
    });

    gsap.to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 3.7
    });

    // Hero image scale in
    gsap.to('.hero-image-placeholder', {
        scale: 1,
        duration: 1.5,
        delay: 3.2,
        ease: 'power2.out'
    });

    // Floating text animation
    gsap.to('.floating-text', {
        x: '20%',
        y: '10%',
        rotation: 5,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'none'
    });

    // About section animations
    gsap.from('.about-image-wrapper', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    // Products grid - stagger animation
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: {
            amount: 1.2,
            from: 'random'
        },
        ease: 'power2.out'
    });

    // Philosophy section - dramatic reveal
    gsap.from('.philosophy-quote', {
        scrollTrigger: {
            trigger: '.philosophy',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.philosophy-author', {
        scrollTrigger: {
            trigger: '.philosophy',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
    });

    // Contact section slide in
    gsap.from('.contact-left', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.contact-right', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Parallax effect on hero
    gsap.to('.hero-right', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        ease: 'none'
    });

    // Product cards parallax
    document.querySelectorAll('.product-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: index % 2 === 0 ? -50 : 50,
            ease: 'none'
        });
    });
}

function initLoadingScreen() {
    // Animate loading text
    gsap.from('.loading-text', {
        opacity: 0,
        letterSpacing: '20px',
        duration: 1,
        ease: 'power2.out'
    });
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));