<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class EssentialLink extends Vue {
  @Prop({ type: String, required: true }) title
  @Prop({ type: String, default: '' }) caption
  @Prop({ type: String, default: '#' }) link
  @Prop({ type: String, default: '' }) icon
}
</script>
