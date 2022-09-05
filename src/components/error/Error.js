import CustomElement from "/templates/CustomElement.js";  

class Error extends CustomElement {

  constructor() {
    super('/components/error/error.html')
    this.init()
  }

  __onload() {
  }

  init() {
  
  }

}

customElements.define('app-error', Error)