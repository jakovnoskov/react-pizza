import { useRouteError } from 'react-router-dom'
import InfoBox from '../components/InfoBox'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return <InfoBox
      title = 'Извините, произошла непредвиденная ошибка.'
      description = {error.statusText || error.message}
      buttonTitle = 'Вернуться назад'
      icon='😕'
      img='/img/empty-cart.png'
      alt='Упс!'
    />
}