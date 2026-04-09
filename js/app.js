import { pageData } from './data.js';
import { initThreeScene, transitionEarth } from './three-scene.js';
import { initLenis, initGlobalAnimations, initPageAnimations, fadeOutView } from './animations.js';

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
      // Find data 
      let key = currentPage;
      if (currentPage === 'home') {
        key = 'home_' + currentRegion;
      }
      const data = pageData[key][currentLang];
      appView.innerHTML = data.html;

      if(window.lucide) {
         lucide.createIcons();
      }
      
      initPageAnimations(key);
    });
  }

  // Handle region switch
  const regionSwitch = document.getElementById('region-switch');
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

  document.addEventListener('NAVIGATE_PAGE', (e) => {
    window.renderPage(e.detail);
  });

  // Initial Render
  window.renderPage('home');
});
