import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {

  // URL Base de la REST-API. Ver [https://anapioficeandfire.com/Documentation#root]
  baseURL() {
    return 'https://www.anapioficeandfire.com/api'
  }

  // Implement a default request method
  request(config) {
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