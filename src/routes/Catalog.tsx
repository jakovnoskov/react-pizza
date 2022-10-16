import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Сategories } from '../components/Сategories'
import { Sort } from '../components/Sort'
import { PizzaBlock } from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Search } from '../components/Search'
import { Pagination } from '../components/Pagination'
import { selectFilter, setCategory, setCurrentPage } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'
import { InfoBox } from '../components/InfoBox'

export const Catalog: React.FC = () => {
  const dispatch = useDispatch()
  //const dispatch = useAppDispatch();

  const { category, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = (idx: number) => {
    dispatch(setCategory(idx))
  }

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const categoryId = category.id > 0 ? String(category.id) : ''
    const search = searchValue
    // console.log({
    //   sortBy,
    //   order,
    //   categoryId,
    //   search,
    //   currentPage,
    // })

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        categoryId,
        search,
        currentPage,
      }),
    )
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    getPizzas()
  }, [category.id, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='content'>
      <div className='container'>
        {status === 'error' ? (
          <InfoBox
            title='Произошла ошибка'
            description='К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.'
            buttonTitle='Вернуться назад'
            icon='😕'
            img=''
            alt=''
          />
        ) : (
          <>
            <div className='content__top'>
              <Сategories value={category.id} onChangeCategory={onChangeCategory} />
              <Sort />
            </div>
            <div className='info__wrapper'>
              <h2 className='content__title'>{category.name} пиццы</h2>
              <Search />
            </div>
            <div className='content__items'>
              {status === 'loading' ? skeletons : pizzas}
            </div>
            <Pagination
              currentPage={currentPage}
              onChangePage={onChangePage}
            />
          </>
        )}
      </div>
    </div>
  )
}
