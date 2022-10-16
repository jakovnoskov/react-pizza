import React from 'react'
import { useRouteError } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'

//type Ierror = {}

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.log(error)
  return <InfoBox
    title='Извините, произошла непредвиденная ошибка.'
    description={error?.statusText || error?.message}
    buttonTitle='Вернуться назад'
    icon='😕'
    img='/img/empty-cart.png'
    alt='Упс!'
  />
}