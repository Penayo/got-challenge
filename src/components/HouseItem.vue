<template>
  <q-card
    square
    class="house-card q-ma-lg cursor-pointer text-grey-3"
  >
    <q-card-section>
      <div class="text-h6">{{ house.name }}</div>
    </q-card-section>

    <q-separator class="bg-grey-3" />

    <q-card-section>
      <div class="text-subtitle2 text-grey-4">Región: {{ house.region }}</div>
      <div class="text-subtitle2 text-grey-4">Words: {{ house.words }}</div>      
      <div class="text-subtitle2 text-grey-3">
        Current Lord:
        <character-name
          class="text-grey-3"
          :url="house.currentLord"
          @name-clicked="(character) => showCharacterDetails(character, `Current Lord of ${house.name}`)"
        />
      </div>      
    </q-card-section>
  </q-card>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import House from 'src/models/House'
import CharacterName from 'components/CharacterName.vue'

@Options({
  components: { CharacterName }
})
export default class HouseItem extends Vue {
  @Prop({ type: House, required: true }) house

  // Mostrar los detalles del character.
  showCharacterDetails (character, extraInfo) {
    console.log('Ha upei?', character)
    this.$router.push({
      name: 'HouseCharacterDetails',
      params: { characterId: character.id },
      query: { extraInfo: extraInfo }
    })
  }  
}
</script>

<style lang="sass" scoped>
.house-card
  width: 100%
  max-width: 380px
  background: rgba(0,0,0, .7)
</style>
