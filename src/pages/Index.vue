<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { Vue } from 'vue-class-component'
import House from 'src/models/House'

export default class PageIndex extends Vue {
  async mounted () {
    const houses = await House.limit(20).get()
    console.log({ houses })
  }
}
</script>
