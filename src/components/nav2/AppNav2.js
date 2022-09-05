import CustomElement from '/templates/CustomElement.js'
import ServiceApi from '/services/ServiceApi.js';

class AppNav2 extends CustomElement {

  #inputSearch;
  #timer;

  constructor() {
    super('/components/nav2/nav.html')
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

customElements.define('app-nav2', AppNav2)



// `
//       <link rel='stylesheet' href='./components/nav/appElement.css'>
//       <header class='header'>
//         <form>
//           <input id='searchCountry' autofocus type='text' placeholder='Type a country' title='search a country'/> 
//         </form>
//       </header>
//     `