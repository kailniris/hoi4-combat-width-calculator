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

    <input
      id="flanks"
      v-model="flanks"
      type="number"
      name="tentacles"
      min="0"
      max="4"
      @input="updateFlanks"
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

  emits: ['update:combatOptions'],

  computed: {
    flanks: {
      get() {
        return this.combatOptions.flanks;
      },
      set(flanks) {
        this.updateCombatOptions({
          flanks,
        });
      },
    },
  },

  methods: {
    updateCombatOptions(value) {
      this.$emit('update:combatOptions', {
        ...this.combatOptions,
        ...value,
      });
    },
    toggleSeizeHoldBridge() {
      const toggled = this.combatOptions.totalWidthModifier === 0.5;

      this.updateCombatOptions({
        totalWidthModifier: toggled ? 1 : 0.5,
      });
    },
  },
});
</script>

<style scoped>
label {
  margin-right: 8px;
}
</style>
