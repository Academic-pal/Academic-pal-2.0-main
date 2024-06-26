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



document.querySelectorAll('.bottom-icons a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});






document.addEventListener("DOMContentLoaded", () => {
  const platforms = document.querySelectorAll('.platform');
  const academicPal = document.querySelector('.academic-pal');
  const students = document.querySelector('.students');
  const svg = document.getElementById('connections');

  platforms.forEach(platform => {
      connectElements(platform, academicPal);
  });

  connectElements(academicPal, students);

  function connectElements(fromElement, toElement) {
      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2 - svgRect.left;
      const startY = fromRect.bottom - svgRect.top;
      const endX = toRect.left + toRect.width / 2 - svgRect.left;
      const endY = toRect.top - svgRect.top;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${startX} ${startY} C ${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`);
      path.classList.add('connection');
      path.style.strokeDashoffset = path.getTotalLength();

      svg.appendChild(path);
  }
});








let chatbotOpen = false;

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function toggleChatbot() {
    const chatContainer = document.getElementById("chat-container");
    chatbotOpen = !chatbotOpen;
    chatContainer.style.display = chatbotOpen ? "block" : "none";
}

function closeChatbot() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.display = "none";
    chatbotOpen = false;
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    appendMessage(userInput, "user-message");
    document.getElementById("user-input").value = "";

    setTimeout(() => {
        handleUserInput(userInput.toLowerCase());
    }, 500);
}

function appendMessage(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    messageElement.innerHTML = message; // Use innerHTML to render links as clickable
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleUserInput(input) {
    if (input.includes("1st year") || input.includes("first year")) {
        appendMessage("Which semester are you in? 1st sem or 2nd sem?", "bot-message");
    } else if (input.includes("2nd year") || input.includes("second year")) {
        appendMessage("Which semester are you in? 3rd sem or 4th sem?", "bot-message");
    } else if (input.includes("3rd year") || input.includes("third year")) {
        appendMessage("Which semester are you in? 5th sem or 6th sem?", "bot-message");
    } else if (input.includes("4th year") || input.includes("fourth year")) {
        appendMessage("Which semester are you in? 7th sem or 8th sem?", "bot-message");
    } else if (input.includes("1st sem") || input.includes("1st semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-1st-sem/' target='_blank'>Here is your link for 1st semester</a>", "bot-message");
    } else if (input.includes("2nd sem") || input.includes("2nd semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-2nd-sem/' target='_blank'>Here is your link for 2nd semester</a>", "bot-message");
    } else if (input.includes("3rd sem") || input.includes("3rd semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-3rd-sem/' target='_blank'>Here is your link for 3rd semester</a>", "bot-message");
    } else if (input.includes("4th sem") || input.includes("4th semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-4th-sem/' target='_blank'>Here is your link for 4th semester</a>", "bot-message");
    } else if (input.includes("5th sem") || input.includes("5th semester")) {
        appendMessage("<a href='https://github.com/Hari-hara7/B-tech-5th-sem.git' target='_blank'>Here is your link for 5th semester</a>", "bot-message");
    } else if (input.includes("6th sem") || input.includes("6th semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-6th-sem/' target='_blank'>Here is your link for 6th semester</a>", "bot-message");
    } else if (input.includes("7th sem") || input.includes("7th semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-7th-sem/' target='_blank'>Here is your link for 7th semester</a>", "bot-message");
    } else if (input.includes("8th sem") || input.includes("8th semester")) {
        appendMessage("<a href='https://hari-hara7.github.io/B-tech-8th-sem/' target='_blank'>Here is your link for 8th semester</a>", "bot-message");
    } else {
        appendMessage("I didn't understand that. Please specify your year and semester.", "bot-message");
    }
}
