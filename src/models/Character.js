import Model from './Model'

export default class Character extends Model {

  // url para lectura de datos sobre casas de GOT, Ver [https://anapioficeandfire.com/Documentation#characters]
  resource() {
    return '/characters'
  }
}
