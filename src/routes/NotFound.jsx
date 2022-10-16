import { useRouteError } from "react-router-dom"
import InfoBox from "../components/InfoBox"

export default function NotFound() {
  const error = useRouteError()
  console.error(error)

  return <InfoBox
    title='Страница не найдена'
    description='Страница либо удалена, либо её тут и не было - проверьте адрес.'
    buttonTitle='Вернуться назад'
    icon='😕'
    img='/img/empty-cart.png'
    alt='Страница не найдена'
  />
}