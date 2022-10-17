import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItem, CartItem, selectCartItemById } from '../../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../../svg/PlusSvg'

const typeNames = ['тонкое', 'традиционное']

type PizzaBlockProps = {
  id: string,
  imageUrl: string,
  name: string,
  types: number[],
  sizes: number[],
  price: number,
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id = '0',
  imageUrl = '',
  name = '',
  types = [],
  sizes = [],
  price = 0,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const addedCount = cartItem ? cartItem.count : 0

  const [activeType, setactiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)
  const onClickSize = (i: number) => {
    setActiveSize(i)
  }

  const onClickType = (i: number) => {
    setactiveType(i)
  }

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link key={id} to={`/pizza/${id}`}>
          <img
            className='pizza-block__image'
            src={imageUrl}
            alt='Pizza'
          />
          <h4 className='pizza-block__title'>{name}</h4>
        </Link>
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