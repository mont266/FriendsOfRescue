import React from 'react'
import PropTypes from 'prop-types'

import Content from './Content'
import './PageHeader.css'
import BackgroundVideo from './BackgroundVideo'

const PageHeaderVideo = ({
  title,
  subtitle,
  backgroundVideo,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundVideo && (
        <BackgroundVideo poster={backgroundImage}>
        {backgroundVideo && <source src={backgroundVideo} type="video/mp4" />}
      </BackgroundVideo>
      )}
      <div className="container relative">
        <h1 className="PageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  )
}

PageHeaderVideo.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeaderVideo
