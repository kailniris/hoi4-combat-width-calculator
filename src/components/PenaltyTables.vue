<template>
  <div style="display: flex; flex-wrap: wrap; margin-top: 20px">
    <table
      v-for="terrain in selectedTerrains"
      :key="terrain.name"
    >
      <caption>
        {{
          terrain.name
        }}
        {{
          terrain.totalWidth
        }}
        +
        {{
          terrain.reinforceWidth
        }}
      </caption>

      <tr>
        <th>Division width</th>
        <th>Min wasted width (divisions)</th>
        <th>Combat penalty (divisions)</th>
        <!--
        <th>Max combat penalty (divisions)</th>
        -->
      </tr>

      <tr
        v-for="(combat, key) in terrain.combatPenalties"
        :key="key"
      >
        <td>{{ combat.divisionWidth }}</td>
        <td :style="{ 'background-color': combat.minWastedWidthColor }">
          {{ formatMinWastedWidth(combat) }}
        </td>
        <td :style="{ 'background-color': combat.minCombatPenaltyColor }">
          {{ formatMinCombatPenalty(combat) }}
        </td>
        <!--
        <td :style="{ 'background-color': combat.maxCombatPenaltyColor }">
          {{ formatMaxCombatPenalty(combat) }}
        </td>
        -->
      </tr>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PenaltyTables',

  props: {
    terrains: {
      type: Array,
      required: true,
    },
  },

  computed: {
    selectedTerrains() {
      return this.terrains.filter(({ selected }) => selected);
    },
  },

  methods: {
    formatMinWastedWidth(combat) {
      if (combat.minWastedWidth === null) {
        return '-';
      }

      return `${Math.floor(combat.minWastedWidth)} (${combat.minWastedWidthDivisions})`;
    },
    formatMinCombatPenalty(combat) {
      if (combat.minCombatPenalty === null) {
        return '-';
      }

      return `${Math.round(combat.minCombatPenalty * 100)}% (${combat.minCombatPenaltyDivisions})`;
    },
    formatMaxCombatPenalty(combat) {
      if (combat.maxCombatPenalty === null) {
        return '-';
      }

      return `${Math.round(combat.maxCombatPenalty * 100)}% (${combat.maxCombatPenaltyDivisions})`;
    },
  },
});
</script>

<style scoped>
table {
  width: 200px;
  margin-left: 4px;
  margin-right: 4px;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
