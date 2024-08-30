const zapatillas = [
  {
    marca: 'Nike Original',
    modelo: 'Air Max 1',
    precio: 120,
    img: './assets/nike1.png'
  },
  {
    marca: 'New Balance',
    modelo: 'NB 9060',
    precio: 80,
    img: './assets/new1.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Nike Revolution',
    precio: 90,
    img: './assets/nike2.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Forum Buckle',
    precio: 100,
    img: './assets/adidas1.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Campus',
    precio: 120,
    img: './assets/adidas2.png'
  },
  {
    marca: 'New Balance',
    modelo: 'NB 327',
    precio: 120,
    img: './assets/new2.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Dunk Low',
    precio: 100,
    img: './assets/nike3.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Gazelle',
    precio: 90,
    img: './assets/adidas3.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Air Max SC',
    precio: 150,
    img: './assets/nike4.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Handball Spezial',
    precio: 120,
    img: './assets/adidas4.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Air Force',
    precio: 130,
    img: './assets/nike5.png'
  },
  {
    marca: 'New Balance',
    modelo: 'NB 9060',
    precio: 100,
    img: './assets/new3.png'
  },
  {
    marca: 'New Balance',
    modelo: 'NB 480',
    precio: 150,
    img: './assets/new4.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Full Force Low',
    precio: 70,
    img: './assets/nike6.png'
  },
  {
    marca: 'Nike Original',
    modelo: 'Air Max SC',
    precio: 160,
    img: './assets/nike7.png'
  },
  {
    marca: 'Adidas Original',
    modelo: 'Handball Spezial',
    precio: 140,
    img: './assets/adidas5.png'
  }
]
let noResultado = false
const MARCAS = []
// Función para llenar el array MARCAS con marcas únicas
const fillMarcas = (zapas) => {
  MARCAS.splice(0)
  for (const zapa of zapas) {
    if (!MARCAS.includes(zapa.marca)) {
      MARCAS.push(zapa.marca)
    }
  }
}

// Llenar MARCAS con las marcas del array zapatillas
fillMarcas(zapatillas)

// Ahora, creamos el HTML del formulario(filtros) con las opciones dinámicas
const containerFiltro = document.querySelector('.container')
const filtroBoton = document.querySelector('.filtroBoton')
let formVisible = false

const generarOpcionesHTML = (marcas) => {
  let opcionesHTML = ''
  for (let i = 0; i < MARCAS.length; i++) {
    let marca = MARCAS[i]
    let optionHTML = '<option value="' + marca + '">' + marca + '</option>'
    opcionesHTML += optionHTML
  }
  return opcionesHTML
}
// Generar las opciones HTML usando la función
const opcionesHTML = generarOpcionesHTML(MARCAS)

let filtrosHTML = `
<form class="no-visible">
  <div class="filtros-cabecera">
    <select id="marca">
      ${opcionesHTML} <!-- Insertar las opciones aquí -->
    </select>
    <input id="precio" placeholder="precio">
    <button type="button" class="botoFiltrar">Filtrar</button>
    <button type="button" class="limpiar">Limpiar</button> 
  </div>
</form>`

// Inserta el formulario en el DOM
containerFiltro.innerHTML += filtrosHTML
// Obtenemos el formulario recién creado
const formFiltros = document.querySelector('.container form')
const botonFiltrar = document.querySelector('.botoFiltrar')
const botonLimpiar = document.querySelector('.limpiar')

