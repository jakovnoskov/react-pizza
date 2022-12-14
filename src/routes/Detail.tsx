import { useState, useEffect } from 'react'
import { addItem } from '../redux/cart/slice'
import { GlobalLoader } from '../components/GlobalLoader'
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../svg/PlusSvg'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { selectCartItemById } from '../redux/cart/selectors'

const typeNames = ['тонкое', 'традиционное']

type PizzaItem = {
  id: string,
  imageUrl: string,
  name: string,
  description: string,
  types: number[],
  sizes: number[],
  price: number,
  count: number,
}

export default function Detail() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItem = useSelector(selectCartItemById(params.id as string))
  const addedCount = cartItem ? cartItem.count : 0

  const [activeType, setactiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pizza, setPizza] = useState<PizzaItem>({
    "id": '0',
    "imageUrl": '',
    "name": '',
    "description": '',
    "types": [],
    "sizes": [],
    "price": 0,
    "count": 0,
  })

  const onClickSize = (i: number) => setActiveSize(i)
  const onClickType = (i: number) => setactiveType(i)
  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
      count: pizza.count,
    }
    dispatch(addItem(item))
  }

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63448999dcae733e8fe1045c.mockapi.io/items/${params.id}`)
        setPizza(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        alert('Ошибка при получении пицы!')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (loading) return <GlobalLoader smalMode={false} />

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
              <div className='pizza-block__description'>{pizza.description}</div>
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