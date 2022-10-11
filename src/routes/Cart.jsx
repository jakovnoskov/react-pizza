import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import InfoBox from '../components/InfoBox'
import CartItem from '../components/CartItem'
import CartPageSvg from '../svg/CartPageSvg'
import BasketSvg from '../svg/BasketSvg'
import BackArrowSvg from '../svg/BackArrowSvg'

export default function Cart() {
const [cartItems, setCartItems] = useState([1,2,3,4])

  return (
    <div class="content">
      {cartItems.length > 0 ? (
        <div class="container container--cart">
          <div class="cart">
            <div class="cart__top">
              <h2 class="content__title"><CartPageSvg/>Корзина</h2>
              <div class="cart__clear"><BasketSvg/><span>Очистить корзину</span></div>
            </div>
            <div class="content__items">{cartItems.map((item,i) => <CartItem {...item}/>)}</div>
            <div class="cart__bottom">
              <div class="cart__bottom-details">
                <span> Всего пицц: <b>3 шт.</b> </span>
                <span> Сумма заказа: <b>900 ₽</b> </span>
              </div>
              <div class="cart__bottom-buttons">
                <Link to={`/`} class="button button--outline button--add go-back-btn">
                  <BackArrowSvg/><span>Вернуться назад</span>
                </Link>
                <div class="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )    
        :
        <InfoBox
          title = 'Корзина пустая'
          description = 'Вероятней всего, вы не заказывали ещё пиццу.  Для того, чтобы заказать пиццу, перейди на главную страницу.'
          buttonTitle = 'Вернуться назад'
          icon='😕'
          img='/img/empty-cart.png'
          alt='Корзина пустая'
        />    
      }
     </div>
  )
}