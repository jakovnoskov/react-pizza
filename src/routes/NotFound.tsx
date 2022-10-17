import React from 'react'
import { useRouteError } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'

export const NotFound: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  return <InfoBox
    title='Страница не найдена'
    description='Страница либо удалена, либо её тут и не было - проверьте адрес.'
    buttonTitle='Вернуться назад'
    icon='😕'
    alt='Страница не найдена'
  />
}