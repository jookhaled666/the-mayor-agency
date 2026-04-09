document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initThreeScene();
  initGlobalAnimations();

  const appView = document.getElementById('app-view');
  let currentPage = 'home';
  let currentRegion = 'dubai';
  let currentLang = 'en';

  window.renderPage = function(pageKey) {
    currentPage = pageKey.replace('_dubai', '').replace('_egypt', '');
    
    fadeOutView(() => {
      let key = currentPage;
      if (currentPage === 'home') {
        key = 'home_' + currentRegion;
      }
      
      // Fallback to English if Arabic is not defined for a page yet
      const pageContent = pageData[key][currentLang] || pageData[key]['en'];
      
      appView.innerHTML = pageContent.html;

      if(window.lucide) {
         lucide.createIcons();
      }
      
      initPageAnimations(key);
    });
  }

  const regionSwitch = document.getElementById('region-switch');
  if(regionSwitch) {
    regionSwitch.querySelectorAll('span').forEach(span => {
      span.addEventListener('click', (e) => {
        const selected = e.target.getAttribute('data-region');
        if (selected !== currentRegion) {
          regionSwitch.querySelector('.active').classList.remove('active');
          e.target.classList.add('active');

          const preloader = document.getElementById('transition-preloader');
          const preText = document.getElementById('preloader-text');
          const pFill = document.querySelector('.progress-fill');
          preText.innerText = selected === 'egypt' ? 'Flying to Egypt...' : 'Flying to Dubai...';
          preloader.classList.add('active');
          
          setTimeout(() => { pFill.style.width = '100%'; }, 50);

          setTimeout(() => {
             transitionEarth(selected);
             currentRegion = selected;
             pFill.style.width = '0%';
             
             if (currentPage === 'home') {
                window.renderPage('home'); 
             }
             
             preloader.classList.remove('active');
             if(window.lucide) { lucide.createIcons(); }
          }, 2500);
        }
      });
    });
  }

  const langSwitch = document.getElementById('lang-switch');
  if(langSwitch) {
    langSwitch.querySelectorAll('span').forEach(span => {
      span.addEventListener('click', (e) => {
        const selected = e.target.getAttribute('data-lang');
        if (selected !== currentLang) {
          langSwitch.querySelector('.active').classList.remove('active');
          e.target.classList.add('active');

          currentLang = selected;
          window.renderPage(currentPage); 
        }
      });
    });
  }

  document.addEventListener('NAVIGATE_PAGE', (e) => {
    window.renderPage(e.detail);
  });

  window.renderPage('home');
});
