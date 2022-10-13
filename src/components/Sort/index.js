import {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setSort} from '../../redux/slices/filterSlice'
import SortArrowSvg from '../../svg/SortArrowSvg'

const list = [
  {name: 'популярности', sortProperty:'rating'},
  {name: 'цене', sortProperty:'price'},
  {name: 'алфавиту', sortProperty:'title'},
]

export default function Sort() {
const dispatch = useDispatch()
const sort = useSelector(state => state.filter.sort)
const sortRef = useRef(null)

const [open, setOpen] = useState(false)

const onClickListItem = (obj) => {
  dispatch(setSort(obj))
  setOpen(false)
}

return (
  <div ref={sortRef} className='sort' onClick={() => setOpen(!open)}>
    <div className='sort__label'>
    <div className={`arrowLabelBox ${open ? 'active':''}` }><SortArrowSvg/></div>
    <b>Сортировка по:</b>
    <span>{sort.name}</span>
    </div>
    {open && 
    <div className='sort__popup'>
      <ul>
        {list.map((obj,i) => (
          <li 
            key={i}
            onClick={() => onClickListItem(obj)} 
            className={sort.sortProperty === obj.sortProperty ? 'active':''}>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>}
  </div>
  )
}