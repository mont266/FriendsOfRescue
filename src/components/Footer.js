import GatsbyImage from 'gatsby-image'
import React from 'react'
import './Footer.css'
import { Link } from 'gatsby'
import {Facebook, Instagram} from 'react-feather'
import talismanlogo from '../../public/images/talismanwebs.png'

export default () => (
  <div>
    <footer className="footer">
    <div className="flogo">
            <a href="http://www.talismanwebs.com"><img src={talismanlogo} alt="Talisman Webs Logo" /></a>
          </div>
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Developed by{' '}
          <a href="https://talismanwebs.com/">Talisman Webs</a>
          </span>
          </div>
          <div className="container taCenter">
          <a href="https://www.facebook.com/friendsofrescueireland" target="blank"><Facebook></Facebook></a>
          <a href="https://www.instagram.com/friendsofrescueni" target="blank"><Instagram></Instagram></a>
      </div>
    </footer>
  </div>
)
