import MinusCartSvg from '../../svg/MinusCartSvg'
import PlusCartSvg from '../../svg/PlusCartSvg'
import RemoveCartSvg from '../../svg/RemoveCartSvg'

export default function InfoBox({
  name = 'Сырный цыпленок',
  img='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg',
}) {
return (
  <div class='cart__item'>
  <div class='cart__item-img'>
    <img
      class='pizza-block__image'
      src={img}
      alt='Pizza'
    />
  </div>
  <div class='cart__item-info'>
    <h3>{name}</h3>
    <p>тонкое тесто, 26 см.</p>
  </div>
  <div class='cart__item-count'>
    <div class='button button--outline button--circle cart__item-count-minus'><MinusCartSvg/></div>
    <b>2</b>
    <div class='button button--outline button--circle cart__item-count-plus'><PlusCartSvg/></div>
  </div>
  <div class='cart__item-price'>
    <b>770 ₽</b>
  </div>
  <div class='cart__item-remove'>
    <div class='button button--outline button--circle'><RemoveCartSvg/></div>
  </div>
  </div>
  )
}