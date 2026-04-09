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

    // 1. Auto Typing Hook
    const hookObj = document.querySelector('.typing-hook');
    if (hookObj) {
      const text = hookObj.getAttribute('data-text');
      hookObj.innerText = '';
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          hookObj.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50 + Math.random() * 50); // Smooth random typing
        }
      }
      setTimeout(typeWriter, 500); // delay start by 500ms
    }

    // 2. Counters Pop-up and Increment
    const counterCards = document.querySelectorAll('.counter-card');
    if (counterCards.length > 0) {
      gsap.to(counterCards, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.counters-grid',
          start: 'top 80%',
          onEnter: () => {
            document.querySelectorAll('.counter-number').forEach(num => {
              const target = parseInt(num.getAttribute('data-target'));
              gsap.to(num, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                  num.innerText = Math.ceil(this.targets()[0].innerText);
                }
              });
            });
          }
        }
      });
    }

    // 3. Cinematic Brand Classes Slide in
    const isMobile = window.innerWidth <= 768;
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: card,
           start: 'top 90%',
           end: 'bottom 10%',
           scrub: true
         }
       });
       if (isMobile) {
         // Smooth, lag-free premium fade and scale for mobile (avoids 3D clipping)
         tl.fromTo(card, { y: 50, opacity: 0.2, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1 })
           .to(card, { y: -50, opacity: 0.2, scale: 0.95, duration: 1 });
       } else {
         // Full 3D Tumble Scrub for Desktop
         tl.fromTo(card, { rotateX: 60, y: 100, opacity: 0, scale: 0.8 }, { rotateX: 0, y: 0, opacity: 1, scale: 1, duration: 1 })
           .to(card, { rotateX: -60, y: -100, opacity: 0, scale: 0.8, duration: 1 });
       }
    });

    // 4. Flip Services Cards (Scrubbing)
    const flipCards = document.querySelectorAll('.flip-card');
    if (flipCards.length > 0) {
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: '.flip-services-part',
            start: 'top top',
            end: '+=200%',    // Amount of scrolling space
            scrub: 1,         // Smooth scrubbing
            pin: true
         }
      });
      // Sequence: each card flips in (rotateX 0, opacity 1) then fades out slightly as next comes in
      flipCards.forEach((card, index) => {
         tl.to(card, {
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut'
         }, index); 
         
         // Every card (including the last one) fades out and scales down at the end of its view time
         tl.to(card, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8
         }, index + 0.8); 
      });
      // Add empty space at the end of timeline for smooth release to next section
      tl.to({}, { duration: 0.2 });
    }

    // Cinematic Card-by-Card native stagger (Zero Lag, perfectly smooth)
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
       projectCards.forEach((card) => {
          gsap.fromTo(card,
            { y: 70, opacity: 0, scale: 0.95 },
            {
               y: 0, 
               opacity: 1, 
               scale: 1, 
               duration: 1.2, 
               ease: 'power3.out',
               scrollTrigger: {
                 trigger: card,
                 start: 'top 85%',
                 once: true
               }
            }
          );
       });
    }

    // Standard Entrance animations for other general elements
    const generalElements = document.querySelectorAll('.service-card, .timeline-item, .info-block');
    if (generalElements.length > 0) {
      gsap.fromTo(generalElements, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: generalElements[0],
            start: 'top 85%'
          }
        }
      );
    }

    // Like buttons interaction
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', function() {
         gsap.to(this.querySelector('i'), { scale: 1.5, color: '#ffb07c', duration: 0.2, yoyo: true, repeat: 1 });
         this.style.borderColor = '#ffb07c';
      });
    });
    document.querySelectorAll('.dislike-btn').forEach(btn => {
      btn.addEventListener('click', function() {
         gsap.to(this.querySelector('i'), { scale: 1.5, color: '#ff4444', duration: 0.2, yoyo: true, repeat: 1 });
         this.style.borderColor = '#ff4444';
      });
    });

    // Notify Three.js scene to render Galaxy if on home page
    if (pageKey === 'home_dubai' || pageKey === 'home_egypt') {
       // Optional: We can dispatch an event to three-scene.js
       document.dispatchEvent(new CustomEvent('HOME_PAGE_RENDERED'));
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
