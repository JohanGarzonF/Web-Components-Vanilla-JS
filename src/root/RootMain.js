import '/components/mainNav/MainNav.js'
import CustomElement from '/templates/CustomElement.js'
import ROUTER from '/routes/router.js'

class RootMain extends CustomElement {

  #div

  constructor() {
    console.log('constructor.RootMain')
    super('/root/rootMain.html')
  }

  
  __onload() {
    this.#div = this.shadowRoot.getElementById('content')
    ROUTER.initRouter(this.#div)
  }

}

customElements.define('root-main', RootMain)