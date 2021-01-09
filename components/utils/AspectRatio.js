import PropTypes from 'prop-types'
import React from 'react'
import xw from 'xwind'

const AspectRatio = ({ children, ...props }) => {
  return (
    <div {...props}>
      <div css={xw`pt-full`} />
      {children}
    </div>
  )
}

export default AspectRatio

AspectRatio.propTypes = {
  children: PropTypes.any.isRequired
}
