import Model from './Model'

export default class House extends Model {

  // url para lectura de datos sobre casas de GOT, Ver [https://anapioficeandfire.com/Documentation#houses]
  resource() {
    return '/houses'
  }
}
