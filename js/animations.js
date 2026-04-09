let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // Integrate GSAP with Lenis
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  });
  gsap.ticker.lagSmoothing(0);
}

function initGlobalAnimations() {
  const hamburger = document.getElementById('nav-toggle');
  const fullscreenNav = document.getElementById('fullscreen-nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Hamburger menu toggle
  let isNavOpen = false;
  hamburger.addEventListener('click', () => {
    isNavOpen = !isNavOpen;
    if (isNavOpen) {
      hamburger.classList.add('open');
      fullscreenNav.classList.add('active');
    } else {
      hamburger.classList.remove('open');
      fullscreenNav.classList.remove('active');
    }
  });

  // Navigate when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      
      // Close Nav
      isNavOpen = false;
      hamburger.classList.remove('open');
      fullscreenNav.classList.remove('active');
      
      // Dispatch navigation event
      setTimeout(() => {
         document.dispatchEvent(new CustomEvent('NAVIGATE_PAGE', { detail: page }));
      }, 300);
    });
  });

  // Magnetic Button Logic
  const magneticItems = document.querySelectorAll('.magnetic-icon, .magnetic-btn');
  magneticItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const h = rect.width / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - h;
      
      gsap.to(item, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // Logo Pulse Target
  gsap.to('.glow-effect', {
    opacity: 0.6,
    scale: 1.2,
    duration: 1.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
}

function initPageAnimations(pageKey) {
  // Clear any existing scroll triggers from previous page
  ScrollTrigger.getAll().forEach(t => t.kill());

  // Wait a tick for DOM to be parsed
  setTimeout(() => {
    // Text Reveal for Home
    if (document.querySelector('.hero-title')) {
      gsap.fromTo('.hero-title', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
    }

    // Portfolio Horizontal Scroll
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    if (scrollContainer && window.innerWidth > 768) {
       let amountToScroll = scrollContainer.scrollWidth - window.innerWidth + 100; // plus padding
       if(amountToScroll > 0) {
           gsap.to(scrollContainer, {
             x: -amountToScroll,
             ease: "none",
             scrollTrigger: {
               trigger: ".portfolio-page",
               pin: true,
               scrub: 1,
               start: "center center",
               end: () => "+=" + amountToScroll
             }
           });
       }
    }

    // Standard Entrance animations for cards
    const cards = document.querySelectorAll('.service-card, .timeline-item, .info-block');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%'
          }
        }
      );
    }
  }, 100);
}

function fadeOutView(onComplete) {
  const appView = document.getElementById('app-view');
  gsap.to(appView, {
    opacity: 0, 
    duration: 0.4, 
    ease: 'power2.inOut',
    onComplete: () => {
      onComplete();
      window.scrollTo(0, 0); // scroll to top smoothly
      gsap.to(appView, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 });
    }
  });
}
