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

function dibujarRecta(a, b, c, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
    const y = (-a * x - c) / b;
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

  const a2 = parseFloat(document.getElementById("texto-a2").value);
  const b2 = parseFloat(document.getElementById("texto-b2").value);
  const c2 = parseFloat(document.getElementById("texto-c2").value);

  dibujarRecta(a1, b1, c1, "red");
  dibujarRecta(a2, b2, c2, "blue");
}

// Dibujar ejes al cargar la página
limpiarCanvas();
dibujarEjes();
