

// Para actualizar el año actual y la fecha de la última modificación
let d = new Date();
document.getElementById("currentYear").innerHTML = `&copy;${d.getFullYear()}`;
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Función para alternar clases 'show' (para el menú y el título)
const hambutton = document.querySelector('#hambutton');

hambutton.addEventListener('click', () => {
  document.querySelector('h1').classList.toggle('show');
  document.querySelector('#navmenu').classList.toggle('show');
  hambutton.classList.toggle('show');
});

// Función para manejar el menú de enlaces
const menuLinks = document.querySelectorAll('#navmenu a');

// Agregar el evento click y touchstart a cada enlace
menuLinks.forEach(link => {
  // Manejar el evento click (en escritorio)
  link.addEventListener('click', function(event) {
    toggleActive(this); // Cambiar el estado del enlace
    event.preventDefault(); // Evitar el comportamiento por defecto
  });

  // Manejar el evento touchstart (en dispositivos táctiles)
  link.addEventListener('touchstart', function(event) {
    toggleActive(this); // Cambiar el estado del enlace
  });
});

// Función para alternar la clase "active" en los enlaces
function toggleActive(element) {
  element.classList.toggle("active");
}




