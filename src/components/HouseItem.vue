<template>
  <q-card
    class="house-card q-ma-md bg-secondary text-white cursor-pointer"
  >
    <q-card-section>
      <div class="text-h6">{{ house.name }}</div>
      <div class="text-subtitle2">Región: {{ house.region }}</div>
      <div class="text-subtitle2">Words: {{ house.words }}</div>      
      <div class="text-subtitle2">
        Lord: {{ 'Load current Lord Name' }}
      </div>      
    </q-card-section>
  </q-card>
</template>

<script>
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import House from 'src/models/House'

export default class HouseItem extends Vue {
  @Prop({ type: House, required: true }) house
}
</script>

<style lang="sass" scoped>
.house-card
  width: 100%
  max-width: 380px
</style>
