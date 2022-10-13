import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import '../scss/app.scss'

export default function Root() {
  const [pizzas, setPizzas] = useState([])
  const [globalLoading, setGlobalLoading] = useState(true)
  const  pizzasUrl = 'https://63448999dcae733e8fe1045c.mockapi.io/items'

// const sortBy = sort = sort.sortProperty.replace('-', '')
// const order = sort = sort.sortProperty.includes('-') ? 'asc' : 'desc'
// const category = categoryId > 0 ? `category=${categoryId}` : ''
// const search = searchValue > 0 ? `&search=${searchValue}` : ''
// const  pizzasUrl = `https://63448999dcae733e8fe1045c.mockapi.io/items?page=${currentPage}&sortBy=${sortBy}&order=${order}${search}`

 React.useEffect(() => {
  async function fetchData() {
    setGlobalLoading(true)
      try {
        const [pizzasResponse] = await Promise.all([
          axios.get(pizzasUrl),
        ])
        setPizzas(pizzasResponse.data)
      } catch (error) {
        console.error(error)
        alert('Ошибка при запрсе данных')
      }
      setGlobalLoading(false)
  }
  fetchData()
}, [])

  return (
    <div className='wrapper'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}