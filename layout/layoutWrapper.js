import PropTypes from 'prop-types'
import React from 'react'

import HomeLayout from '@/layout/home'

/**
 * page layouts
 * todo => add blog, articles...
 * @type {{home: (function({children: *}): JSX.Element)}}
 */
const layouts = {
  home: HomeLayout
}

const LayoutWrapper = (props) => {
  // to get the text value of the assigned layout of each component
  const Layout = layouts[props.children.type.layout]
  // if we have a registered layout render children with said layout
  if (Layout) {
    return <Layout {...props}>{props.children}</Layout>
  }
  return <>{props.children}</>
}

LayoutWrapper.propTypes = {
  children: PropTypes.any
}

export default LayoutWrapper
