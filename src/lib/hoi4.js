const stackingLimit = 8;
const stackingLimitFlank = 4;
const terrains = [
  {
    name: 'Plains/Desert',
    totalWidth: 90,
    reinforceWidth: 45,
    selected: true,
  },
  {
    name: 'Forest/Jungle',
    totalWidth: 84,
    reinforceWidth: 42,
    selected: true,
  },
  {
    name: 'Hills',
    totalWidth: 80,
    reinforceWidth: 40,
    selected: true,
  },
  {
    name: 'Mountain',
    totalWidth: 75,
    reinforceWidth: 25,
    selected: true,
  },
  {
    name: 'Urban',
    totalWidth: 96,
    reinforceWidth: 32,
    selected: true,
  },
  {
    name: 'Marsh',
    totalWidth: 78,
    reinforceWidth: 26,
    selected: true,
  },
];

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

function getCombatPenalty(totalWidth, battleWidth) {
  return (1.5 * (battleWidth - totalWidth)) / totalWidth;
}

function getBattle({
  terrain,
  divisionWidth,
  flanks,
  totalWidthModifier,
}) {
  const totalWidth = (terrain.totalWidth + terrain.reinforceWidth * flanks) * totalWidthModifier;
  const battle = {
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
    const battleWidth = divisionWidth * divisions;
    const combatPenalty = getCombatPenalty(totalWidth, battleWidth);

    if (combatPenalty < 0) {
      // Calculate minimum wasted width.
      const wastedWidth = totalWidth - battleWidth;
      const { minWastedWidth } = battle;

      if (!minWastedWidth || wastedWidth < minWastedWidth) {
        battle.minWastedWidth = wastedWidth;
        battle.minWastedWidthDivisions = divisions;
        battle.minWastedWidthColor = getWastedWidthColor(wastedWidth);
      }
    } else if (combatPenalty < 0.33) {
      // Calculate min and max combat penalty.
      const { minCombatPenalty, maxCombatPenalty } = battle;

      if (!minCombatPenalty || combatPenalty < minCombatPenalty) {
        battle.minCombatPenalty = combatPenalty;
        battle.minCombatPenaltyDivisions = divisions;
        battle.minCombatPenaltyColor = getCombatPenaltyColor(combatPenalty);
      }

      if (!maxCombatPenalty || combatPenalty > maxCombatPenalty) {
        battle.maxCombatPenalty = combatPenalty;
        battle.maxCombatPenaltyDivisions = divisions;
        battle.maxCombatPenaltyColor = getCombatPenaltyColor(combatPenalty);
      }
    }
  }

  return battle;
}

function getBattlePenalties({ terrain, flanks = 0, totalWidthModifier = 1 }) {
  const battles = [];

  for (let divisionWidth = 15; divisionWidth <= 45; divisionWidth += 1) {
    const battle = getBattle({
      terrain, divisionWidth, flanks, totalWidthModifier,
    });

    battles.push(battle);
  }

  return battles;
}

export { terrains, getBattlePenalties };
