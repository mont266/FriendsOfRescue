import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Accordion from '../components/Accordion'

// Export Template for use in CMS preview
export const ComponentsPageTemplate = ({
  title,
  subtitle,
  section1,
  section2,
  section3,
  section4,
  video,
  backgroundImage,
  dogAccordion,
  catAccordion,
  fosterAccordion
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
    />
    <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>

    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section2} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Accordion items={dogAccordion} />
      </div>
    </section>

    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section3} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Accordion items={catAccordion} />
      </div>
    </section>

    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section4} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Accordion items={fosterAccordion} />
      </div>
    </section>
  </main>
)

const ComponentsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ComponentsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ComponentsPage

export const pageQuery = graphql`
  query ComponentsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        video
        section1
        section2
        section3
        section4
        backgroundImage
        dogAccordion {
          title
          description
        }
        catAccordion {
          title
          description
        }
        fosterAccordion {
          title
          description
        }
      }
    }
  }
`
