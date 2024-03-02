const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const escala = 20;

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarEjes() {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
}

function dibujarRecta(a, b, c, d, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
    const y = (-a * x - c * y - d) / b;
    ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
  }

  ctx.stroke();
}

function graficarSistema() {
  limpiarCanvas();
  dibujarEjes();

  const a1 = parseFloat(document.getElementById("texto-a1").value);
  const b1 = parseFloat(document.getElementById("texto-b1").value);
  const c1 = parseFloat(document.getElementById("texto-c1").value);
  const d1 = parseFloat(document.getElementById("texto-d1").value);

  const a2 = parseFloat(document.getElementById("texto-a2").value);
  const b2 = parseFloat(document.getElementById("texto-b2").value);
  const c2 = parseFloat(document.getElementById("texto-c2").value);
  const d2 = parseFloat(document.getElementById("texto-d2").value);

  const a3 = parseFloat(document.getElementById("texto-a3").value);
  const b3 = parseFloat(document.getElementById("texto-b3").value);
  const c3 = parseFloat(document.getElementById("texto-c3").value);
  const d3 = parseFloat(document.getElementById("texto-d3").value);

  dibujarRecta(a1, b1, c1, d1, "red");
  dibujarRecta(a2, b2, c2, d2, "blue");
  dibujarRecta(a3, b3, c3, d3, "green");
}

// Dibujar ejes al cargar la página
limpiarCanvas();
dibujarEjes();
