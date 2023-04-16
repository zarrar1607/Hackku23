const svgContainer = document.getElementById('img-container');
let posX = 100;
let posY = 80;
let dx =1;
let dy = 2;

function moveSvg() {
  posX += dx;
  posY += dy;
  svgContainer.style.top = posY +'px';
  svgContainer.style.left = posX + 'px';
  svgContainer.style.top = posY -'px';
  if (posX < 10 || posX > window.innerWidth - svgContainer.offsetWidth) {
    dx = -dx;
  }
  if (posY < 90 || posY > window.innerHeight - svgContainer.offsetHeight) {
    dy = -dy;
  }
}

setInterval(moveSvg, 10);
