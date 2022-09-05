import CustomElement from "/templates/CustomElement.js";
import ServiceApi from "/services/ServiceApi.js"


class Home extends CustomElement {

  constructor() {
    super('/components/home/home.html')
    this.init()
  }

  __onload() {
  }

  init() {
  
  }

}

customElements.define('app-home', Home)