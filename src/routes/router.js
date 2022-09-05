import { PATHS } from "./routes"

class Router {

  #contentViewer

  constructor() {
    console.log('Router.constructor()')
  }
  
  initRouter(div){
    console.log('Router.initRouter()')
    this.#contentViewer = div
    const {location: { pathname = '/',}} = window
    const URL = pathname === '/' ? 'home': pathname.replace('/', '')
    this.load(URL)
  }

  load(url){
    console.log('Router.load()', {url})
    if (PATHS[url] === undefined){
      url = 'error'
    }
    const { path, urlTag, tag } = PATHS[url]
    import(urlTag).then(module => module)
    window.history.pushState({}, 'done', path)
    this.#contentViewer.innerHTML = tag
  }
}

const ROUTER = new Router()

export default ROUTER