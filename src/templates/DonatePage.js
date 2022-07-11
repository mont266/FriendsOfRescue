import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Accordion from '../components/Accordion'
import { Messenger } from '../components/Messenger.js'

// Export Template for use in CMS preview
export const DonatePageTemplate = ({
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
    <Messenger />
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
    />
    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section1} />
      </div>
    </section>

    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section2} />
      </div>
    </section>

    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section3} />
      </div>
    </section>

    <section className="section">
      <div className="container" style={{ 'text-align': 'center' }}>
        <Content source={section4} />
      </div>
    </section>
  </main>
)

const Donate = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DonatePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default Donate

export const pageQuery = graphql`
  query Donate($id: String!) {
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
