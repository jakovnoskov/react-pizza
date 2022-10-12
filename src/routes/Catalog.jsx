//import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId} from '../redux/slices/filterSlice'

import Сategories from '../components/Сategories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import pizzasJson from '../assets/db.json'
import { Search } from '../components/Search' 
//import { Pagination } from '../components/Pagination'

export default function Catalog() {
  const dispatch = useDispatch()
  const {categoryId, sort} = useSelector(state => state.filter)
  const sortType = sort.sortProperty


  const status = ''
  const pizzas = pizzasJson.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const onChangeCategory = (index) => {
    //console.log('onChangeCategory index', categoryId)
    dispatch(setCategoryId(index))
  }

  return (
  <div className='content'>
    <div className='container'>
      <div className='content__top'>
        <Сategories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
      </div>
      <div className='info__wrapper'>
        <h2 className='content__title'>Все пиццы</h2>
        <Search/>
      </div>
      <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      {/*<Pagination currentPage={currentPage} onChangePage={onChangePage}/>*/}
    </div>
  </div>
  )
}
