import { useRef, useState, useCallback } from 'react'
import SearchSvg from '../../svg/SearchSvg'
import ClearSearchSvg from '../../svg/ClearSearchSvg'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { setSearchValue } from '../../redux/slices/filterSlice'

export const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 300),
    [],
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <SearchSvg stylesIcon={styles.icon}/>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
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