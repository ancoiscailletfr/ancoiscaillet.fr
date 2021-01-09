import PropTypes from 'prop-types'
import React, { Children } from 'react'
import { motion, useCycle } from 'framer-motion'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * flip card
 * box rotate X on click
 * @param children first child display front second back
 * @returns {JSX.Element}
 * @constructor
 */
const FlipCard = ({ children, ...props }) => {
  const [clicked, flip] = useCycle(false, true)
  return (
    <motion.div
      css={[xw`cursor-pointer w-full`, css`perspective: 500px;`]}
      style={{ rotateX: 0 }}
      whileHover={{ rotateX: [0, -10, 0] }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      onClick={() => flip()}
      {...props}
    >
      <motion.div
        css={[xw`relative w-full h-full text-center`, css`backface-visibility: hidden;`]}
        variants={flipCard}
        style={{ transformStyle: 'preserve-3d' }}
        animate={clicked ? 'front' : 'back'}
        transition={{ duration: 0.5, timer: [0.175, 0.885, 0.32, 1.275] }}
      >
        {Children.map(children, (child, i) => (
          <div
            css={[xw`relative h-full`, i === 1 && xw`absolute inset-0`, css`backface-visibility: hidden`,
              i === 0 ? css`transform: rotateX(180deg)` : xw`-z-10`]}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

const flipCard = {
  back: {
    rotateX: 180
  },
  front: {
    rotateX: 0
  }
}

FlipCard.propTypes = {
  children: PropTypes.any.isRequired
}

export default FlipCard
