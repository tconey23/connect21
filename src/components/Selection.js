import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

const Selection = ({ setOpen, open, selections, setSelections }) => {

  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    if (selections.length > 0) {
      setOpen(true)

      setTimeout(() => {
        setOpen(false)
      }, 2000);
    }
  }, [selections]);
  
  const handleRemove = (index) => {
    const rem = selections.filter((itm) => itm !== selections[index])
    console.log(index)
    setSelections(rem)
  }

  const DrawerList = (
    <List>
      {selections && selections.map((text, index) => (
        <svg
            onClick={() => handleRemove(index)}
              version="1.1"
              x="0px"
              y="0px"
              viewBox="200 200 800 800"
              style={{filter: isHover == index ? 'drop-shadow(9px 9px 6px black)' : 'none'}}
              >
              <g id="Graphic_Element">
                <polygon
                  className="list-item"
                  style={{ fill: 'rgb(28 57 151 / 80%)', stroke: 'white'}}
                  points="946.41,800 946.41,400 600,200 253.59,400 253.59,800 600,1000"
                  />
              </g>
              <foreignObject 
                x="365" 
                y="350" 
                width="450px" 
                height="450px"
              >
                <h1
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: 'white',
                    textAlign: 'center',
                    textWrap: 'pretty',
                  }}
                  >
                  {text}
                </h1>
              </foreignObject>
              <g id="Graphic_Element">
                <polygon
                  className="list-item"
                  style={{ fill: 'rgb(28 57 151 / 20%)', stroke: 'white' }}
                  points="946.41,800 946.41,400 600,200 253.59,400 253.59,800 600,1000"
                  />
              </g>
            </svg>
      ))}
    </List>
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)} width={160}>
      <Stack direction={'row'} width={200}>
        <Stack direction={'column'} width={'98%'} height={'100%'}>
          <Button 
            onClick={() => setOpen(false)} 
            sx={{ background: 'blue', height: 20, width: 50 }}
          >
            {"<"}
          </Button>
          {DrawerList}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default Selection;
