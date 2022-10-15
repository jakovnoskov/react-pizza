import { useState, useEffect } from 'react'
import { addItem, selectCartItemById } from '../redux/slices/cartSlice'
import GlobalLoader from "../components/GlobalLoader";
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../svg/PlusSvg'
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

const typeNames = ['тонкое', 'традиционное']

export default function Detail() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItem = useSelector(selectCartItemById(params.id))
  const addedCount = cartItem ? cartItem.count : 0

  const [activeType, setactiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [pizza, setPizza] = useState(0)

  const onClickSize = (i) => setActiveSize(i)
  const onClickType = (i) => setactiveType(i)
  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
    }
    dispatch(addItem(item))
  }

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63448999dcae733e8fe1045c.mockapi.io/items/${params.id}`)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пицы!')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <GlobalLoader />;
  }

  return (
    <div className='content'>
      <div className='container'>

        <div className='pizza-block-wrapper'>
          <div className='pizza-detail-block'>
            <div className='pizza-detail-img'>
              <img
                className='pizza-block__image'
                src={pizza.imageUrl}
                alt='Pizza'
              />
            </div>
            <div className='pizza-detail-info'>
              <h4 className='pizza-block__title'>{pizza.name}</h4>
              <div className='pizza-block__selector'>
                <ul>
                  {pizza.types.length >= 0 &&
                    (pizza.types.map((type, i) => (
                      <li
                        onClick={() => onClickType(i)}
                        className={activeType === i ? 'active' : ''}
                        key={`typeId${i}`}>
                        {typeNames[type]}
                      </li>
                    )))}
                </ul>
                <ul>
                  {pizza.sizes.length > 0 &&
                    (pizza.sizes.map((size, i) => (
                      <li
                        onClick={() => onClickSize(i)}
                        className={activeSize === i ? 'active' : ''}
                        key={`sizeId${i}`}>
                        {size} см.
                      </li>
                    )))}
                </ul>
              </div>
              <div className='pizza-block__bottom'>
                <div className='pizza-block__price'>от {pizza.price} ₽</div>
                <button
                  onClick={onClickAdd}
                  className='button button--outline button--add'>
                  <PlusSvg />
                  <span>Добавить</span>
                  {addedCount > 0 && <i>{addedCount}</i>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}