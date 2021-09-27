<template>
  <q-dialog v-model="visible" @hide="onHide" position="right" :maximized="$q.platform.is.mobile" :seamless="seamless">
    <q-card class="main-card q-pa-lg">
      <q-card-section class="">
        <div class="row">
          <div class="col-1 text-left q-pt-sm">
            <q-icon name="account_circle" style="font-size: 35px" />
          </div>
          <div class="col-8 q-pl-sm">
            <div class="text-h6">{{ character.name }}</div>
            <div class="text-subtitle1 text-grey-7">{{ extraInfo }}</div>
          </div>
          <div class="col text-right">
            <q-btn class="" icon="close" flat round @click="visible=false" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Culture</div>
        <div class="text-h6">{{ character.culture }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Gender</div>
        <div class="text-h6">{{ character.gender }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Born</div>
        <div class="text-h6">{{ character.born }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Died</div>
        <div class="text-h6">{{ character.died }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Titles</div>
        <div class="text-h6" v-for="title in character.titles" :key="title">
          {{ title }}
        </div>
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Aliasses</div>
        <div class="text-h6">{{ character.aliasses }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Father</div>
        <character-name
          class="text-h6"
          :url="character.father"
          @name-clicked="(characterToShow) => showCharacterDetails(`${ character.name }'s Father`, characterToShow)"
        />
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Mother</div>
        <character-name
          class="text-h6"
          :url="character.mother"
          @name-clicked="(characterToShow) => showCharacterDetails(`${ character.name }'s Mother`, characterToShow)"
        />
      </q-card-section>

      <q-card-section class="" v-if="character.spouse">
        <div class="text-subtitle1 text-grey-7">Spouse</div>
        <character-name
          class="text-h6"
          rel="spouse"
          :url="character.spouse"
          @name-clicked="(characterToShow) => showCharacterDetails(`${ character.name }'s Spouse`, characterToShow)"
        />
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Allegiances</div>
        <div class="text-h6" v-for="allegiance in character.allegiances" :key="allegiance">
        <character-name
          class="text-h6"
          :url="allegiance"
          @name-clicked="(characterToShow) => showCharacterDetails(`Allegiance of Lord ${ character.name }'`, characterToShow)"
        />
        </div>
      </q-card-section>              
    </q-card>
  </q-dialog>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import Character from 'src/models/Character'
import { Watch } from 'vue-property-decorator'
import CharacterName from 'src/components/CharacterName'

@Options({
  components: { CharacterName }
})
export default class CharacterDetailsPage extends Vue {
  // Es la variable para cerrar o abrir el Dialog
  visible = false

  // Variable de tipo Character[src/models/Character] 
  character = null

  // Variable para manejar si el Dialog es modal o no.
  // Ver [https://quasar.dev/vue-components/dialog#qdialog-api] pestaña 'Content'
  seamless = true

  // Variable para guardar información extra sobre el Character
  // Ejemplo: Lord of House Algood. Dellonne Allyrion's Mother
  extraInfo = ''

  onHide () {
    this.$router.go(-1)
  }

  @Watch('$route') onRouteChange () {
    console.log('Will load character', this.$route.name)
    /* if (this.$route.params.characterId) {
      this.init()
    } */
  }

  // Mostrar los detalles del character.
  showCharacterDetails (extraInfo, character) {
    this.extraInfo = extraInfo
    this.character = character
  }

  // Acciones al montarse la página o al cambiar de character
  async init () {
    this.character = await Character.find(this.$route.params.characterId)
    this.seamless = this.$route.name === 'CharacterDetails'
    this.extraInfo = this.$route.query.extraInfo || ''
    this.visible = true
  }

  async mounted () {
    await this.init()
  }
}
</script>
<style lang="sass" scoped>
.q-dialog__inner--minimized > div
  max-width: 600px
  min-width: 600px
  margin-right: 50px

.main-card
  height: calc(100vh - 50px)
</style>