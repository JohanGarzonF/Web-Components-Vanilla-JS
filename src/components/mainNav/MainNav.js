import CustomElement from '/templates/CustomElement.js'
import ROUTER from "/routes/router.js "
import { PATHS } from '/routes/routes.js';

class MainNav extends CustomElement {

  #navs = []

  constructor() {
    super('/components/mainNav/mainNav.html')
  }

  routerNav(e) {
    const id = e.srcElement.id
    ROUTER.load(id)
  }

  initEvent() {
    this.list = this.shadowRoot.getElementById('list')
    
    for(const property in PATHS){
      // console.log(PATHS[property])
      if(PATHS[property].menu){
        //? pusheo los elemenentos que tienen menu en true
        this.#navs.push(PATHS[property])
      }
    }
    //? mapeo en un nuevo arreglo los elementos que quiero agregar al dom con id y clase para funcionalidad y diseño
    this.navInner = this.#navs.map(nav => `<li id='${nav.id}' class='${nav.id}'>${nav.title}</li>`)
    console.log('contenido del mapeo que introducirá los li a la lista' ,this.navInner)

    //? Itero sobre el arreglo y por cada elemento agrego al list mi nuevo elemento li
    this.navInner.forEach(navs => this.list.innerHTML += navs)

    this.navEvent = this.shadowRoot.querySelectorAll(`#list li`)

    //? por cada uno de los elementos que contenga la lista #list como li se les añadirá un addEventListener
    this.navEvent.forEach(link => {
      link.addEventListener('click', this.routerNav.bind(this))
    })
  }

  __onload() {
    this.initEvent()
  }

}

customElements.define('main-nav', MainNav)