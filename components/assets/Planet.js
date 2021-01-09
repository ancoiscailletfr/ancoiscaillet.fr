import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import xw from 'xwind'
import { css } from '@emotion/react'

const Planet = ({ planet, satellite }) => {
  const ref = useRef(null)
  const [pos, setPos] = useState([null, null, null, null])
  const { scrollYProgress, scrollY } = useViewportScroll()
  const rotateSat = useTransform(scrollYProgress, [0, 1], [0, 2400])
  const rotateOrbit = useTransform(scrollY, pos, ['-45deg', '0deg', '0deg', '45deg'])
  const scaleAll = useTransform(scrollY, pos, [1, 1.7, 1.7, 1])
  const scaleP = useTransform(scrollY, pos, [0, 0.6, 0.6, 0])
  const scaleO = useTransform(scrollY, pos, [0, 1, 1, 0])

  const updatePos = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const right = window.scrollY + rect.bottom - rect.height / 2 - rect.height / 12 + 150
      const left = window.scrollY + rect.top - rect.height / 2 - rect.height / 12 - 150
      const center = (left + right) / 2
      setPos([left, center - 150, center + 150, right])
    }
  }

  useEffect(() => {
    updatePos()
    window.addEventListener('resize', updatePos, false)
    return () => {
      window.removeEventListener('resize', updatePos, false)
    }
  }, [])

  // noinspection HtmlDeprecatedTag
  return (
    <div ref={ref} css={[xw`absolute inset-0 -z-10`, css`transform: translateZ(-150px) scale(1.2125)`]}>
      <motion.svg
        css={xw`text-gray-platinum z-0`}
        style={{ originX: '50%', originY: '50%', scale: scaleAll }}
        height='100%' width='100%'
        viewBox='0 0 1000 1000'
      >
        <motion.g style={{ originX: '50%', originY: '200%', rotate: rotateOrbit }}>
          <Orbit cx='50%' cy='200%' r='150%' />
          <motion.g style={{ scale: scaleP }}>
            {planet}
          </motion.g>
          <motion.g style={{ originX: '50%', originY: '50%', rotate: rotateSat, scale: scaleO }}>
            <Orbit cx='50%' cy='50%' r='40%' />
            <image
              css={css`width: 10%; height: 10%`}
              x='50%' y='5%'
              width={16} height={16}
              href={`/images/${satellite}.svg`}
            />
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  )
}

const Orbit = styled.circle(xw`
  stroke-2 lg:stroke-1 stroke-current 
  opacity-25 fill-none
`)

Planet.propTypes = {
  inView: PropTypes.bool,
  planet: PropTypes.node,
  satellite: PropTypes.string.isRequired
}

export default Planet
