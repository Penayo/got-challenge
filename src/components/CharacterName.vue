<template>
  <span>
    <q-spinner-dots v-if="!character && url.length > 0" />
    <span v-if="!url || url.length === 0">?</span>
    <q-card class="card-char-name cursor-pointer" flat bordered square v-if="character">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="account_circle" style="font-size: 45px" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ character.name }}</q-item-label>
          <q-item-label caption>
            Culture {{ character.culture }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>    
    <!-- <a
      href="javascript: void(0)"
      color="primary"
      :class="textClass"
      no-caps
      flat
      v-if="character"
      @click="$router.push({ name: 'CharacterDetails', params: { id: getIdFromURL() } })"
    >
      {{ character.name }}
    </a> -->
  </span>
</template>

<script>
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Character from 'src/models/Character'

export default class CharacterName extends Vue {
  @Prop(String) denomination
  @Prop({ type: String, default: 'text-h6' }) textClass
  @Prop({ type: String, required: true }) url
  character = null

  // Extrae el id del character de la url recibida por propiedad
  getIdFromURL () {
    const _url = this.url.split('/')
    return _url[_url.length - 1]
  }

  async mounted () {
    // Solo se estira el Character si la url no es nula o vacía
    if (this.url && this.url.length > 0) {
      this.character = await Character.find(this.getIdFromURL())
    }
  }
}
</script>
<style lang="sass" scoped>
.card-char-name
  width: 300px

</style>