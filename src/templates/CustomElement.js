export default class CustomElement extends HTMLElement {
  #url
  constructor(url) {
    super()
    this.#url = url
  }
  connectedCallback() {
    this.__render()
  }
  async __render(){
    this.attachShadow({mode: 'open'})
    const response = await fetch(this.#url)
    const result = await response.text()
    this.shadowRoot.innerHTML = result
    this.__onload()
  }
}

