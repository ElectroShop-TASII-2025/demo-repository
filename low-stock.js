// Datos de prueba (luego se reemplazan por los del backend)
const data = [
  { nombre:"Auriculares", marca:"TEKNIC", color:"Negro", cantidad:8, imagen:"auricularespng.png" },
  { nombre:"Teclado",    marca:"Redragon", color:"Negro con luces", cantidad:5, imagen:"teclado.png" },
  { nombre:"Mouse Gamer",marca:"Logitech", color:"Negro", cantidad:2, imagen:"mouse.png" },
  { nombre:"Procesador", marca:"Intel Core i7", color:"-", cantidad:2, imagen:"procesador.png" }
];

function renderList(items){
  const $list = document.getElementById('lowStockList');
  $list.innerHTML = items.map(i => `
    <article class="item">
      <img src="${i.imagen}" alt="${i.nombre}">
      <div class="meta">
        <div class="title">${i.nombre}</div>
        <div class="brand">Marca: ${i.marca}</div>
        <div class="color">Color: ${i.color}</div>
      </div>
      <div class="qty">
        <div class="label">Cantidad</div>
        <div class="value">${i.cantidad}</div>
      </div>
    </article>`).join('');
}

document.addEventListener('DOMContentLoaded', () => renderList(data));
