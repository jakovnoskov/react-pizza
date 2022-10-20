import React, { useRef, useState, useCallback, useEffect } from 'react'
import SearchSvg from '../../svg/SearchSvg'
import ClearSearchSvg from '../../svg/ClearSearchSvg'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { setSearchValue } from '../../redux/filter/slice'
import { selectFilter } from '../../redux/filter/selectors'
import { useSearchParams } from 'react-router-dom'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchValue } = useSelector(selectFilter)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 300),
    [],
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
    // setSearchParams({
    //   search: event.target.value
    // })
  }

  // useEffect(() => {
  //   const searchUpar = searchParams.get('search')
  //   if (searchUpar) {
  //     setValue(searchUpar)
  //     dispatch(setSearchValue(searchUpar))
  //   }
  //   return
  // }, [])

  return (
    <div className={styles.root}>
      <SearchSvg />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      <ClearSearchSvg
        onClickClear={onClickClear}
      />
    </div>
  )
}