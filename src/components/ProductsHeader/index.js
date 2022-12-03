import {BsFilterRight} from 'react-icons/bs'
import {FcSearch} from 'react-icons/fc'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {
    sortbyOptions,
    activeOptionId,
    searchInput,
    setSearchInput,
    onClickEnterKey,
  } = props

  //   let isEnterClicked = false

  const onKeyPressInput = event => {
    onClickEnterKey(event.key)
    // if (event.key === 'Enter') {
    //   console.log('Enter key logged', event.key)
    //   isEnterClicked = true
    // }
    // console.log(event.key)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
    console.log('event-key-------------------', event.target.value)
  }

  //   function eventKeyDisplay(event) {
  //     console.log(event.key)
  //   }

  //   onChangeSearchInput.addEventListener('keydown', eventKeyDisplay)

  return (
    <div className="products-header">
      <div className="search-input-container">
        <input
          type="search"
          className="search-input-styles"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyPress={onKeyPressInput}
        />
        <FcSearch className="search-icon-styles" />
      </div>

      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
