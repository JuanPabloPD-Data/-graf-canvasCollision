const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Dimensiones de la ventana
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {

constructor(x, y, radius, color, text, speed) {

this.posX = x;
this.posY = y;
this.radius = radius;

this.originalColor = color; //color original
this.color = color;

this.text = text;
this.speed = speed;

this.dx = 1 * this.speed;
this.dy = 1 * this.speed;

this.isColliding = false;

}

draw(context) {

context.beginPath();

context.strokeStyle = this.color;

context.textAlign = "center";
context.textBaseline = "middle";
context.font = "20px Arial";

context.fillText(this.text, this.posX, this.posY);

context.lineWidth = 2;
context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);

context.stroke();
context.closePath();

}

update(context) {

this.draw(context);

this.posX += this.dx;
this.posY += this.dy;

//rebote horizontal
if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
this.dx = -this.dx;
}

//rebote vertical
if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
this.dy = -this.dy;
}

}

//método para detectar colisión con otro círculo
detectCollision(otherCircle) {

let dx = this.posX - otherCircle.posX;
let dy = this.posY - otherCircle.posY;

let distance = Math.sqrt(dx * dx + dy * dy);

//formula de distancia entre centros
if (distance < this.radius + otherCircle.radius) {

this.isColliding = true;
otherCircle.isColliding = true;

}

}

}

let circles = [];

//Generar círculos
function generateCircles(n) {

for (let i = 0; i < n; i++) {

let radius = Math.random() * 30 + 20;

let x = Math.random() * (window_width - radius * 2) + radius;
let y = Math.random() * (window_height - radius * 2) + radius;

let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

let speed = Math.random() * 4 + 1; //velocidad entre 1 y 5

let text = `C${i + 1}`;

circles.push(new Circle(x, y, radius, color, text, speed));

}

}

//animación
function animate() {

ctx.clearRect(0, 0, window_width, window_height);

//reset colisiones
circles.forEach(circle => {
circle.isColliding = false;
circle.color = circle.originalColor;
});

//comparar cada círculo con los demás
for (let i = 0; i < circles.length; i++) {

for (let j = i + 1; j < circles.length; j++) {

circles[i].detectCollision(circles[j]);

}

}

//cambiar color si hay colisión
circles.forEach(circle => {

if (circle.isColliding) {

circle.color = "#0000FF";

}

circle.update(ctx);

});

requestAnimationFrame(animate);

}

//20 círculos
generateCircles(20);

animate();