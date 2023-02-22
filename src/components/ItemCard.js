import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './ItemCard.css'

const ItemCard = ({
  featuredImage,
  purchaseURL,
  title,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={purchaseURL} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
    </div>
  </Link>
)

export default ItemCard
