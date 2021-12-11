import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import xw from 'xwind'

/**
 * basic overlay
 * @param children
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const Overlay = ({ children, ...props }) => (
  <>
    <OverlayStyled
      variants={backdrop}
      initial='hidden'
      animate='visible'
      exit='hidden'
      {...props}
    />
    {children}
  </>
)

const OverlayStyled = styled(motion.div)(xw`
  fixed top-0 left-0
  w-full h-full 
  bg-gray-900 bg-opacity-50
`)

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

export default Overlay
