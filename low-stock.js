// low-stock.js
function renderList(items) {
  const $list = document.getElementById('lowStockList');
  if (!items || items.length === 0) {
    $list.innerHTML = `<div class="p-3 bg-white">No hay productos con bajo stock.</div>`;
    return;
  }

  $list.innerHTML = items.map(i => {
    const img = i.imagen ? `<img src="${i.imagen}" alt="${i.nombre}" class="prod-img me-3">`
                         : `<div class="prod-img me-3 d-flex align-items-center justify-content-center">🧩</div>`;
    return `
      <div class="item">
        <div class="d-flex align-items-center">
          ${img}
          <div class="flex-grow-1">
            <div class="fw-semibold">${i.nombre}</div>
            <div class="text-muted small">Marca: ${i.marca ?? '-'}</div>
            <div class="text-muted small">Color: ${i.color ?? '-'}</div>
          </div>
          <div class="text-end" style="min-width:80px;">
            <div class="text-muted small">Cantidad</div>
            <div class="fw-bold">${i.cantidad}</div>
          </div>
        </div>
        <div class="sep"></div>
      </div>
    `;
  }).join('');
}

// Traer del backend (ruta agrupada y ordenada que dejaste)
fetch('http://localhost:3000/api/bajo-stock')
  .then(r => r.json())
  .then(renderList)
  .catch(err => {
    console.error('Error bajo-stock:', err);
    const $list = document.getElementById('lowStockList');
    $list.innerHTML = `<div class="p-3 bg-white text-danger">Error cargando bajo stock.</div>`;
  });

