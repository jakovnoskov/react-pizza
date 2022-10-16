import React from 'react'

type СategoriesProps = {
  value: number,
  onChangeCategory: any
}

export const Сategories: React.FC<СategoriesProps> = ({ value, onChangeCategory }) => {

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory({ name: categoryName, id: i })}
            className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}