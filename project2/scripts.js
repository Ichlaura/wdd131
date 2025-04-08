// Manejo del Carrito de Compras
const carrito = [];

document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        const producto = e.target.parentElement;
        const nombre = producto.querySelector('p').textContent;
        carrito.push(nombre);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${nombre} agregado al carrito`);
    });
});

// Validación del Formulario de Contacto
document.getElementById('form-contacto').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        alert('Mensaje enviado correctamente');
        // Aquí podrías agregar el código para enviar el formulario a un servidor
    } else {
        alert('Por favor completa todos los campos');
    }
});
