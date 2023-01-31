import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'
import { Messenger } from '../components/Messenger'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {items} object
 */
export const byDate = items => {
  const now = Date.now()
  return items.filter(item => Date.parse(item.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {items} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (items, title, contentType) => {
  const isCategory = contentType === 'itemCategories'
  const byCategory = item =>
    item.categories &&
    item.categories.filter(cat => cat.category === title).length
  return isCategory ? items.filter(byCategory) : items
}

// Export Template for use in CMS preview
export const ShopIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  items = [],
  itemCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredItems =
        items && !!items.length
          ? byCategory(byDate(items), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredItems = filteredItems.filter(item =>
          item.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Shop">
          <Messenger />
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!itemCategories.length && (
            <section className="section thin">
              <div className="container">
                <PostCategoriesNav enableSearch categories={itemCategories} />
              </div>
            </section>
          )}

          {!!items.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={filteredItems} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default BlogIndex for front-end
const ShopIndex = ({ data: { page, items, itemCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ShopIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      items={items.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter,
        ...item.node.fields
      }))}
      itemCategories={itemCategories.edges.map(item => ({
        ...item.node,
        ...item.node.frontmatter,
        ...item.node.fields
      }))}
    />
  </Layout>
)

export default ShopIndex

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query shopIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
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
