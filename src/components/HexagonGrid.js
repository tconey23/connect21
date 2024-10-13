import React from 'react';
import Hexagon from './Hexagon';

const HexagonGrid = ({ items, setCenterHex, setSelections, selections }) => {
  const hexRadius = 1.5;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;

  // Calculate rows and cols dynamically based on items length
  const rows = 7; // Adjust based on stage or items length
  const cols = 3;
  const hexagons = [];
  let count = 0;

  // Ensure that we only create hexagons for available items
  for (let row = 0; row < rows && count < items.length; row++) {
    for (let col = 0; col < cols && count < items.length; col++) {
      const offsetX = row % 2 === 0 ? 0 : hexWidth / 2;
      const x = col * hexWidth + offsetX;
      const y = row * hexHeight * 0.5;

      if (items[count]) { 
        hexagons.push({ position: [x, y, 0], label: items[count], index: count }); 
        count += 1;
      }
    }
  }

  // Find the center hexagon index and set the center hexagon
  const centerHexIndex = Math.floor(hexagons.length / 2); // Ensure valid center based on the number of hexagons
  setCenterHex && setCenterHex(hexagons[centerHexIndex]); // Only set if a center exists

  return (
    <>
      {hexagons.map((hex, index) => (
        <Hexagon
          key={index}
          position={hex.position}
          label={hex.label}
          index={hex.index}
          setSelections={setSelections}
          selections={selections}
        />
      ))}
    </>
  );
};

export default HexagonGrid;
