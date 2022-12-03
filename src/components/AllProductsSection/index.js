import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    categoryId: '',
    searchInput: '',
    ratingId: '',
    isFailure: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, categoryId, searchInput, ratingId} = this.state

    const additionalQueryParameters = `&category=${categoryId}&title_search=${searchInput}&rating=${ratingId}`

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}${additionalQueryParameters}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else if (response.status === 401) {
      this.setState({isFailure: true, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="no-products-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="no-products-img-styles"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-para">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickCategory = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }

  onClickRating = ratingId => {
    this.setState({ratingId}, this.getProducts)
  }

  setSearchInput = searchInputValue => {
    console.log('searchInputValue------------------', searchInputValue)
    this.setState({searchInput: searchInputValue})

    // if (isEnterClicked === true) {
    //   console.log('Enter_value_logged-------------')
    //   this.getProducts()
    // }
  }

  onClickEnterKey = key => {
    if (key === 'Enter') {
      this.getProducts()
    }
    console.log('onKeyPress logged - - - - - - -', key)
  }

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-view-img-styles"
      />
      <h1 className="failure-view-heading">Oopps! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  clearFilters = () => {
    this.setState(
      {categoryId: '', searchInput: '', ratingId: ''},
      this.getProducts,
    )
  }

  render() {
    const {
      isLoading,
      activeOptionId,
      categoryId,
      searchInput,
      isFailure,
    } = this.state

    console.log('isFailure - @ -@ -2 05u09u89u', isFailure)

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searchInput={searchInput}
          setSearchInput={this.setSearchInput}
          onClickEnterKey={this.onClickEnterKey}
        />
        <div className="categories-and-products-container">
          <FiltersGroup
            categoryOptions={categoryOptions}
            onClickCategory={this.onClickCategory}
            ratingsList={ratingsList}
            onClickRating={this.onClickRating}
            activeCategoryId={categoryId}
            clearFilters={this.clearFilters}
          />
          {isFailure && this.renderFailureView()}
          {isLoading ? this.renderLoader() : this.renderProductsList()}
        </div>
      </div>
    )
  }
}

export default AllProductsSection
