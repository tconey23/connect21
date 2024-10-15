import React from 'react';
import Hexagon from './Hexagon';

const HexagonGrid = ({ items, setCenterHex, setSelections, selections, isMediumScreen }) => {
  const hexRadius = 1.25; // Adjust hexagon size as needed
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;

  // Convert axial coordinates (q, r) to pixel coordinates (x, y)
  const axialToPixel = (q, r) => {
    const x = hexWidth * (q + r / 2);
    const y = hexHeight * r * 0.70; // Multiplying by 0.75 to avoid excessive vertical spacing
    return [x, y];
  };

  const hexagons = [];
  let count = 0;

  // Predefined grid positions for 21 hexagons (alternating rows)
  const gridPattern = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], // Row 1: 5 hexagons
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], // Row 2: 6 hexagons
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], // Row 3: 5 hexagons
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], // Row 4: 6 hexagons
  ];

  // Ensure we don't go beyond the items count
  for (let i = 0; i < gridPattern.length && count < items.length; i++) {
    const [q, r] = gridPattern[i];
    const [x, y] = axialToPixel(q, r);
    hexagons.push({ position: [x, y, 0], label: items[count], index: count });
    count += 1;
  }

  // Set the center hexagon to the first hexagon
  const centerHexIndex = 0;
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
          isMediumScreen={isMediumScreen}
        />
      ))}
    </>
  );
};

export default HexagonGrid;
