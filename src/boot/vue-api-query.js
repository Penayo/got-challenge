import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Model } from 'vue-api-query'

export default boot(() => {
  Model.$http = axios
})

export { Model }
