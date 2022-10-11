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

 React.useEffect(() => {
  async function fetchData() {
      try {
        const [pizzasResponse] = await Promise.all([
          axios.get(pizzasUrl)
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