<template>
  <q-page class="q-pa-lg">
    <div class="row q-pa-sm">
      <div class="col-6 q-pt-lg">
        <div class="text-h3">Casas de Game Of Thrones</div>
        <div class="text-h6">Lista de las casas nobiliarias que aparecen en la saga de libros Canción de hielo y fuego</div>
      </div>
      <div class="col">
      </div>
    </div>

    <q-infinite-scroll @load="getHouses" :offset="250" class="row items-start">
      <house-item
        v-for="(house, index) in houseList"
        :key="index"
        :house="house"
        @click="$router.push({ name: 'HouseDetail', params: { id: getIdFromURL(house.url) } })"
      />

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <router-view />
  </q-page>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import House from 'src/models/House'
import HouseItem from 'components/HouseItem.vue'

@Options({
  components: { HouseItem }
})
export default class HousesPage extends Vue {
  items = []
  // The list of GOT Houses
  houseList = []

  // Used to indicate when no more page for load. 
  // false value mean continue loading
  // true value mean no more page for load.
  lastPage = false

  // The selected house
  selectedHouse = null

  // Get the list of houses from API, indicating the page number.
  async getHouses (pageNumber, done) {
    const houses = await House.page(pageNumber).get()
    if (houses.length > 0) {
      this.houseList = this.houseList.concat(houses)
      console.log({ houseList: this.houseList })
    } else {
      this.lastPage = true
    }
    done()
  }

  getIdFromURL (url) {
    const urlSplited = url.split('/')
    return urlSplited[urlSplited.length -1]
  }  
}
</script>

<style lang="sass" scoped>
.q-page
  padding-left: 40px
  padding-right: 40px
</style>