import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SingleItem.css'

export const SingleItemTemplate = ({
  title,
  date,
  body,
  purchaseURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/Blogiteming"
    >
      <div className="container skinny">
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
            {purchaseURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={purchaseURL}
              >
                Purchase
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SingleItem for front-end
const SingleItem = ({ data: { item, allitems } }) => {
  const thisEdge = allitems.edges.find(edge => edge.node.id === item.id)
  return (
    <Layout
      meta={item.frontmatter.meta || false}
      title={item.frontmatter.title || false}
    >
      <SingleItemTemplate
        {...item}
        {...item.frontmatter}
        body={item.html}
        nextitemURL={_get(thisEdge, 'next.fields.slug')}
        previtemURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleItem

export const pageQuery = graphql`
  ## Query for SingleItem data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleItem($id: String!) {
    item: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        categories {
          category
        }
      }
    }

    allitems: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "items" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
