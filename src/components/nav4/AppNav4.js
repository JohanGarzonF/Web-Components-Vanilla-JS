import CustomElement from '/templates/CustomElement.js'
import ServiceApi from '/services/ServiceApi.js';

class AppNav4 extends CustomElement {

  #inputSearch;
  #timer;

  constructor() {
    super('/components/nav4/nav4.html')
    this.init()
  }

  printFiltered(filtered) {
    const container = this.shadowRoot.getElementById('container')
    container.innerHTML = filtered.map(country => `<li class='list'>${country.name}</li>`).join('')
  }

  search() {
    if (this.#inputSearch.value !== '') {
      clearTimeout(this.#timer)
      this.#timer = setTimeout(async () => {
        const res = await ServiceApi.getCountries()
        const filtered = res.filter(country => country.name.toLowerCase().includes(this.#inputSearch.value.toLowerCase()))
        this.printFiltered(filtered)
      }, 500)
    }
  }

  initEvent() {
    this.#inputSearch = this.shadowRoot.getElementById('searchCountry')
    //* El metodo bind() permite que al hacer referencia a la clase no inhabilite el this del metodo ejecutado, en este caso this.search
    this.#inputSearch.addEventListener('keyup', this.search.bind(this))
  }

  __onload() {
    this.initEvent()
  }

  init() {
    this.#inputSearch = null
    this.#timer = null
  }

}


customElements.define('app-nav4', AppNav4)

// //? Se extiende de la clase de HTMLElement
// export class AppNav4 extends HTMLElement {
//   //? Se crean las propiedades
//   #inputSearch;
//   #timer;
//   html = async () =>{
//     const response = await fetch('/components/nav4/nav4.html')
//     const result = await response.text()
//     return result
//   }
//   //? Constructor ejecuta la clase, inicializa las propiedades que estan declaradas en null en método init
//   constructor() {
//     super()
//     //* si indicamos attachShadow en open el elemento en el que creamos el Shadow DOM tendrá una propiedad .shadowRoot por la cuál se puede acceder al shadowroot del elemento, y a partir de ahí, al árbol DOM que contiene.
//     this.attachShadow({mode: 'open'})
//     this.init()
//   }
//   //* Cuando se carga el componente se ejecuta connectedCallback
//   connectedCallback(){
//     this.render()
//   }
//   //? Mapeo los elementos que coinciden con la busqueda y aplico el join para enviar como texto plano
//   printFiltered(filtered){
//     const container = this.shadowRoot.getElementById('container')
//     container.innerHTML = filtered.map(country => `<li class='list'>${country.name}</li>`).join('')
//   }
//   //? El search contiene la funcion del addEventLisener (initEvent) y el llamado a la clase que contiene el request a la api el cual es filtrado y enviado a PrintFiltered 
//   search(){
//     if(this.#inputSearch.value !== ''){
//       clearTimeout(this.#timer)
//       this.#timer = setTimeout( async () => {
//         const res = await ServiceApi.getCountries()
//         const filtered = res.filter(country => country.name.toLowerCase().includes(this.#inputSearch.value.toLowerCase()))
//         this.printFiltered(filtered)
//       }, 500)
//     }
//   }
//   //? Aquí asignamos a una propiedad privada el input y escuchamos el evento 
//   initEvent() {
//     this.#inputSearch = this.shadowRoot.getElementById('searchCountry')
//     //* El metodo bind() permite que al hacer referencia a la clase no inhabilite el this del metodo ejecutado, en este caso this.search
//     this.#inputSearch.addEventListener('keyup', this.search.bind(this))
//   }
//   //? el metodo render imprime en el html principal el html del componente haciendo referencia al shadowRoot
//   async render() {
//     this.shadowRoot.innerHTML = await this.html()
//     this.onload()
//   }

//   onload() {
//     this.initEvent()
//   }

//   init() {
//     this.#inputSearch = null
//     this.#timer = null
//   }
// }