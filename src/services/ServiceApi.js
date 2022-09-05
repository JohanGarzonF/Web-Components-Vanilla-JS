class ServiceApi {
  constructor() {
  }
  async getCountries(){
      const response = await fetch('http://localhost:8000')
      const result = await response.json()
      return result
  }
}

const x = new ServiceApi() 

export default x