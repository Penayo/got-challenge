<template>
  <q-dialog v-model="visible" @hide="onHide" :maximized="$q.platform.is.mobile" persistent square>
    <q-card class="main-card q-pa-lg bg-blue-grey-12">
      <q-card-section class="q-pt-lg q-pl-lg">
        <div class="row">
          <div class="col-10">
            <div class="text-h5 q-mt-lg">{{ house.name }}</div>
            <div class="text-h6 text-grey-9">Words: {{ house.words }}</div>
          </div>
          <div class="col text-right">
            <q-btn class="q-mt-lg" icon="close" flat round @click="visible=false" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pl-lg">
        <div class="text-subtitle1 q-mt-md text-grey-7">Región</div> 
        <div class="text-h6"> {{ house.region }}</div>
        <div class="text-subtitle1 q-mt-md text-grey-9">Coat Of Arms</div>        
        <div class="text-h6">{{ house.coatOfArms }}</div>
      </q-card-section>

      <q-card-section class="q-pl-lg">
        <div class="text-subtitle1 text-grey-9">Current Lord</div>
        <character-name
          class="text-h6"
          :url="house.currentLord"
          type="extended"
          @name-clicked="(character) => showCharacterDetails(`Current Lord of ${ house.name }`, character)"
        />

        <div class="text-subtitle1 q-mt-lg text-grey-9">Heir</div>
        <character-name
          class="text-h6"
          :url="house.heir"
          :extraInfo="`Heir of ${ house.name }`"
          @name-clicked="(character) => showCharacterDetails(`Heir of ${ house.name }`, character)"
          type="extended"
        />

        <div class="text-subtitle1 q-mt-lg text-grey-9">Over Lord</div>
        <character-name
          class="text-h6"
          :url="house.overlord"
          @name-clicked="(character) => showCharacterDetails(`Over Lord of ${ house.name }`, character)"
          type="extended"
        />
      </q-card-section>

      <q-card-section class="q-pl-lg">
        <div class="text-subtitle1 text-grey-9">Founder</div>
        <character-name
          class="text-h6"
          :url="house.founder"
          type="extended"
          @name-clicked="(character) => showCharacterDetails(`Founder of ${ house.name }`, character)"
        />

        <div class="text-subtitle1 q-mt-lg text-grey-9">Founded</div>
        <div class="text-h6">{{ house.founded }}</div>
      </q-card-section>
    </q-card>

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>

  </q-dialog>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import House from 'src/models/House'
import CharacterName from 'src/components/CharacterName'

@Options({
  components: { CharacterName }
})
export default class HouseDetailsPage extends Vue {
  visible = false
  house = null

  onHide () {
    this.$router.go(-1)
  }

  // Mostrar los detalles del character.
  showCharacterDetails (extraInfo, character) {
    this.$router.push({
      name: 'CharacterDetails',
      params: { characterId: character.id },
      query: { extraInfo: extraInfo }
    })
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