const toogleForm = () => {
  if (formVisible) {
    formFiltros.classList.add('no-visible')
    formVisible = false
  } else {
    formFiltros.classList.remove('no-visible')
    formVisible = true
  }
}
//función para pintar las zapatillas en el HTML
const printZapas = (zapas) => {
  const divZapas = document.querySelector('#zapatillas')
  if (noResultado === false) {
    divZapas.innerHTML = ''
    noResultado = true
  }
  for (const zapa of zapas) {
    const divZapa = document.createElement('div')
    const divImg = document.createElement('div')
    const divDatos = document.createElement('div')
    const img = document.createElement('img')
    const marca = document.createElement('h3')
    const modelo = document.createElement('p')
    const precio = document.createElement('p')
    const botonComprar = document.createElement('button')
    divZapa.className = 'flex-container-zapatillas'
    divImg.className = 'imgContainer'
    divDatos.classList.add('datosProducto')
    botonComprar.classList.add('botonComprar')
    modelo.classList.add('modelo')
    precio.classList.add('precio')
    img.src = zapa.img
    marca.textContent = zapa.marca
    modelo.textContent = zapa.modelo
    precio.textContent = `${zapa.precio}€`
    botonComprar.textContent = 'Comprar'

    divZapa.appendChild(divImg)
    divZapa.appendChild(divDatos)
    divImg.appendChild(img)
    divDatos.appendChild(marca)
    divDatos.appendChild(modelo)
    divDatos.appendChild(precio)
    divZapa.appendChild(botonComprar)
    divZapas.appendChild(divZapa)
  }
}
const filtrarZapatillas = () => {
  const marcaSeleccionada = document.querySelector('#marca').value
  const precioSeleccionado = document.querySelector('#precio').value

  let zapatillasFiltradas = []

  for (let i = 0; i < zapatillas.length; i++) {
    let zapa = zapatillas[i]
    let coincideMarca =
      marcaSeleccionada === '' || zapa.marca === marcaSeleccionada
    let coincidePrecio =
      precioSeleccionado === '' || zapa.precio == precioSeleccionado

    if (coincideMarca && coincidePrecio) {
      zapatillasFiltradas.push(zapa)
    }
  }

  const divZapas2 = document.querySelector('#zapatillas')
  divZapas2.innerHTML = ''

  if (zapatillasFiltradas.length === 0) {
    let productosSugeridos = []
    let zapatillasCopia = zapatillas.slice()

    for (let i = 0; i < 3 && zapatillasCopia.length > 0; i++) {
      let indiceAleatorio = Math.floor(Math.random() * zapatillasCopia.length)
      productosSugeridos.push(zapatillasCopia[indiceAleatorio])
      zapatillasCopia.splice(indiceAleatorio, 1)
    }

    const div = document.createElement('div')
    div.style.display = 'flex'
    div.style.flexDirection = 'column'
    div.style.width = '100%'

    const mensaje = document.createElement('p')
    mensaje.textContent =
      'No se han encontrado resultados, pero te mostramos estas sugerencias:'
    mensaje.style.fontWeight = 'bold'
    mensaje.style.marginBottom = '20px'
    mensaje.style.width = '100%'
    mensaje.style.textAlign = 'center'
    div.appendChild(mensaje)

    const sugeridosContainer = document.createElement('div')
    sugeridosContainer.style.display = 'flex'
    sugeridosContainer.style.flexWrap =
      'wrap' /* Permitir que los elementos se envuelvan */
    sugeridosContainer.style.gap = '20px'
    sugeridosContainer.style.justifyContent = 'center'
    sugeridosContainer.style.width = '100%'

    for (const zapa of productosSugeridos) {
      const divZapa = document.createElement('div')
      divZapa.style.flexDirection = 'column'
      divZapa.style.width = '300px'
      divZapa.className = 'flex-container-zapatillas'

      const divImg = document.createElement('div')
      const divDatos = document.createElement('div')
      const img = document.createElement('img')
      const marca = document.createElement('h3')
      const modelo = document.createElement('p')
      const precio = document.createElement('p')
      const botonComprar = document.createElement('button')

      divImg.className = 'imgContainer'
      divDatos.classList.add('datosProducto')
      botonComprar.classList.add('botonComprar')
      modelo.classList.add('modelo')
      precio.classList.add('precio')
      img.src = zapa.img
      marca.textContent = zapa.marca
      modelo.textContent = zapa.modelo
      precio.textContent = `${zapa.precio}€`
      botonComprar.textContent = 'Comprar'

      divZapa.appendChild(divImg)
      divZapa.appendChild(divDatos)
      divImg.appendChild(img)
      divDatos.appendChild(marca)
      divDatos.appendChild(modelo)
      divDatos.appendChild(precio)
      divZapa.appendChild(botonComprar)

      sugeridosContainer.appendChild(divZapa)
    }

    div.appendChild(sugeridosContainer)
    divZapas2.appendChild(div)
  } else {
    printZapas(zapatillasFiltradas)
  }
}

const limpiarFiltro = () => {
  document.querySelector('#marca').value = '' //para resetear los valores de los formularios
  document.querySelector('#precio').value = ''
  const divZapas = document.querySelector('#zapatillas')
  divZapas.innerHTML = ''
  printZapas(zapatillas)
}
//Para cambiar de icono cuando se clicka en el icono del filtro en el menú superior
const filtroBoton2 = document.querySelector('.filtroBoton')
const filtroImagen = filtroBoton.querySelector('.icoFiltro')

filtroBoton.addEventListener('click', () => {
  filtroBoton2.classList.toggle('activo')

  if (filtroBoton2.classList.contains('activo')) {
    // Cambiar la imagen a la versión activa
    filtroImagen.src = './assets/ico_filter_activo.png'
  } else {
    // Volver a la imagen original cuando no está activo
    filtroImagen.src = './assets/ico_filter.png'
  }
})

//llamada a las funciones
printZapas(zapatillas)
filtroBoton.addEventListener('click', toogleForm)
botonFiltrar.addEventListener('click', filtrarZapatillas)
botonLimpiar.addEventListener('click', limpiarFiltro)
