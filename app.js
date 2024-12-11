        // Arreglo donde se almacenan las recetas
        const recetas = [];

        // Referencias al DOM
        //se las trae del HTML porque más adelante va a usar 
        const formReceta = document.getElementById('form-receta');
        const listaRecetas = document.getElementById('lista-recetas');
        const buscador = document.getElementById('buscador');

        // Función para renderizar recetas en el DOM
        function mostrarRecetas(filtradas = recetas) {
            listaRecetas.innerHTML = '';

            //ciclo que recorre todas las recetas y las guarda en el arreglo de objetos
            filtradas.forEach((receta, i) => {
                //le había puesto la i.a.   index a la variable la reemplacé por i, que es un convencionalismo bastante usuarl
                const recetaHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${receta.imagen}" class="card-img-top" alt="${receta.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${receta.nombre}</h5>
                                <p><strong>Ingredientes:</strong> ${receta.ingredientes.join(', ')}</p>
                                <p><strong>Pasos:</strong> ${receta.pasos.join(', ')}</p>
                                <p><strong>Categoría:</strong> ${receta.categoria}</p>
                                <button class="btn btn-danger" onclick="eliminarReceta(${index})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                `;
                //agrega html a la lista
                listaRecetas.insertAdjacentHTML('beforeend', recetaHTML);
            });
        }

        // Escuchamos el evento submit del formulario
        formReceta.addEventListener('submit', (e) => {
            //prevenimos la acción predeterminada del navegador
            e.preventDefault();
            //guardamos nueva receta como objeto en la constante
            const nuevaReceta = {
                //propiedades del objeto
                nombre: document.getElementById('nombre').value,
                //separamos los ingredientes por comas y los pasos por punto y coma para tenerlos como elementos individuales en el array
                ingredientes: document.getElementById('ingredientes').value.split(','),
                pasos: document.getElementById('pasos').value.split(','),
                categoria: document.getElementById('categoria').value,
                imagen: document.getElementById('imagen').value
            };
            //hacemos push de la nueva receta que tenemos en el objeto a el array de recetas
            recetas.push(nuevaReceta);
            //llamamos a la función que renderiza las recetas
            mostrarRecetas();
            //limpiamos el formulario
            formReceta.reset();
        });

        // Función para eliminar receta
        function eliminarReceta(index) {
            //se elimina la receta del array
            recetas.splice(index, 1);
            //se llama a la función para renderizar con la actualización del array
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
        //Llamamos a la función para renderizar al inicio con el array vacío

        mostrarRecetas();