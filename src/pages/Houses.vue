<template>
  <q-layout view="lHh lpr lFf" container class="bg-blue-grey-12 window-height back-page">
    <q-header class="bg-blue-grey-12">
      <div class="row">
          <div class="col col-md-6 col-sm-12 col-xs-12" style="padding: 40px 75px 0 70px">
            <div class="text-h3 q-mt-sm text-dark">Game Of Thrones's Houses</div>
            <div class="text-h6 text-black">Lista de las casas nobiliarias que aparecen en la saga de libros Canción de hielo y fuego</div>
          </div>

          <div class="col col-md-6 col-sm-12 col-xs-12 text-right" style="padding: 40px 75px 0 70px">
            <q-toolbar>
              <q-space />
              <q-input color="grey-2" v-model="filterText" outlined icon="search" dense style="width: 250px" @keyup.enter="search">
                <template #prepend>
                  <q-icon name="search" color="grey-2" />
                </template>
              </q-input>

              <q-select
                color="dark"
                class="q-ml-sm"
                outlined
                dense
                v-model="filterTextField"
                :rounded="false"
                :options="['name', 'region', 'words']"
              />
            </q-toolbar>
          </div>
      </div>

    </q-header>

    <q-page-container>

      <q-infinite-scroll ref="infinitScroll" @load="getHouses" :offset="250" class="row justify-center">
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

      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import House from 'src/models/House'
import HouseItem from 'components/HouseItem.vue'
import { Watch } from 'vue-property-decorator'

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

  filterText = ''
  filterTextField = 'name'

  @Watch('filterTextField') onFilterTextFieldChange () {
    this.search()
  }

  // Get the list of houses from API, indicating the page number.
  async getHouses (pageNumber, done) {
    let QueryBuilder = House

    if (this.filterText.length > 0) {
      QueryBuilder = QueryBuilder.where(this.filterTextField, this.filterText) 
    }

    const houses = await QueryBuilder.page(pageNumber).get()
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

  search (e) {
    if (this.filterText.length > 0) {
      this.pageNumber = 1
      this.houseList = []
      this.getHouses(this.pageNumber, () => {})
    }
  }
}
</script>

<style lang="sass" scoped>
@media screen and (min-width: 1024px)
  .text-h3
    font-size: 3rem

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px)
  .text-h3
    font-size: 2rem

  .text-h6
    font-size: .9rem
    font-weight: bold    

.back-page
  padding-left: 40px
  padding-right: 40px

</style>