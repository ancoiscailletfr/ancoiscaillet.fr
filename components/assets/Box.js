import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * A stupid container box
 * @param children inner element
 * @param props box customisation
 * @returns {JSX.Element}
 * @constructor
 */
const Box = ({ children, ...props }) => (
  <BoxStyled {...props}>
    {children}
  </BoxStyled>
)

const BoxStyled = styled.div(xw`
   relative
   w-full h-full max-h-full
   flex flex-col 
   shadow-inner 
   rounded 
   p-1.5 md:p-3 lg:p-2.5 xl:p-4
   border border-solid
`,
css`
  box-shadow: inset 0.05rem 0.1rem 0 rgba(255,255,255,0.125)`
)

Box.propTypes = {
  children: PropTypes.any
}

export default Box
