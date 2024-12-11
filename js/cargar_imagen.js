// Función para mostrar la vista previa de la imagen seleccionada
document.getElementById('imagen').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtener el archivo de imagen
    const reader = new FileReader(); // Usar FileReader para leer la imagen

    if (file) {
        // Generar una URL temporal para la imagen seleccionada
        const imageUrl = URL.createObjectURL(file);

        const imgPreview = document.getElementById('imagen-preview'); // Contenedor para la vista previa
        imgPreview.innerHTML = ''; // Limpiar el contenedor antes de agregar la nueva imagen
        const imgElement = document.createElement('img'); // Crear un nuevo elemento de imagen
        imgElement.src = imageUrl; // Asignar la URL temporal a la fuente de la imagen
        imgElement.alt = 'Vista previa de la imagen';
        imgElement.classList.add('img-fluid'); // Hacer que la imagen sea responsiva
        imgPreview.appendChild(imgElement); // Añadir la imagen al contenedor
    }
});

// Función para manejar el formulario y agregar una receta
document.getElementById('form-receta').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const ingredientes = document.getElementById('ingredientes').value;
    const pasos = document.getElementById('pasos').value;
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').files[0]; // Imagen seleccionada

    // Comprobar si hay una imagen seleccionada
    if (!imagen) {
        alert("Por favor, selecciona una imagen para la receta.");
        return;
    }

    // Crear una card para la receta
    const recetaCard = document.createElement('div');
    recetaCard.classList.add('col-md-4', 'mb-4');
    recetaCard.innerHTML = `
        <div class="card">
            <img src="${URL.createObjectURL(imagen)}" class="card-img-top" alt="Receta">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text"><strong>Ingredientes:</strong> ${ingredientes}</p>
                <p class="card-text"><strong>Pasos:</strong> ${pasos}</p>
                <p class="card-text"><strong>Categoría:</strong> ${categoria}</p>
            </div>
        </div>
    `;

    // Añadir la receta a la lista de recetas
    const listaRecetas = document.getElementById('lista-recetas');
    listaRecetas.appendChild(recetaCard);

    // Limpiar el formulario
    document.getElementById('form-receta').reset();
    document.getElementById('imagen-preview').innerHTML = '';  // Limpiar la vista previa de la imagen
});
