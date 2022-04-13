<template>
  <div>
    <template
      v-for="terrain in terrains"
      :key="terrain.name"
    >
      <input
        :id="terrain.name"
        type="checkbox"
        :value="terrain.selected"
        :checked="terrain.selected"
        @input="toggleTerrain(terrain)"
      />
      <label :for="terrain.name">{{ terrain.name }}</label>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TerrainSelector',

  props: {
    terrains: {
      type: Array,
      required: true,
    },
  },

  emits: ['update:terrains'],

  methods: {
    toggleTerrain(terrain) {
      // eslint-disable-next-line no-param-reassign
      terrain.selected = !terrain.selected;
      this.$emit('update:terrains', this.terrains);
    },
  },
});
</script>

<style scoped>
label {
  margin-right: 8px;
}
</style>
