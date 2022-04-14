<template>
  <div>
    <TerrainSelector :terrains="terrains" />

    <CombatOptions :combat-options="combatOptions" />

    <PenaltyTables :terrains="terrains" />

    <ReadMe />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import terrains from './lib/terrains';
import getCombatPenalties from './lib/combatPenaltyCalculator';
import ReadMe from '../README.md';

export default defineComponent({
  name: 'App',

  components: {
    ReadMe,
  },

  data: () => ({
    terrains,
    combatOptions: {
      totalWidthModifier: 1,
      flanks: 0,
    },
  }),

  watch: {
    combatOptions: {
      deep: true,
      immediate: true,
      handler(combatOptions) {
        this.getCombatPenalties(combatOptions);
      },
    },
  },

  methods: {
    getCombatPenalties(combatOptions) {
      this.terrains = terrains.map((terrain) => {
        // eslint-disable-next-line no-param-reassign
        terrain.combatPenalties = getCombatPenalties({
          terrain,
          ...combatOptions,
        });

        return terrain;
      });
    },
  },
});
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
}
</style>
