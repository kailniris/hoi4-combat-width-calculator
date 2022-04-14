<template>
  <div>
    <input
      id="seizeHoldBridge"
      type="checkbox"
      :value="combatOptions.totalWidthModifier === 0.5"
      :checked="combatOptions.totalWidthModifier === 0.5"
      @input="toggleSeizeHoldBridge"
    />
    <label for="seizeHoldBridge">Seize/Hold bridge</label>

    <label for="flanks">Number of flanks:</label>
    <!-- eslint-disable vue/no-mutating-props -->
    <input
      id="flanks"
      v-model="combatOptions.flanks"
      type="number"
      min="0"
      max="4"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CombatOptions',

  props: {
    combatOptions: {
      type: Object,
      required: true,
    },
  },

  methods: {
    toggleSeizeHoldBridge() {
      const { combatOptions } = this;
      const toggled = combatOptions.totalWidthModifier === 0.5;

      // eslint-disable-next-line vue/no-mutating-props
      combatOptions.totalWidthModifier = toggled ? 1 : 0.5;
    },
  },
});
</script>

<style scoped>
label {
  margin-right: 8px;
}
</style>
