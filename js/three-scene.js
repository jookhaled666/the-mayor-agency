let scene, camera, renderer, earthMesh;
let targetRotationX = 0;
let targetRotationY = 0;
let mouseX = 0;
let mouseY = 0;

function initThreeScene() {
  const canvas = document.getElementById('earth-canvas');
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5.5;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Dark glowing earth material - Skeuomorphic "metal/glass" wireframe style
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  
  const material = new THREE.MeshPhongMaterial({
    color: 0x111111,
    emissive: 0x050505,
    specular: 0xffb07c,
    shininess: 30,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });

  earthMesh = new THREE.Mesh(geometry, material);
  scene.add(earthMesh);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffb07c, 1, 100);
  pointLight.position.set(5, 3, 5);
  scene.add(pointLight);

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);

  animate();
  
  // Custom initial pos
  targetRotationY = Math.PI / 4;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);
  
  // Smoothly rotate Earth towards target
  earthMesh.rotation.y += (targetRotationY - earthMesh.rotation.y) * 0.03;
  earthMesh.rotation.x += (targetRotationX - earthMesh.rotation.x) * 0.03;

  // Add subtle float/spin based on mouse
  earthMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  earthMesh.rotation.y += mouseX * 0.005;
  earthMesh.rotation.x += mouseY * 0.005;

  renderer.render(scene, camera);
}

function transitionEarth(region) {
  // Cinematic zoom out and rotate
  gsap.to(camera.position, { z: 7.5, duration: 0.8, ease: "power2.inOut", yoyo: true, repeat: 1 });
  
  if (region === 'egypt') {
    targetRotationY = -Math.PI / 5;
    targetRotationX = 0.2;
  } else {
    // Dubai
    targetRotationY = Math.PI / 4;
    targetRotationX = 0.1;
  }
}

// Custom Galaxy Scene for Home Part 5
let galaxyScene, galaxyCamera, galaxyRenderer, particles;

document.addEventListener('HOME_PAGE_RENDERED', () => {
    const container = document.getElementById('galaxy-container');
    if (container && !galaxyRenderer) {
       galaxyScene = new THREE.Scene();
       galaxyCamera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
       galaxyCamera.position.z = 200;
       
       galaxyRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
       galaxyRenderer.setSize(container.clientWidth, container.clientHeight);
       container.appendChild(galaxyRenderer.domElement);
       
       // Generate luxurious text-based logos directly via Canvas to completely bypass Local File (CORS) security errors in WebGL!
       const brandNames = ["Samsonite", "ANKER", "BINGHATTI", "Mashreq", "The Mayor"];
       particles = new THREE.Group();
       
       for (let i = 0; i < 150; i++) {
           const canvas = document.createElement('canvas');
           // High-resolution canvas for crisp Retina text on mobile
           canvas.width = 600;
           canvas.height = 160;
           const context = canvas.getContext('2d');
           // Transparent background
           context.fillStyle = 'rgba(0,0,0,0)';
           context.fillRect(0, 0, 600, 160);
           
           // Chic, ultra crisp typography
           context.font = '60px "Helvetica Neue", sans-serif'; // Doubled size
           context.textAlign = 'center';
           context.textBaseline = 'middle';
           context.letterSpacing = '10px'; // Chic spacing doubled
           
           // Soft glow effect
           context.shadowColor = '#ffb07c';
           context.shadowBlur = 15;
           context.fillStyle = 'rgba(255, 255, 255, 0.95)';
           
           const text = brandNames[Math.floor(Math.random() * brandNames.length)];
           context.fillText(text, 300, 80);
           
           const texture = new THREE.CanvasTexture(canvas);
           texture.minFilter = THREE.LinearFilter;
           
           const material = new THREE.SpriteMaterial({ 
               map: texture,
               color: 0xffffff,
               transparent: true, 
               opacity: 0.7,
               depthWrite: false,
               blending: THREE.AdditiveBlending 
           });
           
           const sprite = new THREE.Sprite(material);
           
           // Spread them elegantly
           const r = 150 + Math.random() * 400;
           const theta = Math.random() * 2 * Math.PI;
           const phi = Math.acos(2 * Math.random() - 1);
           
           sprite.position.x = r * Math.sin(phi) * Math.cos(theta);
           sprite.position.y = (r * Math.sin(phi) * Math.sin(theta)) * 0.3; // Much flatter disk
           sprite.position.z = r * Math.cos(phi);
           
           // Much smaller size for elegance 
           const baseScale = 5 + Math.random() * 10;
           sprite.scale.set(baseScale * 3.75, baseScale, 1); // Respecting the 300x80 ratio roughly
           
           particles.add(sprite);
       }
       
       galaxyScene.add(particles);
       
       animateGalaxy();
    }
});

function animateGalaxy() {
    requestAnimationFrame(animateGalaxy);
    if(particles) {
        // Core rotation (slower, chic, calm)
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
        
        // Gentle tracking of mouse
        gsap.to(particles.rotation, {
           x: mouseY * 0.2,
           y: mouseX * 0.2,
           duration: 3,
           ease: 'power2.out'
        });
    }
    if(galaxyRenderer && galaxyScene && galaxyCamera) {
       galaxyRenderer.render(galaxyScene, galaxyCamera);
    }
}

// Window resize handling for Galaxy Camera
window.addEventListener('resize', () => {
    const container = document.getElementById('galaxy-container');
    if(container && galaxyCamera && galaxyRenderer) {
        galaxyCamera.aspect = container.clientWidth / container.clientHeight;
        galaxyCamera.updateProjectionMatrix();
        galaxyRenderer.setSize(container.clientWidth, container.clientHeight);
    }
});
