const pageData = {
  home_dubai: {
    en: { html: window.homeHTMLDubaiEN },
    ar: { html: window.homeHTMLDubaiEN } // Arabic translation pending
  },
  home_egypt: {
    en: { html: window.homeHTMLEgyptEN },
    ar: { html: window.homeHTMLEgyptEN }
  },
  services: {
    en: {
      html: `
        <section class="services-page" style="padding: 0 10% 5%;">
          <h2 style="font-size: 3rem; margin-bottom: 3rem; color: var(--color-apricot);">Our Premium Services</h2>
          <div class="services-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px;">
            <div class="leather-panel service-card" style="padding: 40px;">
              <div style="width: 80px; height: 80px; background: #080808; border-radius: 20px; box-shadow: inset 2px 2px 5px rgba(0,0,0,0.9), inset -1px -1px 3px rgba(255,255,255,0.05); display:flex; justify-content:center; align-items:center; margin-bottom: 20px;">
                 <i data-lucide="star" style="color: var(--color-apricot); width: 32px; height: 32px;"></i>
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Celebrities Management</h3>
              <p style="color: var(--color-grey); line-height: 1.6;">Elevate your brand with 'The Mayor's' exclusive celebrities management services. We bridge the gap between global icons and premium brands across Dubai and Egypt, offering bespoke talent representation.</p>
            </div>
            
            <div class="leather-panel service-card" style="padding: 40px;">
              <div style="width: 80px; height: 80px; background: #080808; border-radius: 20px; box-shadow: inset 2px 2px 5px rgba(0,0,0,0.9), inset -1px -1px 3px rgba(255,255,255,0.05); display:flex; justify-content:center; align-items:center; margin-bottom: 20px;">
                 <i data-lucide="calendar" style="color: var(--color-apricot); width: 32px; height: 32px;"></i>
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Event Management</h3>
              <p style="color: var(--color-grey); line-height: 1.6;">Experience unparalleled luxury with our bespoke event management solutions. From conceptualization to flawless execution, ‘The Mayor’ orchestrates world-class corporate galas.</p>
            </div>
            
            <div class="leather-panel service-card" style="padding: 40px;">
              <div style="width: 80px; height: 80px; background: #080808; border-radius: 20px; box-shadow: inset 2px 2px 5px rgba(0,0,0,0.9), inset -1px -1px 3px rgba(255,255,255,0.05); display:flex; justify-content:center; align-items:center; margin-bottom: 20px;">
                 <i data-lucide="users" style="color: var(--color-apricot); width: 32px; height: 32px;"></i>
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Influencer Marketing</h3>
              <p style="color: var(--color-grey); line-height: 1.6;">Amplify your digital presence. 'The Mayor' connects your brand with elite tier-A influencers and tastemakers in the MENA region. We design data-driven storytelling strategies.</p>
            </div>

            <div class="leather-panel service-card" style="padding: 40px;">
              <div style="width: 80px; height: 80px; background: #080808; border-radius: 20px; box-shadow: inset 2px 2px 5px rgba(0,0,0,0.9), inset -1px -1px 3px rgba(255,255,255,0.05); display:flex; justify-content:center; align-items:center; margin-bottom: 20px;">
                 <i data-lucide="camera" style="color: var(--color-apricot); width: 32px; height: 32px;"></i>
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Media Production</h3>
              <p style="color: var(--color-grey); line-height: 1.6;">Redefine visual storytelling. Operating seamlessly between Dubai and Cairo, 'The Mayor' creates premium commercial video content, high-end photography, and cutting-edge 3D animations.</p>
            </div>

            <div class="leather-panel service-card" style="padding: 40px;">
              <div style="width: 80px; height: 80px; background: #080808; border-radius: 20px; box-shadow: inset 2px 2px 5px rgba(0,0,0,0.9), inset -1px -1px 3px rgba(255,255,255,0.05); display:flex; justify-content:center; align-items:center; margin-bottom: 20px;">
                 <i data-lucide="mouse-pointer" style="color: var(--color-apricot); width: 32px; height: 32px;"></i>
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Digital Marketing</h3>
              <p style="color: var(--color-grey); line-height: 1.6;">Dominate the digital landscape with our 360° holistic digital marketing strategies. At 'The Mayor', we blend data-driven SEO and luxury brand positioning to maximize global reach.</p>
            </div>
          </div>
        </section>
      `
    }
  },
  portfolio: {
    en: {
      html: `
        <section class="portfolio-page" style="padding: 0 0 5% 0;">
          <div style="padding: 0 10%; margin-bottom: 40px;">
            <h2 style="font-size: 3rem; color: var(--color-apricot);">Exclusive Portfolio</h2>
            <div class="portfolio-filters" style="display: flex; gap: 20px; margin-top: 20px;">
              <button class="tactile-btn primary" data-filter="all">All Brands</button>
              <button class="tactile-btn" data-filter="a-class">Class A</button>
              <button class="tactile-btn" data-filter="b-class">Class B</button>
            </div>
          </div>

          <div class="horizontal-scroll-container" style="display: flex; gap: 60px; padding: 0 10%; margin-top: 60px; overflow-x: auto; padding-bottom: 40px;">
            <div class="leather-panel stitched-border portfolio-item" style="min-width: 400px; height: 500px; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;">
              <i data-lucide="briefcase" style="width: 48px; height: 48px; color: var(--color-grey); margin-bottom: 20px;"></i>
              <h3 style="font-size: 1.5rem;">Luxury Client One</h3>
              <p style="color: var(--color-grey); margin-top: 10px;">Class A Brand</p>
            </div>
            <div class="leather-panel stitched-border portfolio-item" style="min-width: 400px; height: 500px; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;">
              <i data-lucide="briefcase" style="width: 48px; height: 48px; color: var(--color-grey); margin-bottom: 20px;"></i>
              <h3 style="font-size: 1.5rem;">Luxury Client Two</h3>
              <p style="color: var(--color-grey); margin-top: 10px;">Class B Brand</p>
            </div>
            <div class="leather-panel stitched-border portfolio-item" style="min-width: 400px; height: 500px; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;">
              <i data-lucide="briefcase" style="width: 48px; height: 48px; color: var(--color-grey); margin-bottom: 20px;"></i>
              <h3 style="font-size: 1.5rem;">Luxury Client Three</h3>
              <p style="color: var(--color-grey); margin-top: 10px;">Class A Brand</p>
            </div>
          </div>
        </section>
      `
    }
  },
  about: {
    en: {
      html: `
        <section class="about-page" style="padding: 0 10% 10%;">
          <h2 style="font-size: 3rem; color: var(--color-apricot); margin-bottom: 40px;">Our Legacy</h2>
          <div class="timeline" style="border-left: 2px solid rgba(255,176,124, 0.3); padding-left: 40px; margin-bottom: 100px;">
            <div class="timeline-item" style="margin-bottom: 60px; position: relative;">
               <div style="position:absolute; left: -49px; top: 0; width: 16px; height: 16px; background: var(--color-apricot); border-radius: 50%; box-shadow: 0 0 10px var(--color-apricot);"></div>
               <h3 style="font-size: 2rem; margin-bottom: 10px;">The Inception</h3>
               <p style="color: var(--color-grey); font-size: 1.2rem;">Bridging the legendary culture of Cairo with the futuristic vision of Dubai.</p>
            </div>
            <div class="timeline-item" style="margin-bottom: 60px; position: relative;">
               <div style="position:absolute; left: -49px; top: 0; width: 16px; height: 16px; background: var(--color-apricot); border-radius: 50%; box-shadow: 0 0 10px var(--color-apricot);"></div>
               <h3 style="font-size: 2rem; margin-bottom: 10px;">Establishing The Gold Standard</h3>
               <p style="color: var(--color-grey); font-size: 1.2rem;">Becoming the go-to agency for premium brands and A-list celebrities.</p>
            </div>
          </div>

          <h2 style="font-size: 3rem; color: var(--color-apricot); margin-bottom: 40px;">The Architects</h2>
          <div class="team-grid" style="display: flex; gap: 40px; flex-wrap: wrap;">
            <div class="leather-panel stitched-border" style="padding: 20px; width: 300px; text-align: center;">
              <div style="width: 100%; height: 300px; background: #000; border-radius: 8px; margin-bottom: 20px; display:flex; justify-content:center; align-items:center;">
                 <i data-lucide="user" style="color: #333; width: 64px; height: 64px;"></i>
              </div>
              <h4 style="font-size: 1.5rem;">Executive Producer</h4>
              <p style="color: var(--color-grey);">Visionary Leader</p>
            </div>
            <div class="leather-panel stitched-border" style="padding: 20px; width: 300px; text-align: center;">
              <div style="width: 100%; height: 300px; background: #000; border-radius: 8px; margin-bottom: 20px; display:flex; justify-content:center; align-items:center;">
                 <i data-lucide="user" style="color: #333; width: 64px; height: 64px;"></i>
              </div>
              <h4 style="font-size: 1.5rem;">Creative Director</h4>
              <p style="color: var(--color-grey);">Mastermind</p>
            </div>
          </div>
        </section>
      `
    }
  },
  contact: {
    en: {
      html: `
        <section class="contact-page" style="padding: 0 10% 5%; display: flex; gap: 80px; flex-wrap: wrap;">
           <div class="contact-info" style="flex: 1; min-width: 300px;">
              <h2 style="font-size: 3rem; color: var(--color-apricot); margin-bottom: 20px;">Connect With Us</h2>
              <p style="color: var(--color-grey); font-size: 1.2rem; margin-bottom: 40px;">Join our legacy. Let's create something extraordinary together.</p>
              
              <div class="info-block" style="margin-bottom: 30px;">
                <h4 style="font-size: 1.2rem; color: var(--color-apricot); margin-bottom: 10px;">Dubai HQ</h4>
                <p style="color: var(--color-grey);">Business Bay, The Prime Tower, Luxury Level</p>
                <p style="color: var(--color-grey);">+971 56 325 9250</p>
              </div>

              <div class="info-block">
                <h4 style="font-size: 1.2rem; color: var(--color-apricot); margin-bottom: 10px;">Egypt Office</h4>
                <p style="color: var(--color-grey);">New Cairo, 5th Settlement, The Elite Business Park</p>
                <p style="color: var(--color-grey);">+20 100 000 0000</p>
              </div>
              
              <div style="margin-top: 40px;">
                <p style="color: var(--color-grey); margin-bottom: 15px;">Email Us Directly:</p>
                <a href="mailto:contact@themayor.ae" style="font-size: 1.5rem; color: var(--color-white); text-decoration: underline;">contact@themayor.ae</a>
              </div>
           </div>

           <div class="contact-form-wrapper" style="flex: 1; min-width: 400px;">
             <div class="leather-panel stitched-border" style="padding: 50px;">
                <h3 style="font-size: 2rem; margin-bottom: 30px;">Send a Secure Message</h3>
                <form onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 20px;">
                  <input type="text" class="debossed-input" placeholder="Full Name (e.g. His/Her Excellency...)" />
                  <input type="email" class="debossed-input" placeholder="Secure Email Address" />
                  <textarea class="debossed-input" placeholder="Detail your project requirements..." rows="5" style="resize: none;"></textarea>
                  <button class="tactile-btn primary" style="margin-top: 20px;">Dispatch Inquiry</button>
                </form>
             </div>
           </div>
        </section>
      `
    }
  }
};
