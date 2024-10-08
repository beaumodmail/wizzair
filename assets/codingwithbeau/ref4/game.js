const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit screen and handle high-DPI displays
function resizeCanvas() {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const width = window.innerWidth * 0.9; // 90% of window width
  const height = window.innerHeight * 0.9; // 90% of window height
  
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(devicePixelRatio, devicePixelRatio); // Adjust for high-DPI screens
}

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 2,
  dy: 2,
  color: "#3498db"
};

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Update ball position and handle boundary collisions
function updateBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Bounce off the left or right wall
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }

  // Bounce off the top or bottom wall
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  drawBall(); // Redraw ball at new position
}

// Game loop
function gameLoop() {
  updateBall(); // Update and draw the ball
  requestAnimationFrame(gameLoop); // Repeat
}

// Initial setup
resizeCanvas();
window.addEventListener('resize', resizeCanvas); // Resize when window is resized

// Start the game
gameLoop();
