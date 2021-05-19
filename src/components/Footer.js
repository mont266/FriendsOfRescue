import GatsbyImage from 'gatsby-image'
import React from 'react'
import './Footer.css'
import { Link } from 'gatsby'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Developed by{' '}
          <a href="https://talismanwebs.com/">Talisman Webs</a> &middot; <Link to="/about/">Policies</Link>
        </span>
      </div>
    </footer>
  </div>
)
