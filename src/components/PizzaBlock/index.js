import React,{useState} from 'react'
import PlusSvg from '../../svg/PlusSvg'

export default function PizzaBlock({
  id = 0,
  imageUrl = '',
  name = '',
  types = [],
  sizes = [],
  price = 0,
  category = 0,
  rating = 0
}) {
  const typeNames = ['тонкое', 'традиционное']
  const [activeSize, setActiveSize] = useState(0)
  const [activeType, setactiveType] = useState(0)
  const onClickSize = (i) => {
    setActiveSize(i)
  }

  const onClickType = (i) => {
    setactiveType(i)
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
            className={activeType === i ? 'active':''}
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
            className={activeSize === i ? 'active':''}
            key={`sizeId${i}`}>
              {size} см.
          </li>
        )))}
      </ul>
    </div>
    <div className='pizza-block__bottom'>
      <div className='pizza-block__price'>от {price} ₽</div>
      <button className='button button--outline button--add'>
        <PlusSvg/>
        <span>Добавить</span>
        <i>0</i>
      </button>
    </div>
  </div>
</div>
  )
}