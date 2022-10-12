import { useState } from 'react'
import {Link} from 'react-router-dom'
import CartSvg from '../../svg/CartSvg'
import LogoPizzaSvg from '../../svg/LogoPizzaSvg'

export default function Header() {

  return (
    <header className='header'>
    <div className='container'>
      <Link to={'/'}>
      <div className='header__logo'>
        <LogoPizzaSvg width={38}/>
        <div>
          <h1>React Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
      </Link>
      <div className='header__cart'>
        <Link to={'cart'}>
          <button className='button button--cart'>
          <span className='totalPrice'>520 ₽</span>
          <div className='button__delimiter'></div>
          <CartSvg/>
          <span>3</span>
          </button>
        </Link>
      </div>
    </div>
  </header>
  )
}