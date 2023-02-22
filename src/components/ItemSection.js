import React from 'react'

import ItemCard from '../components/ItemCard'
import './ItemSection.css'

class ItemSection extends React.Component {
  static defaultProps = {
    items: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { items, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleItems = items.slice(0, limit || items.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visibleItems.length && (
          <div className="PostSection--Grid">
            {visibleItems.map((item, index) => (
              <ItemCard key={item.title + index} {...item} />
            ))}
          </div>
        )}
        {showLoadMore && visibleItems.length < items.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ItemSection
