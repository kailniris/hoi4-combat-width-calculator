<template>
  <div>
    <TerrainSelector v-model:terrains="terrains" />

    <CombatOptions v-model:combat-options="combatOptions" />

    <PenaltyTables :selected-terrains="selectedTerrains" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { terrains, getBattlePenalties } from './lib/hoi4';

export default defineComponent({
  name: 'App',

  data: () => ({
    terrains,
    hoi4: [],
    combatOptions: {
      totalWidthModifier: 1,
      flanks: 0,
    },
  }),

  computed: {
    selectedTerrains() {
      return this.terrains.filter(({ selected }) => selected);
    },
  },

  watch: {
    combatOptions: {
      deep: true,
      handler() {
        this.getBattlePenalties();
      },
    },
  },

  mounted() {
    this.getBattlePenalties();
  },

  methods: {
    getBattlePenalties() {
      const { combatOptions } = this;

      this.terrains = terrains.map((terrain) => {
        terrain.combatPenalties = getBattlePenalties({
          terrain,
          ...combatOptions,
        });

        return terrain;
      });
    },
  },
});
</script>
