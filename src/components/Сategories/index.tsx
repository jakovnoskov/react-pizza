import React from 'react'

type CategoryItem = {
  id: number
  name: string
}

export const categoriesList: CategoryItem[] = [
  { id: 1, name: 'Все' },
  { id: 2, name: 'Мясные' },
  { id: 3, name: 'Вегетарианские' },
  { id: 4, name: 'Гриль' },
  { id: 5, name: 'Острые' },
  { id: 6, name: 'Закрытые' },
]

type СategoriesProps = {
  value: CategoryItem
  onChangeCategory: (idx: CategoryItem) => void
}

export const Сategories: React.FC<СategoriesProps> = ({
  value,
  onChangeCategory
}) => {

  return (
    <div className='categories'>
      <ul>
        {categoriesList.map((obj) => (
          <li
            key={obj.id}
            onClick={() => onChangeCategory(obj)}
            className={
              value.id === obj.id ?
                'active' :
                ''
            }>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
}