<template>
  <q-dialog v-model="visible" @hide="onHide" position="right" :maximized="$q.platform.is.mobile" seamless>
    <q-card class="main-card q-pa-lg">
      <q-card-section class="">
        <div class="row">
          <div class="col-1 text-left q-pt-sm">
            <q-icon name="account_circle" style="font-size: 35px" />
          </div>
          <div class="col-8 q-pl-sm">
            <div class="text-h6">{{ character.name }}</div>
            <div class="text-subtitle1 text-grey-7">Culture {{ character.culture }}</div>
          </div>
          <div class="col text-right">
            <q-btn class="" icon="close" flat round @click="visible=false" />
          </div>
        </div>
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
        <div class="text-h6">{{ character.father }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Mother</div>
        <div class="text-h6">{{ character.mother }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Spouse</div>
        <div class="text-h6">{{ character.spouse }}</div>      
      </q-card-section>

      <q-card-section class="">
        <div class="text-subtitle1 text-grey-7">Allegiances</div>
        <div class="text-h6" v-for="item in character.allegiances" :key="item">
          {{ item }}
        </div>
      </q-card-section>                        
    </q-card>
  </q-dialog>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import Character from 'src/models/Character'
import { Watch } from 'vue-property-decorator'

@Options({})
export default class CaracterDetailsPage extends Vue {
  visible = false
  character = null

  onHide () {
    this.$router.go(-1)
  }

  @Watch('$route') onRouteChange () {
    console.log('Will load character')
  }

  async mounted () {
    this.character = await Character.find(this.$route.params.characterId)
    this.visible = true
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