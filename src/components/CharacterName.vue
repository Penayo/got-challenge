<template>
  <span>
    <!-- Se muestra el spinner si hay una url donde buscar y mientras la API responde -->
    <q-spinner-dots v-if="!character && url.length > 0" />

    <!-- Se muestra este mensaje si la url está vacía -->
    <span v-if="!url || url.length === 0">?</span>

    <!-- Versión extendida del nombre del character, incluye icóno y cultura -->
    <q-card
      class="card-char-name cursor-pointer q-pa-none"
      flat
      square
      v-if="character && type === 'extended' && url.length > 0"
      @click="$emit('nameClicked', character)"
    >
      <q-item class="q-pa-none">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="account_circle" style="font-size: 35px" />
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

    <!-- Versión simple del nombre del character, solo incluye nombre -->
    <a
      href="javascript: void(0)"
      class="text-black"
      style="text-decoration: none"
      no-caps
      flat
      v-if="character && type === 'normal' && url.length > 0"
      @click.stop="$emit('nameClicked', character)"
    >
      {{ character.name }}
    </a>
  </span>
</template>

<script>
import { Vue } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import Character from 'src/models/Character'

export default class CharacterName extends Vue {
  // type: normal | extended. Solo el nombre[type=normal], icono, nombre y cultura[type=extended]
  @Prop({ type: String, default: 'normal' }) type

  @Prop({ type: String }) rel

  //Url de la api del character a mostrar el nombre
  @Prop({ type: String, required: true }) url

  // El nombre de la ruta donde tiene que ir cuando se hace click en nombre del character
  @Prop({ type: String, default: 'CharacterDetails' }) routeName

  // Propiedad para recibir información extra sobre el Character,
  // Esta propiedad se traspasa a la página de detalles del Character para ser mostrada
  // Ejemplo: Lord of House Algood. Dellonne Allyrion's Mother
  @Prop({ type: String }) extraInfo

  character = null

  @Watch('url') onUrlChange () {
    console.log('La url', this.url, this.rel)
    this.init()
  }

  // Extrae el id del character de la url recibida por propiedad
  getIdFromURL () {
    const _url = this.url.split('/')
    return _url[_url.length - 1]
  }

  async init () {
    // Solo se estira el Character si la url no es nula o vacía
    if (this.url && this.url.length > 0) {
      const id = this.getIdFromURL()
      this.character = await Character.find(id)
      this.character.id = id
    }
  }

  async mounted () {
    this.init()
  }
}
</script>
<style lang="sass" scoped>
.card-char-name
  width: 300px

</style>