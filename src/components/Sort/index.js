import React,{useState} from 'react'

import SortArrowSvg from '../../svg/SortArrowSvg'

export default function Sort() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const list = ['популярности','цене','алфавиту']
  const sortName = list[selected]

  const onClickListItem = (index) => {
    setSelected(index)
    setOpen(false)
  }

return (
<div className='sort'>
  <div className='sort__label'>
  <div className={`arrowLabelBox ${open ? 'active':''}` }><SortArrowSvg/></div>
  <b>Сортировка по:</b>
  <span onClick={() => setOpen(!open)}>{sortName}</span>
  </div>
  {open && 
    <div className='sort__popup'>
    <ul>
      {list.map((name,i) => (
          <li 
            key={i}
            onClick={() => onClickListItem(i)} 
            className={selected === i ? 'active':''}>
            {name}
          </li>
      ))}
    </ul>
  </div>}
</div>
  )
}