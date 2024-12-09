const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50; // Eszköztár helyének biztosítása

let isDrawing = false;
let startX, startY;
let currentShape = 'freeDraw'; // Alapértelmezett: szabad rajzolás
let color = '#000000';
let thickness = 1;

// Szín és vastagság beállítása
document.getElementById('color').addEventListener('input', (e) => color = e.target.value);
document.getElementById('thickness').addEventListener('input', (e) => thickness = e.target.value);

// Alakzat kiválasztása
document.getElementById('line').addEventListener('click', () => currentShape = 'line');
document.getElementById('circle').addEventListener('click', () => currentShape = 'circle');
document.getElementById('rectangle').addEventListener('click', () => currentShape = 'rectangle');

// Szabad rajzolás indítása
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (currentShape === 'freeDraw') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
});

// Rajzolás és alakzatok kezelése
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const endX = e.offsetX;
  const endY = e.offsetY;

  if (currentShape === 'freeDraw') {
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', (e) => {
  if (!isDrawing) return;
  isDrawing = false;

  const endX = e.offsetX;
  const endY = e.offsetY;

  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;

  if (currentShape === 'line') {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  } else if (currentShape === 'circle') {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
  } else if (currentShape === 'rectangle') {
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  }
});

// Törlés
document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Mentés
document.getElementById('save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Feltöltés
document.getElementById('upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const img = new Image();
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  img.src = URL.createObjectURL(file);
});
