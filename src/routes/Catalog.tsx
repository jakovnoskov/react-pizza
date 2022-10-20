import React, { useRef, useEffect, useLayoutEffect } from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { categoriesList, Сategories, sortList, SortPopup, PizzaBlock, Skeleton, Search, Pagination, InfoBox } from '../components'
import { setCategory, setCurrentPage, setFilters, setSearchValue, setSort } from '../redux/filter/slice'
import { SearchPizzaParams } from '../redux/pizza/types'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { Category, FilterSliceState } from '../redux/filter/types'
import { fetchPizzas } from '../redux/pizza/asyncActions'
import { selectPizzaData } from '../redux/pizza/selectors'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LooseObject } from '../@types/appType'

export const Catalog: React.FC = () => {
  //const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const { category, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = React.useCallback((idx: Category) => {
    dispatch(setCategory(idx))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    let params: LooseObject = {}

    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const categoryId = category.id > 0 ? String(category.id) : ''
    const search = searchValue

    console.log('sortBy //', sortBy)
    console.log('order //', order)
    console.log('categoryId //', categoryId)
    console.log('search //', search)
    console.log('category URL //', searchParams.get('category'))



    /* if (!isMounted.current) {*/
    const pageUpar = searchParams.get('page')
    const sortUpar = searchParams.get('sort')
    const categoryUpar = searchParams.get('category')
    const searchUpar = searchParams.get('search')
    const orderUpar = searchParams.get('order')

    params.sortBy = sortUpar ? sortUpar : sortBy
    params.order = orderUpar ? orderUpar : order
    params.category = categoryUpar && categoryUpar != '0' ? categoryUpar : categoryId
    params.search = searchUpar ? searchUpar : searchValue
    params.page = pageUpar ? pageUpar : String(currentPage)
    console.log('ветка один', params)
    /*} else {
      params = {
        sortBy,
        order,
        category: categoryId,
        search,
        currentPage: String(currentPage),
      }
      console.log('ветка два', params)
    }*/

    dispatch(fetchPizzas(params))
    //window.scrollTo(0, 0)
  }

  /**/
  useEffect(() => {
    //console.log('Если изменили параметры и был первый рендер', isMounted.current)
    if (isMounted.current) {
      const params: LooseObject = {}
      if (searchValue) params.search = searchValue
      if (currentPage) params.page = currentPage
      if (sort.sortProperty) params.sort = sort.sortProperty
      if (category) params.category = category.id
      setSearchParams(params)
      getPizzas()
      console.log('FECH после изменения параметров', params)
    }
  }, [category.id, sort.sortProperty, searchValue, currentPage])


  useLayoutEffect(() => {

    // console.log('Если изменили параметры и был первый рендер', isMounted.current)
    // console.log('currentPage in URL -- ', searchParams.get('page'))
    // console.log('sort in URL -- ', searchParams.get('sort'))
    // console.log('category in URL -- ', searchParams.get('category'))

    const pageUpar = searchParams.get('page')
    const sortUpar = searchParams.get('sort')
    const categoryUpar = searchParams.get('category')
    const searchUpar = searchParams.get('search')

    // console.log('sortUpar OBJ-- ', sortList[Number(sortUpar)])
    // console.log('categoryUpar OBJ-- ', categoriesList[Number(categoryUpar)])
    // const sortObj = sortList.find((obj) => obj.sortProperty === sortUpar)
    //const categoryObj = categoriesList.find((obj) => obj.id === Number(categoryUpar))
    const sortIndex = sortUpar ? sortList.findIndex((obj) => obj.sortProperty === sortUpar) : 0;
    const categoryIndex = categoryUpar ? categoriesList.findIndex((obj) => obj.id === Number(categoryUpar)) : 0;

    // устанавливаем параметры фильтров которые пришли из url
    // (async () => { await  })()
    dispatch(
      setFilters({
        searchValue: searchUpar ? searchUpar : '',
        category: categoriesList[categoryIndex],
        currentPage: Number(pageUpar ? pageUpar : currentPage),
        sort: sortList[sortIndex],
      }),
    );

    // console.log('search in URL -- ', searchParams.get('search'))
    // console.log('searchUpar -- ', typeof searchUpar)
    console.log('search in REDUX -- ', searchValue);
    console.log('currentPage in REDUX -- ', currentPage);

    // if (categoryUpar) dispatch(setCategory(categoriesList[categoryIndex]));
    // if (sortUpar) dispatch(setSort(sortList[sortIndex]));
    // if (pageUpar) dispatch(setCurrentPage(Number(pageUpar ? pageUpar : currentPage)));
    // if (searchUpar) dispatch(setSearchValue(searchUpar));

    (async () => {
      console.log(1);
      await getPizzas();
      console.log(2);
      isMounted.current = true;
    })();
    // console.log('FECH при первом рендере', searchValue);
    // console.log(1);
    // getPizzas();
    // console.log(2);
    // isMounted.current = true;
  }, [])

  // // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   console.log('Если изменили параметры и был первый рендер', isMounted.current)

  //   if (isMounted.current) {
  //     const params = {
  //       category: category.id > 0 ? category.id : null,
  //       sort: sort.sortProperty,
  //       currentPage: Number(currentPage),
  //     }

  //     const queryString = qs.stringify(params, { skipNulls: true })
  //     // console.log('queryString', queryString)
  //     // console.log('currentPage', currentPage)
  //     // console.log('category', category)
  //     navigate(`/?${queryString}`);
  //   }
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
  //     const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy)
  //     const categoryObj = categoriesList.find((obj) => obj.id === Number(params.category))

  //     console.log('window', qs.parse(window.location.search.substring(1)).search)
  //     console.log('params', params)
  //     console.log('sortObj', sortObj)
  //     console.log('categoryObj', categoryObj)

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         category: categoryObj || categoriesList[0],
  //         currentPage: Number(params.currentPage),
  //         sort: sortObj || sortList[0],
  //       }),
  //     )
  //   } /*loc*/
  //   getPizzas()
  // }, [category.id, sort.sortProperty, searchValue, currentPage])


  // Парсим параметры при первом рендере
  // useEffect(() => {
  //   //console.log('Парсим параметры при первом рендере')

  //   if (window.location.hash) {
  //     // const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
  //     // const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
  //     // const category = categoriesList.find((obj) => obj.id === Number(params.category))

  //     const url = window.location.hash.replace(/[-+#/?()\s]/g, '')
  //     //url = url.replace(/[-+#/?()\s]/g, '')

  //     console.log('url -- ', url)
  //     // console.log('url parce -- ', qs.parse(url))

  //     const params = qs.parse(url) as unknown as SearchPizzaParams

  //     //setSearchParams(window.location.hash)
  //     console.log('params', params)
  //     //console.log('searchParams', searchParams)

  //     // const ssort = params.sort
  //     // const sortObj = sortList.find((obj) => obj.sortProperty == params.sort)
  //     // const categoryObj = categoriesList.find((obj) => obj.id === Number(params.category))

  //     // console.log('window', qs.parse(window.location.search.substring(1)).search)

  //     // console.log('sortObj', sortObj)
  //     // console.log('categoryObj', categoryObj)

  //     // dispatch(
  //     //   setFilters({
  //     //     searchValue: params.search ? params.search : '',
  //     //     category: categoryObj || categoriesList[0],
  //     //     currentPage: params.currentPage ? Number(params.currentPage) : 1,
  //     //     sort: sortObj || sortList[0],
  //     //   }),
  //     // )
  //   }
  //   //isMounted.current = true
  // }, [])

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
              <SortPopup value={sort} />
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
