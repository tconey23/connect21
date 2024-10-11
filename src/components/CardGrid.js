import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Card from './Card';

const CardGrid = ({ items, setOpen, setSelections, selections}) => {

  const rows = [
    items.slice(0, 4),  
    items.slice(4, 7), 
    items.slice(7, 11), 
    items.slice(11, 14), 
    items.slice(14, 18),
    items.slice(18, 21),
  ];

  return (
    <Stack  sx={{ overflowY: 'scroll', height: '90%'}}>
      {rows.map((row, rowIndex) => (
        <Stack 
          key={rowIndex}
          direction="row" 
          spacing={0} 
          justifyContent="center" 
          mt={2}
          height={160}
          sx={{ width: '100%', flexWrap: 'wrap'}}
        >
          {row.map((item, index) => (
            <Card selections={selections} setOpen={setOpen} setSelections={setSelections} item={item} index={index}/>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default CardGrid;
