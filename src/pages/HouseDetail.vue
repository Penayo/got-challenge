<template>
  <q-dialog v-model="visible" @hide="onHide" :maximized="$q.platform.is.mobile">
    <q-card class="main-card q-pa-lg">
      <q-card-section class="q-pt-lg q-pl-lg">
        <div class="row">
          <div class="col-10">
            <div class="text-h4 q-mt-lg">{{ house.name }}</div>
            <div class="text-h6 text-grey-7">{{ house.words }}</div>
          </div>
          <div class="col text-right">
            <q-btn class="q-mt-lg" icon="close" flat round @click="visible=false" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pl-lg">
        <div class="text-h5 q-mt-md">Región {{ house.region }}</div>
        <div class="text-subtitle1 text-grey-7">{{ house.coatOfArms }}</div>
      </q-card-section>
      
      <q-card-section class="q-pl-lg">
        <div class="text-h6">Current Lord <character-name :url="house.currentLord" /></div>
        <div class="text-h6 q-mt-md">Heir <character-name :url="house.heir" /></div>
        <div class="text-h6 q-mt-md">Over Lord <character-name :url="house.overlord" /></div>
      </q-card-section>

      <q-card-section class="q-pl-lg">
        <div class="text-h6">Founder: <character-name :url="house.founder" /></div>
        <div class="text-h6">Founded: {{ house.founded }}</div>        
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import House from 'src/models/House'
import CharacterName from 'src/components/CharacterName'

@Options({
  components: { CharacterName }
})
export default class HouseDetailPage extends Vue {
  visible = false
  house = null

  onHide () {
    this.$router.go(-1)
  }

  async mounted () {
    this.house = await House.find(this.$route.params.id)
    this.visible = true
  }
}
</script>
<style lang="sass" scoped>
.q-dialog__inner--minimized > div
  max-width: calc(100vw - 400px)
  min-width: calc(100vw - 400px)

.main-card
  height: calc(100vh - 150px)
</style>