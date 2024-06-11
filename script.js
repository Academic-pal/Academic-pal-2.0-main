document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".fade-in").forEach(function (element) {
      gsap.fromTo(element, { opacity: 0 }, {
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      });
    });

    gsap.utils.toArray(".slide-in-left").forEach(function (element) {
      gsap.fromTo(element, { x: '-100%', opacity: 0 }, {
        x: '0%',
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      });
    });

// Hamburger menu functionality for mobile view
const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinksMobile = document.getElementById("nav-links-mobile");

hamburgerMenu.addEventListener("click", function () {
  navLinksMobile.classList.toggle("open");
});
});







function init3DBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('background').appendChild(renderer.domElement);

  // Add space background
  const spaceTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/space.jpg');
  scene.background = spaceTexture;

  // Add stars
  const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let i = 0; i < 1000; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
      star.position.set(x, y, z);
      scene.add(star);
  }

  // Add animated planet
  const planetTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  const planetGeometry = new THREE.SphereGeometry(3, 32, 32);
  const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  scene.add(planet);

  // Add animated asteroids
  const asteroidTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
  const asteroidGeometry = new THREE.PlaneGeometry(2, 2);
  const asteroidMaterial = new THREE.MeshBasicMaterial({ map: asteroidTexture, transparent: true });
  const asteroids = [];
  for (let i = 0; i < 50; i++) {
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      const distance = THREE.MathUtils.randFloat(100, 300);
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = THREE.MathUtils.randFloatSpread(200);
      asteroid.position.set(x, y, z);
      asteroids.push(asteroid);
      scene.add(asteroid);
  }

  camera.position.z = 10;

  // Animate planets and asteroids
  function animate() {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.005;
      asteroids.forEach(asteroid => {
          asteroid.rotation.z += 0.01;
      });
      renderer.render(scene, camera);
  }

  animate();

  // Adjust camera and renderer on window resize
  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

init3DBackground();







    document.getElementById('hamburger-menu').addEventListener('click', function() {
      const mobileMenu = document.getElementById('nav-links-mobile');
      mobileMenu.classList.toggle('active');
      document.querySelectorAll('.hamburger-menu span').forEach(span => {
        span.classList.toggle('active');
      });
    });
  
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links-mobile li a').forEach(link => {
      link.addEventListener('click', function() {
        const mobileMenu = document.getElementById('nav-links-mobile');
        mobileMenu.classList.remove('active');
        document.querySelectorAll('.hamburger-menu span').forEach(span => {
          span.classList.remove('active');
        });
      });
    });

    const noteCards = document.querySelectorAll('.note-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPage = document.querySelector('.currentPage');
const itemsPerPage = 3; // Number of note cards to show per page
let currentPageNumber = 1;

showPage(currentPageNumber);

prevBtn.addEventListener('click', () => {
  if (currentPageNumber > 1) {
    currentPageNumber--;
    showPage(currentPageNumber);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPageNumber < Math.ceil(noteCards.length / itemsPerPage)) {
    currentPageNumber++;
    showPage(currentPageNumber);
  }
});

function showPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  noteCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  currentPage.textContent = pageNumber;
}



