// Canvas drawing on tenthpage.

const drawCanvas = document.getElementById("drawCanvas"); // Identifying the canvas.
const drawctx = drawCanvas.getContext("2d"); // Getting the actual context of the canvas, where we'll draw on.
let coord = { x: 0, y: 0 }; // Setting the base co-ordinates
document.addEventListener("mousedown", start); // When the mouse is down, fire the start function
document.addEventListener("mouseup", stop); // For the stop function.
window.addEventListener("resize", resize); // Whenever the window is resized.


function resize() {
  drawctx.canvas.width = window.innerWidth;
  drawctx.canvas.height = window.innerHeight;
}

resize(); 
function start(event) {
  getMousePosition(drawCanvas, event)
  document.addEventListener("mousemove", draw);

}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect(); // Get bounding client rect is supposed to find the co-ordinates of an element relevant to the viewport. Going to have to tweak this and do more research.
  coord.x =  event.clientX - rect.left
  coord.y =  event.clientY - rect.top;
}


function stop() {
  document.removeEventListener("mousemove", draw); // Once the mouse is up, remove the event listener.
}

function draw(event) {
  drawctx.beginPath();
  drawctx.lineWidth = 7;
  drawctx.lineCap = "butt";
  drawctx.strokeStyle = "#8BDCF0";
  drawctx.moveTo(coord.x, coord.y);
  getMousePosition(drawCanvas, event)
  drawctx.lineTo(coord.x, coord.y);
  drawctx.stroke();
}


