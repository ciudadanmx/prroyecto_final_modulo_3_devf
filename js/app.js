// Arreglo donde se almacenan las recetas
const recetas = [];

// Referencias al DOM
const formReceta = document.getElementById('form-receta');
const listaRecetas = document.getElementById('lista-recetas');
const buscador = document.getElementById('buscador');

// Función para renderizar recetas en el DOM
function mostrarRecetas(filtradas = recetas) {
    listaRecetas.innerHTML = '';

    filtradas.forEach((receta, i) => {
        const recetaHTML = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="https://i.imgur.com/3ugChYk.jpeg" class="card-img-top" alt="${receta.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${receta.nombre}</h5>
                        <p><strong>Ingredientes:</strong> ${receta.ingredientes.join(', ')}</p>
                        <p><strong>Pasos:</strong> ${receta.pasos.join(', ')}</p>
                        <p><strong>Categoría:</strong> ${receta.categoria}</p>
                        <button class="btn btn-danger" onclick="eliminarReceta(${i})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        listaRecetas.insertAdjacentHTML('beforeend', recetaHTML);
    });
}

// Escuchamos el evento submit del formulario
formReceta.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevaReceta = {
        nombre: document.getElementById('nombre').value,
        ingredientes: document.getElementById('ingredientes').value.split(','),
        pasos: document.getElementById('pasos').value.split(','),
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value
    };
    recetas.push(nuevaReceta);
    mostrarRecetas();
    formReceta.reset();
});

// Función para eliminar receta
function eliminarReceta(i) {
    recetas.splice(i, 1);
    mostrarRecetas();
}

// Función para buscar recetas
buscador.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtradas = recetas.filter(receta =>
        receta.nombre.toLowerCase().includes(query) ||
        receta.categoria.toLowerCase().includes(query)
    );
    mostrarRecetas(filtradas);
});

// Mostrar recetas iniciales (vacías)
mostrarRecetas();
