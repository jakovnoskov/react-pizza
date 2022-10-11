import React,{useState} from 'react'
import Сategories from '../components/Сategories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import pizzasJson from '../assets/db.json'

export default function Catalog() {
  const [categoryId, setCategoryId] = useState(0)


  const status = ''
  const pizzas = pizzasJson.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const onChangeCategory = (index) => {
    setCategoryId(index)
  }

  return (
  <div className='content'>
    <div className='container'>
      <div className='content__top'>
        <Сategories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort value={sort}/>
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
    </div>
  </div>
  )
}
