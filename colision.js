const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let eliminados = 0;
const contadorUI = document.getElementById("contador");

const img = new Image();
img.src = "assets/img/i.png";

class Objeto {

constructor(){
this.reset();
}

reset(){

this.size = Math.random()*40 + 30;

this.x = Math.random()*(width-this.size);

this.y = -this.size;

this.speed = Math.random()*2 + 1;

}

update(globalSpeed){

this.y += this.speed * globalSpeed;

if(this.y > height){
this.reset();
}

this.draw();

}

draw(){

ctx.drawImage(img,this.x,this.y,this.size,this.size);

}

}

let objetos = [];

function crearObjetos(n){

for(let i=0;i<n;i++){

objetos.push(new Objeto());

}

}

canvas.addEventListener("click",function(e){

const rect = canvas.getBoundingClientRect();

let mouseX = e.clientX - rect.left;
let mouseY = e.clientY - rect.top;

objetos.forEach(obj=>{

if(
mouseX > obj.x &&
mouseX < obj.x + obj.size &&
mouseY > obj.y &&
mouseY < obj.y + obj.size
){

eliminados++;

contadorUI.textContent = "Eliminadas: " + eliminados;

obj.reset();

}

});

});

function velocidadGlobal(){

if(eliminados > 15){
return 3.5;
}

if(eliminados > 10){
return 2.2;
}

return 1.4;

}

function animate(){

ctx.clearRect(0,0,width,height);

let velocidad = velocidadGlobal();

objetos.forEach(obj=>{

obj.update(velocidad);

});

requestAnimationFrame(animate);

}

crearObjetos(20);

img.onload = function(){
animate();
};