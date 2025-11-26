const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let letters = "アァイィウヴエカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
letters = letters.split("");

let fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function draw() {
  // Use the theme's background color for the fade effect, or a standard semi-transparent black
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get the current primary color from CSS variables
  const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').trim();
  ctx.fillStyle = primaryColor || "#00ff41";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});


window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const texts = ["Hi, I'm Data", "Hi, I'm Agustín Alaniz"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const eraseSpeed = 50;
const delayBetween = 1500;
const el = document.getElementById("typewriter");

// Check if element exists to avoid errors
if (el) {
  function typeEffect() {
    const currentText = texts[textIndex];
    const displayed = currentText.substring(0, charIndex);

    el.innerHTML = displayed;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        charIndex++;
        setTimeout(typeEffect, speed);
      } else {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, eraseSpeed);
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 300);
      }
    }
  }
  window.addEventListener("load", typeEffect);
}