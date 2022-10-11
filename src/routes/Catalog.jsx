import React from 'react'
import Сategories from '../components/Сategories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import pizzas from '../assets/db.json'

export default function Catalog() {
  return (
  <div className='content'>
    <div className='container'>
      <div className='content__top'>
        <Сategories/>
        <Sort/>
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {pizzas.map((item, i) => <PizzaBlock key={i + Number(item.id)} { ...item}/>)}
      </div>
    </div>
  </div>
  )
}
