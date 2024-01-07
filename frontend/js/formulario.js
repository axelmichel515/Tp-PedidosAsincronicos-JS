window.onload = async () => {
    let query = new URLSearchParams(location.search);
    const movieId = query.get('movie');

    try {
        // Obtener detalles de la película para cargar en el formulario
        const response = await fetch(`http://localhost:3031/api/movies/${movieId}`);
        const movieData = await response.json();
        
        // Cargar los datos en el formulario
        document.querySelector('#title').value = movieData.data.title || '';
        document.querySelector('#rating').value = parseFloat(movieData.data.rating) || 0;
        document.querySelector('#awards').value = movieData.data.awards || 0;
        document.querySelector('#release_date').value = (movieData.data.release_date) ? new Date(movieData.data.release_date).toISOString().split('T')[0] : '';
        document.querySelector('#length').value = movieData.data.length || 0;

        // Agregar evento para manejar la actualización de datos
        document.querySelector('.formulario').addEventListener('submit', async (event) => {
            event.preventDefault();

            // Obtener los valores actualizados del formulario
            const updatedData = {
                title: document.querySelector('#title').value,
                rating: parseFloat(document.querySelector('#rating').value),
                awards: parseInt(document.querySelector('#awards').value),
                release_date: document.querySelector('#release_date').value,
                length: parseInt(document.querySelector('#length').value)
            };

            try {
                // Realizar una solicitud PUT para actualizar los datos en la API
                const updateResponse = await fetch(`http://localhost:3031/api/movies/update/${movieId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });

                if (updateResponse.ok) {
                    
                } else {
                    console.log('Error al actualizar datos');
                }
            } catch (error) {
                console.error('Hubo un problema al actualizar los datos:', error);
            }
        });

        // Agregar evento para manejar la eliminación de la película
        document.querySelector('#deleteButton').addEventListener('click', async () => {
            try {
                
                // Realizar una solicitud DELETE para eliminar la película
                const deleteResponse = await fetch(`http://localhost:3031/api/movies/delete/${movieId}`, {
                    method: 'DELETE'
                });

                if (deleteResponse.ok) {
                    confirm('Desea eliminar esta pelicula?');
                    alert('¡Película eliminada correctamente!');
                } else {
                    console.log('Error al eliminar la película');
                }
            } catch (error) {
                console.error('Hubo un problema al eliminar la película:', error);
            }
        });

        // Agregar evento para manejar la creación de una nueva película
        document.querySelector('#createButton').addEventListener('click', async (event) => {
            event.preventDefault()
            event.target.disabled = true;
            // Datos para crear una nueva película (puedes obtenerlos del formulario)
            const title = document.querySelector('#title').value;
            const rating = parseFloat(document.querySelector('#rating').value);
            const awards = parseInt(document.querySelector('#awards').value);
            const release_date = document.querySelector('#release_date').value;
            const length = parseInt(document.querySelector('#length').value);



            const newData = {
                title,
                rating,
                awards,
                release_date,
                length
                // Agrega aquí los campos y valores que desees para la nueva película
            };

            try {
                // Realizar una solicitud POST para crear una nueva película
                const createResponse = await fetch(`http://localhost:3031/api/movies/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                });

                if (createResponse.ok) {
                    alert('¡Nueva película creada correctamente!');
                    // Podrías mostrar un mensaje o realizar alguna otra acción después de la creación exitosa
                } else {
                    console.log('Error al crear la nueva película');
                }
            } catch (error) {
                console.error('Hubo un problema al crear la nueva película:', error);
            }
        });

    } catch (error) {
        console.log(error);
    }
}
