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

          transitionEarth(selected);
          currentRegion = selected;
          
          if (currentPage === 'home') {
             window.renderPage('home'); 
          }
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
