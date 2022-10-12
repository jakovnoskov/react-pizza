import React from 'react'
import SearchSvg from '../../svg/SearchSvg'
import ClearSearchSvg from '../../svg/ClearSearchSvg'

import styles from './Search.module.scss'

export const Search = () => {

  const onClickClear = () => {
    //dispatch(setSearchValue(''));
    //setValue('');
    //inputRef.current?.focus();
  }

  return (
    <div className={styles.root}>
      <SearchSvg stylesIcon={styles.icon}/>
        <input 
          className={styles.input} 
          placeholder='Поиск пиццы...'
        />
      <ClearSearchSvg 
        onClickClear={onClickClear} 
        stylesIcon={styles.clearIcon}
      />
    </div>
  )
}