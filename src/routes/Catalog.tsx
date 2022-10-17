import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { categoriesList, Сategories } from '../components/Сategories'
import { sortList, Sort } from '../components/Sort'
import { PizzaBlock } from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Search } from '../components/Search'
import { Pagination } from '../components/Pagination'
import { selectFilter, setCategory, setCurrentPage, Category, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'
import { InfoBox } from '../components/InfoBox'
import { SearchPizzaParams } from '../redux/pizza/types'


export const Catalog: React.FC = () => {
  const dispatch = useDispatch()
  //const dispatch = useAppDispatch();

  const { category, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = (idx: Category) => {
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
    const page = String(currentPage)
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
        page,
      }),
    )
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    getPizzas()
  }, [category.id, sort.sortProperty, searchValue, currentPage])

  // Парсим параметры при первом рендере
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
      const category = categoriesList.find((obj) => obj.id === Number(params.category))

      dispatch(
        setFilters({
          searchValue: params.search,
          category: category || categoriesList[0],
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      )
    }
    //isMounted.current = true;
  }, []);

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
            alt='Произошла ошибка'
          />
        ) : (
          <>
            <div className='content__top'>
              <Сategories value={category} onChangeCategory={onChangeCategory} />
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
