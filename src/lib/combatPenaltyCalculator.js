function getWastedWidthColor(/* value */) {
  return null;
  /*
  if (value > 25) {
    return 'red';
  }

  if (value > 15) {
    return 'orange';
  }

  if (value > 5) {
    return 'yellow';
  }

  return 'green';
  */
}

function getCombatPenaltyColor(value) {
  if (value < 0.1) {
    return 'green';
  }

  return null;
  /*
  if (value > 0.25) {
    return 'red';
  }

  if (value > 0.15) {
    return 'orange';
  }

  if (value > 0.05) {
    return 'yellow';
  }

  return 'green';
  */
}

function getCombatPenalty(totalWidth, combatWidth) {
  return (1.5 * (combatWidth - totalWidth)) / totalWidth;
}

const stackingLimit = 8;
const stackingLimitFlank = 4;

function getCombat({
  terrain,
  divisionWidth,
  flanks,
  totalWidthModifier,
}) {
  const totalWidth = (terrain.totalWidth + terrain.reinforceWidth * flanks) * totalWidthModifier;
  const combat = {
    terrain,
    totalWidth,
    flanks,
    divisionWidth,
    minWastedWidth: null,
    minWastedWidthDivisions: null,
    minCombatPenalty: null,
    minCombatPenaltyDivisions: null,
    maxCombatPenalty: null,
    maxCombatPenaltyDivisions: null,
  };

  let divisions = stackingLimit + stackingLimitFlank * flanks;
  for (divisions; divisions > 0; divisions -= 1) {
    const combatWidth = divisionWidth * divisions;
    const combatPenalty = getCombatPenalty(totalWidth, combatWidth);

    if (combatPenalty < 0) {
      // Calculate minimum wasted width.
      const wastedWidth = totalWidth - combatWidth;
      const { minWastedWidth } = combat;

      if (!minWastedWidth || wastedWidth < minWastedWidth) {
        combat.minWastedWidth = wastedWidth;
        combat.minWastedWidthDivisions = divisions;
        combat.minWastedWidthColor = getWastedWidthColor(wastedWidth);
      }
    } else if (combatPenalty < 0.33) {
      // Calculate min and max combat penalty.
      const { minCombatPenalty, maxCombatPenalty } = combat;

      if (!minCombatPenalty || combatPenalty < minCombatPenalty) {
        combat.minCombatPenalty = combatPenalty;
        combat.minCombatPenaltyDivisions = divisions;
        combat.minCombatPenaltyColor = getCombatPenaltyColor(combatPenalty);
      }

      if (!maxCombatPenalty || combatPenalty > maxCombatPenalty) {
        combat.maxCombatPenalty = combatPenalty;
        combat.maxCombatPenaltyDivisions = divisions;
        combat.maxCombatPenaltyColor = getCombatPenaltyColor(combatPenalty);
      }
    }
  }

  return combat;
}

export default function getCombatPenalties({ terrain, flanks, totalWidthModifier }) {
  const combats = [];

  for (let divisionWidth = 15; divisionWidth <= 45; divisionWidth += 1) {
    const combat = getCombat({
      terrain, divisionWidth, flanks, totalWidthModifier,
    });

    combats.push(combat);
  }

  return combats;
}
