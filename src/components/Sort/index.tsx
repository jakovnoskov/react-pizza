import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSort, setSort } from '../../redux/slices/filterSlice'
import SortArrowSvg from '../../svg/SortArrowSvg'

type SortItem = {
  name: string
  sortProperty: string
}

export const sortList: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title' },
]

export const Sort: React.FC = () => {
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)
  const sortRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj))
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={sortRef} className='sort' onClick={() => setOpen(!open)}>
      <div className='sort__label'>
        <div className={`arrowLabelBox ${open ? 'active' : ''}`}><SortArrowSvg /></div>
        <b>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      {open &&
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}