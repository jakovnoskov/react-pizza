import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InfoBox from '../components/InfoBox'
import CartItem from '../components/CartItem'
import CartPageSvg from '../svg/CartPageSvg'
import BasketSvg from '../svg/BasketSvg'
import BackArrowSvg from '../svg/BackArrowSvg'
import { useSelector, useDispatch } from 'react-redux'
import { clearItems } from '../redux/slices/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const { totalPrice, items } = useSelector(state => state.cart)
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems())
    }
  }

  return (
    <div className="content">
      {items.length > 0 ? (
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title"><CartPageSvg />Корзина</h2>
              <div onClick={onClickClear} className="cart__clear"><BasketSvg /><span>Очистить корзину</span></div>
            </div>
            <div className="content__items">
              {items.map((item, i) =>
                <CartItem key={i} {...item} />)
              }
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link to={`/`} className="button button--outline button--add go-back-btn">
                  <BackArrowSvg /><span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
        :
        <InfoBox
          title='Корзина пустая'
          description='Вероятней всего, вы не заказывали ещё пиццу.  Для того, чтобы заказать пиццу, перейди на главную страницу.'
          buttonTitle='Вернуться назад'
          icon='😕'
          img='/img/empty-cart.png'
          alt='Корзина пустая'
        />
      }
    </div>
  )
}