

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

const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Fukuoka Japan",
        location: "Fukuoka, Japan",
        dedicated: "2000, June, 11",
        area: 10700,
       
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/800x500/fukuoka-japan-temple-lds-306863-wallpaper.jpg"
      },
   
      {
        templeName: "San Salvador El Salvador",
        location: "San Salvador, El Salvador",
        dedicated: "2011, August, 21",
        area: 27000,
       
        imageUrl: "https://www.churchofjesuschrist.org/imgs/0a5ff56bebe2492e8c1e7ca797d461fff8fdac1a/full/500%2C/0/default"
      },
      {
        templeName: "Paris France",
        location: "Paris, France",
        dedicated: "2017, May, 21",
        area: 44000,
       
        imageUrl: "https://www.churchofjesuschrist.org/imgs/5ec026c4efeaaa19a98e40f0f1b4c6069ae63517/full/1280%2C/0/default"
      }
];

// Función para mostrar las tarjetas de templos
function displayTemples(templesArray) {
    const container = document.querySelector('.res-grid'); // Contenedor donde se insertarán
    
    // Limpiar el contenedor primero
    container.innerHTML = '';
  
    // Recorrer cada templo en el array
    templesArray.forEach(temple => {
      // Crear elementos HTML
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
      const name = document.createElement('h3');
      const location = document.createElement('p');
      const dedication = document.createElement('p');
      const area = document.createElement('p');
  
      // Configurar la imagen
      img.src = temple.imageUrl;
      img.alt = temple.templeName; // Alt descriptivo
      img.loading = 'lazy'; // Carga diferida nativa
  
      // Configurar los textos
      name.textContent = temple.templeName;
      location.textContent = `📍 ${temple.location}`;
      dedication.textContent = `⛪ Dedicado: ${temple.dedicated}`;
      area.textContent = `📏 Área: ${temple.area.toLocaleString()} sq ft`; // Formato con separadores de miles
  
      // Ensamblar la estructura
      figcaption.appendChild(name);
      figcaption.appendChild(location);
      figcaption.appendChild(dedication);
      figcaption.appendChild(area);
      
      figure.appendChild(img);
      figure.appendChild(figcaption);
  
      // Agregar al contenedor
      container.appendChild(figure);
    });
  }
  
  // Ejemplo de uso (al cargar la página o al aplicar filtros)
  document.addEventListener('DOMContentLoaded', () => {
    displayTemples(temples); // Muestra todos los templos inicialmente
  });

  function filterOld() {
    const oldTemples = temples.filter(temple => {
      const year = parseInt(temple.dedicated.split(',')[0]);
      return year < 1900;
    });
    displayTemples(oldTemples); // Mostrar solo templos antiguos
  }

// FUNCIONES DE FILTRO ÚNICAS (elimina las duplicadas)
function filterOld() {
    document.querySelectorAll('#navmenu a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
    
    const oldTemples = temples.filter(temple => {
      const year = parseInt(temple.dedicated.split(',')[0]);
      return year < 1900;
    });
    displayTemples(oldTemples);
    document.querySelector('h2').textContent = 'Old Temples (Before 1900)';
  }

  img.onerror = function() {
    this.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
    this.alt = 'Imagen no disponible';
  };



  // menu 

  // Función para filtrar templos antiguos (antes de 1900)
function filterOld() {
    const oldTemples = temples.filter(temple => {
      const year = parseInt(temple.dedicated.split(',')[0]);
      return year < 1900;
    });
    displayTemples(oldTemples);
    document.querySelector('h2').textContent = 'Old Temples (Before 1900)';
  }
  
  // Función para filtrar templos nuevos (después de 2000)
  function filterNew() {
    const newTemples = temples.filter(temple => {
      const year = parseInt(temple.dedicated.split(',')[0]);
      return year > 2000;
    });
    displayTemples(newTemples);
    document.querySelector('h2').textContent = 'New Temples (After 2000)';
  }
  
  // Función para filtrar templos grandes (>90,000 sq ft)
  function filterLarge() {
    const largeTemples = temples.filter(temple => temple.area > 90000);
    displayTemples(largeTemples);
    document.querySelector('h2').textContent = 'Large Temples (>90,000 sq ft)';
  }
  
  // Función para filtrar templos pequeños (<10,000 sq ft)
  function filterSmall() {
    const smallTemples = temples.filter(temple => temple.area < 10000);
    displayTemples(smallTemples);
    document.querySelector('h2').textContent = 'Small Temples (<10,000 sq ft)';
  }
  
  // Función para mostrar todos los templos
  function filterHome() {
    displayTemples(temples);
    document.querySelector('h2').textContent = 'All Temples';
  }