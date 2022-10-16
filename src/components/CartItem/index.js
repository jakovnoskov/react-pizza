import MinusCartSvg from '../../svg/MinusCartSvg'
import PlusCartSvg from '../../svg/PlusCartSvg'
import RemoveCartSvg from '../../svg/RemoveCartSvg'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice'

export default function InfoBox({
  id = 0,
  imageUrl = '',
  name = '',
  price = 0,
  count = 0,
  type,
  size
}) {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(addItem({ id }))
  }

  const onClickMinus = () => {
    if (count === 1) onClickRemove()
    if (count > 1) dispatch(minusItem(id))
  }

  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить товар?')) {
      dispatch(removeItem(id))
    }
  }

  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img
          className='pizza-block__image'
          src={imageUrl}
          alt='Pizza'
        />
      </div>
      <div className='cart__item-info'>
        <h3>{name}</h3>
        <p>{type}, {size} см.</p>
      </div>
      <div className='cart__item-count'>
        <button
          disabled={count === 0}
          onClick={onClickMinus}
          className='button button--outline button--circle cart__item-count-minus'>
          <MinusCartSvg />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className='button button--outline button--circle cart__item-count-plus'>
          <PlusCartSvg />
        </button>
      </div>
      <div className='cart__item-price'>
        <b>{price * count} ₽</b>
      </div>
      <div onClick={onClickRemove} className='cart__item-remove'>
        <div className='button button--outline button--circle'><RemoveCartSvg /></div>
      </div>
    </div>
  )
}