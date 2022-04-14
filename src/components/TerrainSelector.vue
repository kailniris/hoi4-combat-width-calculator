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
        @input="terrain.selected = !terrain.selected"
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
});
</script>

<style scoped>
label {
  margin-right: 8px;
}
</style>
