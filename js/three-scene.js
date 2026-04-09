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
       
       const geometry = new THREE.BufferGeometry();
       const vertices = [];
       for (let i = 0; i < 2500; i++) {
           const x = THREE.MathUtils.randFloatSpread(500);
           const y = THREE.MathUtils.randFloatSpread(500);
           const z = THREE.MathUtils.randFloatSpread(500);
           vertices.push(x, y, z);
       }
       geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
       
       const material = new THREE.PointsMaterial({
           color: 0xffb07c,
           size: 1.5,
           transparent: true,
           opacity: 0.8
       });
       
       particles = new THREE.Points(geometry, material);
       galaxyScene.add(particles);
       
       animateGalaxy();
    }
});

function animateGalaxy() {
    requestAnimationFrame(animateGalaxy);
    if(particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
    }
    if(galaxyRenderer && galaxyScene && galaxyCamera) {
       galaxyRenderer.render(galaxyScene, galaxyCamera);
    }
}
