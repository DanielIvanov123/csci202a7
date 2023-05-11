const steamCanvas = document.getElementById('steamCanvas');
const ctx = steamCanvas.getContext('2d');
steamCanvas.width = window.innerWidth;
steamCanvas.height = window.innerHeight;

let steamParticles = [];
let steamTimer;

function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(checkLocation);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function checkLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const targetLatitude = 48.731497;
  const targetLongitude = -122.4858;
  const radius = 0.0001;

  if (Math.abs(targetLatitude - latitude) < radius &&
      Math.abs(targetLongitude - longitude) < radius) {
    clearInterval(steamTimer);
    steamTimer = setInterval(addSteamParticles, 100);
  } else {
    clearInterval(steamTimer);
    steamParticles = [];
  }
}

function addSteamParticles() {
  for (let i = 0; i < 5; i++) {
    steamParticles.push(new SteamParticle());
  }
}

class SteamParticle {
  constructor() {
    this.x = Math.random() * steamCanvas.width;
    this.y = steamCanvas.height;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.speedX;
    this.y -= this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, steamCanvas.width, steamCanvas.height);
  for (let i = 0; i < steamParticles.length; i++) {
    steamParticles[i].update();
    steamParticles[i].draw();

    if (steamParticles[i].size <= 0.2) {
      steamParticles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}

getGeoLocation();
animate();
setInterval(getGeoLocation, 6000);
