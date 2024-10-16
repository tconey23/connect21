import React, { useEffect, useRef, useState} from 'react';
import { Stack } from '@mui/material';
import * as d3 from 'd3';

function TwoDHex({ hexWidth, vertSpace, horizSpace, text, setIsSelected, isSelected, hexIndex }) {
  const [actualWidth, setActualWidth] = useState(199)
  const textRef = useRef(); // Reference to the <text> element
  const hexRef = useRef()

  useEffect(() => {
    const svgText = d3.select(textRef.current);
    const textContent = text; // Your text content
    
    const wrapText = (textElement, width, totalLines) => {
      const words = textContent.split(/\s+/); // Split text by spaces
      let line = [];
      let lineNumber = 0; // Line number starts at 0 and will increment
      const lineHeight = 1.1; // ems
      const y = 15; // Starting y-position of text
      const dy = parseFloat(textElement.attr('dy')) || 0;
  
      let tspan = textElement.text(null).append('tspan').attr('y', y).attr('dy', `${dy}em`);
  
      while (words.length > 0) {
        const word = words.shift(); // Get the next word
        const newLine = [...line, word].join(' '); // Combine existing line with new word
  
        // Get the maximum characters allowed for the current line based on the line number
        const maxCharsForCurrentRow = getMaxCharsForRow(lineNumber, totalLines);
  
        // Check if adding this word would exceed the max character count
        if (newLine.length > maxCharsForCurrentRow) {
          tspan.text(line.join(' ')); // Set text for the current line
          line = [word]; // Start new line with the word that didn't fit
  
          // After adding the line, calculate the length of the current line
          const textLength = tspan.node().getComputedTextLength();
          const dynamicX = (width - textLength) / 2; // Dynamically center the text based on its actual length
  
          // Update the x attribute for centering
          tspan.attr('x', dynamicX);
  
          // Create a new tspan for the next line
          tspan = textElement
            .append('tspan')
            .attr('y', y)
            .attr('x', dynamicX)
            .attr('dy', `${++lineNumber * lineHeight + dy}em`)
            .text(word);
        } else {
          line.push(word); // Add word to current line
          tspan.text(newLine); // Update current tspan with the new line content
        }
      }
  
      // Finalize the last line if there's any remaining text
      if (line.length > 0) {
        tspan.text(line.join(' '));
        const textLength = tspan.node().getComputedTextLength();
        const dynamicX = (width - textLength) / 2; // Dynamically center the last line
        tspan.attr('x', dynamicX); // Center the last line
      }
    };
  
    const totalLines = 7; // Adjust the number of lines to match the hexagon's height
    wrapText(svgText, actualWidth * 1.4, totalLines); // Pass the total lines for dynamic row calculation
  
  }, [hexWidth, horizSpace, actualWidth, text]);
  
  // Simple function to calculate max characters for a given row
  const getMaxCharsForRow = (lineNumber, totalLines) => {
    // Define the max character limit for each line
    const charLimit = [5, 7, 10, 20, 15, 7, 5];
    return charLimit[lineNumber]; // Return the character limit for the current row
  };
  
  useEffect(() =>{
    if(hexRef.current){
        console.log(hexRef.current.getBoundingClientRect().width)
        setActualWidth(hexRef.current.getBoundingClientRect().width)
    }
  }, [hexRef])

  const handleSelect = (text) => {
    setIsSelected(prev => ([
        ...prev,
        text
    ]))
  }

  return (
    <Stack width={hexWidth} height={hexWidth} paddingY={vertSpace} paddingX={horizSpace}>
      <svg
        ref={hexRef} 
        className="hive-cell outer" 
        viewBox="0 0 120 103.92304845413263"
        data-testid="hive-cell-outer"
      >
        <polygon 
          className="cell-fill" 
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263" 
          stroke={isSelected.includes(text) ? 'purple' : 'black'} 
          strokeWidth={isSelected ? 2 : 1} 
          fill='white'
          data-testid="cell-fill"
        />
        <text 
        onClick={() => handleSelect(text)}
          ref={textRef} // Attach ref to the text element
          className="cell-letter" 
          x={hexWidth / 2} // Center horizontally
          y={hexWidth / 2} // Adjust Y position
          dy="0.35em" 
          data-testid="cell-letter"
        >
          {/* Dynamically wrapped text will be inserted here */}
        </text>
      </svg>
    </Stack>
  );
}

export default TwoDHex;
