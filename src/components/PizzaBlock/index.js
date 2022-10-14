import { useState } from 'react'
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../../svg/PlusSvg'

const typeNames = ['тонкое', 'традиционное']

export default function PizzaBlock({
  id = 0,
  imageUrl = '',
  name = '',
  types = [],
  sizes = [],
  price = 0,
}) {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const addedCount = cartItem ? cartItem.count : 0

  const [activeType, setactiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const onClickSize = (i) => {
    setActiveSize(i)
  }

  const onClickType = (i) => {
    setactiveType(i)
  }

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <img
          className='pizza-block__image'
          src={imageUrl}
          alt='Pizza'
        />
        <h4 className='pizza-block__title'>{name}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.length >= 0 &&
              (types.map((type, i) => (
                <li
                  onClick={() => onClickType(i)}
                  className={activeType === i ? 'active' : ''}
                  key={`typeId${i}`}>
                  {typeNames[type]}
                </li>
              )))}
          </ul>
          <ul>
            {sizes.length > 0 &&
              (sizes.map((size, i) => (
                <li
                  onClick={() => onClickSize(i)}
                  className={activeSize === i ? 'active' : ''}
                  key={`sizeId${i}`}>
                  {size} см.
                </li>
              )))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className='button button--outline button--add'>
            <PlusSvg />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}