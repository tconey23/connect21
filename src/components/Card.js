import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';

const Card = ({ item, index, setOpen, setSelections, selections }) => {

  const [isHover, setIsHover] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [canSelect, setCanSelect] = useState(true)

  useEffect(() => {
    if(!selections.includes(item)){
      setIsSelected(false)
    }
    if(selections.length == 7){
      setCanSelect(false)
    } else {
      setCanSelect(true)
    }
  }, [item, selections])

  const handleClick = (item) => {
    setOpen(true)
    setIsSelected(true)
    setSelections(prev => ([
      ...prev,
      item
    ]))
  }

  return (
            <Stack
              key={index}
              direction="column"
              className='list-stack'
              onClick={() => !isSelected && canSelect && handleClick(item)}
              onMouseOver={() => setIsHover(index)}
              onMouseOut={() => setIsHover(null)}
              sx={{
                width: 160, 
                height: 188,
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 1
              }}
            >
            <svg
              version="1.1"
              x="0px"
              y="0px"
              viewBox="200 200 800 800"
              style={{filter: isHover == index && canSelect ? 'drop-shadow(9px 9px 6px black)' : 'none'}}
              >
              <g id="Graphic_Element">
                <polygon
                  className="list-item"
                  style={{ fill: 'rgb(28 57 151 / 20%)', stroke: 'white'}}
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
                  {item}
                </h1>
              </foreignObject>
              <g id="Graphic_Element">
                <polygon
                  className="list-item"
                  style={{ fill: isSelected ? 'rgb(151 151 151 / 80%)' : 'rgb(28 57 151 / 20%)', stroke: 'white', stroke: 'white' }}
                  points="946.41,800 946.41,400 600,200 253.59,400 253.59,800 600,1000"
                  />
              </g>
            </svg>
            </Stack>
  );
};

export default Card;
