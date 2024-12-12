console.log("Iniciando Script");
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos el input de archivo y el contenedor de la vista previa
    const inputImagen = document.getElementById('imagen');
    const contenedorPreview = document.getElementById('imagen-preview');

    // Evento para mostrar la imagen seleccionada en el input
    inputImagen.addEventListener('change', function() {
        const file = inputImagen.files[0];
        console.log("Archivo seleccionado:", file);

        if (file) {
            // Crear un objeto FileReader para leer el archivo
            const reader = new FileReader();

            // Definir qué hacer cuando la imagen se ha leído
            reader.onload = function(e) {
                console.log("Imagen cargada con éxito", e.target.result);

                // Crear un elemento de imagen para la vista previa
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result; // Usar el resultado leído (data URL)
                imgElement.classList.add('img-fluid');
                imgElement.alt = 'Vista previa de la imagen';

                // Limpiar el contenedor de la vista previa antes de agregar la nueva imagen
                contenedorPreview.innerHTML = '';

                // Agregar la imagen al contenedor de la vista previa
                contenedorPreview.appendChild(imgElement);

                // Subir la imagen a Imgur
                uploadToImgur(file);
            };

            // Leer el archivo como una URL de datos
            reader.readAsDataURL(file);

            console.log("Iniciando la lectura del archivo...");
        } else {
            console.log("No se seleccionó ningún archivo.");
        }
    });

    // Función para subir la imagen a Imgur
    function uploadToImgur(file) {
        const clientId = '4e8de725e3095d2'; // Tu Client ID de Imgur
        const formData = new FormData();
        formData.append('image', file);

        // Enviar la solicitud POST a Imgur
        fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${clientId}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Imagen subida a Imgur:', data);
            // Imprimir la URL de la imagen subida en Imgur
            if (data.success) {
                const imagenUrl = data.data.link;
                console.log('URL de la imagen:', imagenUrl);

                // Mostrar la imagen en la card usando la URL de Imgur
                mostrarImagenEnCard(imagenUrl);
            }
        })
        .catch(error => {
            console.error('Error al subir la imagen a Imgur:', error);
        });
    }

    // Función para mostrar la imagen en la card
    function mostrarImagenEnCard(imagenUrl) {
        // Suponiendo que tienes un contenedor con id 'card-imagen' donde mostrarás la imagen
        const contenedorCard = document.getElementById('card-imagen');

        // Limpiar el contenedor antes de agregar la nueva imagen
        contenedorCard.innerHTML = '';

        // Crear un elemento de imagen y asignar la URL de Imgur
        const imgElement = document.createElement('img');
        imgElement.src = imagenUrl; // Usamos la URL obtenida de Imgur
        imgElement.classList.add('img-fluid');
        imgElement.alt = 'Imagen subida';

        // Agregar la imagen al contenedor de la card
        contenedorCard.appendChild(imgElement);
    }
});
