import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {

  // URL Base de la REST-API. Ver [https://anapioficeandfire.com/Documentation#root]
  baseURL() {
    return 'https://www.anapioficeandfire.com/api'
  }

  // Implement a default request method
  request(config) {

    // La API recibe los filtros directo en el query,
    // por eso es necesario cambiar desde "filter" al query
    // es la manera mas rápida que encontre
    config.url = config.url.replace('filter[name]', 'name')
    config.url = config.url.replace('filter[region]', 'region')    
    config.url = config.url.replace('filter[words]', 'words')
    
    return this.$http.request(config)
  }

  // Sobreescribe los nombre de los parametros ennviados en el query del request,
  // para enviar acorde a la documentación de la API.
  // Ver [https://anapioficeandfire.com/Documentation#pagination]
  parameterNames() {
    const defaultParams = super.parameterNames()
    const customParams = {
      limit: 'pageSize'
    }

    return { ...defaultParams, ...customParams }
  }
}