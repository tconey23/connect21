import {useState, useEffect}from 'react'
import TwoDHex from './TwoDHex'
import { Box, Stack } from '@mui/material'

const TwoDHexGrid = ({items, setCenterHex, setSelections, selections, isMediumScreen}) => {
    const [hexWidth, setHexWidth] = useState(130)
    const [vertSpace] = useState(hexWidth * 0.011)
    const [horizSpace] = useState(vertSpace*2)
    const [rowSpace] = useState(hexWidth*0.72)
    const [hexGrid, setHexGrid] = useState([])
    const [isSelected, setIsSelected] = useState([])

    const rows = 6
    let currentHexIndex = 0

    useEffect(() =>{
        console.log(isSelected)
    }, [isSelected])

  return (
    <Stack 
    direction={'column'}
    width={'100vw'}           
    justifyContent={'center'}
    alignItems={'center'}>
            {Array.from({ length: rows }, (_, rowIndex) => (
        <Stack
          key={rowIndex} // Unique key for each row
          direction={'row'}
          height={hexWidth - rowSpace}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {/* Loop through each hexagon in the row */}
          {Array.from({ length: rowIndex + 1 }, (_, hexIndex) => {
            const text = items[currentHexIndex]; // Get the current text from the array
            currentHexIndex++; // Move to the next text for the next hexagon

            return (
              <TwoDHex
                key={hexIndex} // Unique key for each hexagon
                hexWidth={hexWidth}
                vertSpace={vertSpace}
                horizSpace={horizSpace}
                text={text} // Pass the current text to the hexagon
                setIsSelected={setIsSelected}
                isSelected={isSelected}
              />
            );
          })}
        </Stack>
      ))}
    </Stack>
  )
}

export default TwoDHexGrid
