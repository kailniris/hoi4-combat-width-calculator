# HOI4 combat width calculator

## Description

I created this GUI tool in order to visualize which division widths work best on which terrain types in Hearts of Iron IV NSB. There are other sources dealing with this topic, however often those are simple graphs which are not suited to represent edge cases with the displayed combat widths.  
Link to GUI: https://kailniris.github.io/hoi4-combat-width-calculator/

## Considerations

<!--
- Some division widths look good on paper for certain terrain types but the amount of division in combat can greatly vary the combat penalty. For example 15 width divisions on plains/desert fit perfectly when 6 divisions present in combat but get a 25% penalty when 7 or more divisions are present. Also 15 combat widths get wasted if only 5 divisions present in combat.
-->

- Some division widths can't have combat penalty on certain terrain types and total combat widths but always waste some combat width. For an example 4 divisions with 22 width is the maximum that can fit on plains/desert during combat width one attack direction. They can't have combat penalties but always waste width at a minimum of 2 combat widths. These "no penalty low waste" division widths can be really convenient because you don't have to worry about how many divisions are on the given tile.
- Divisions width after a certain threshold are extremely dangerous when defending river crossings. The Seize/Hold bridge combat phase lowers the total width of the combat by 50% which can render only one of your divisions filling the frontline. Once the Seize/Hold bridge combat phase triggers the total combat width modifier stays until the end of the battle. If your opponent can cycle divisions but you can't, it's likely you will lose the battle. For example the seemingly fitting 25 division width on mountain and hill tiles can only fill the frontline with one division during combat with the Seize/Hold bridge phase. Defending the Maginot line as France is a great example for this.
- Attacking from multiple directions can cause huge combat penalties for divisions that have no combat penalty when attacking from only one direction. Some division widths with a certain amount of divisions filling the frontline are exceptions to this. For example 15 width divisions on plains/desert.
- Attacking from multiple directions can be a way to mitigate combat penalties for divisions not fitting on the given terrain. Attacking from at least 3 directions can greatly reduce your combat penalties but can cause a huge amount of combat penalty if the frontline is fully filled or a huge amount of wasted width if the frontline is undermanned.

## Conclusion

There is no perfect for all division widths but it's possible to have division widths suitable for 2-3 terrain types with minimal penalties. Some terrain types are more common on given fronts, and theaters therefore it's possible to get a huge amount of advantage with proper planning. Not filling the frontline totally, and finding the correct amount of attack directions can also be a huge factor regarding combat penalty.

## Feedback & Bugs

https://github.com/kailniris/hoi4-combat-width-calculator
