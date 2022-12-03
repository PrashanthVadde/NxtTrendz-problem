import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    activeCategoryId,
    onClickCategory,
    ratingsList,
    onClickRating,
    clearFilters,
  } = props
  console.log('categoryId----------', activeCategoryId)

  const onClickClearFilterButton = () => {
    clearFilters()
  }

  return (
    <div className="filters-group-container">
      <h1 className="category-heading">Category</h1>
      {/* Replace this element with your code */}
      <div className="categories-container">
        {categoryOptions.map(eachCategory => {
          const onClickCategoryButton = () => {
            onClickCategory(eachCategory.categoryId)
          }

          const classNameForActiveCategory =
            eachCategory.categoryId === activeCategoryId
              ? 'active-category-styles'
              : ''

          return (
            <button
              type="button"
              key={eachCategory.categoryId}
              className="category-btn-styles"
              onClick={onClickCategoryButton}
            >
              <p
                className={`category-item-styles ${classNameForActiveCategory}`}
              >
                {eachCategory.name}
              </p>
            </button>
          )
        })}

        <div />
        <h1 className="rating-text-heading">Rating</h1>

        <ul className="ratings-container">
          {ratingsList.map(eachRating => {
            const onClickRatingButton = () => {
              onClickRating(eachRating.ratingId)
            }

            return (
              <button
                type="button"
                className="rating-btn-styles"
                onClick={onClickRatingButton}
              >
                <li className="rating-up-text-container">
                  <img
                    src={eachRating.imageUrl}
                    alt={`rating ${eachRating.ratingId}`}
                    className="rating-images-styles"
                  />
                  <p>& up</p>
                </li>
              </button>
            )
          })}
        </ul>

        <button
          type="button"
          className="clear-filters-btn-styles"
          onClick={onClickClearFilterButton}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
