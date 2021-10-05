import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * the rotating planet behind verse container
 * moving/transforming on the orbit according to viewport scrolling
 * mark- possible way of improving the existing system by using WebGL
 * @param planet an svg 'standardized'
 * @param satellite an other svg
 * @returns {JSX.Element}
 * @constructor
 */
const RotatingPlanet = ({ planet, satellite }) => {
  const ref = useRef(null)
  const [scrollYRange, setScrollYRange] = useState([null, null, null, null])

  const { scrollYProgress, scrollY } = useViewportScroll()
  const rotateSat = useTransform(scrollYProgress, [0, 1], [0, 2400])
  const rotateOrbit = useTransform(scrollY, scrollYRange, ['-45deg', '0deg', '0deg', '45deg'])
  const scaleAll = useTransform(scrollY, scrollYRange, [1, 1.7, 1.7, 1])
  const scalePlanet = useTransform(scrollY, scrollYRange, [0, 0.6, 0.6, 0])
  const scaleOrbit = useTransform(scrollY, scrollYRange, [0, 1, 1, 0])

  /**
   * compute scrollY range, a linear series of numbers, according to viewport
   * this series is used as input range by useTransform
   * recalculated on viewport resize
   */
  const computeScrollYRange = () => {
    if (ref.current) {
      // noinspection JSUnresolvedFunction
      const rect = ref.current.getBoundingClientRect()
      const right = window.scrollY + rect.bottom - rect.height / 2 - rect.height / 12 + 150
      const left = window.scrollY + rect.top - rect.height / 2 - rect.height / 12 - 150
      const center = (left + right) / 2
      setScrollYRange([left, center - 150, center + 150, right])
    }
  }

  useEffect(() => {
    computeScrollYRange()
    window.addEventListener('resize', computeScrollYRange, false)
    return () => {
      window.removeEventListener('resize', computeScrollYRange, false)
    }
  }, [])

  // noinspection HtmlDeprecatedTag - cause '<image>' it's not html but svg 🙄
  return (
    <div ref={ref} css={[xw`absolute inset-0 -z-20`, css`transform: translateZ(-150px) scale(1.2125)`]}>
      <motion.svg
        css={xw`text-gray-platinum`}
        style={{ originX: '50%', originY: '50%', scale: scaleAll }}
        height='100%' width='100%'
        viewBox='0 0 1000 1000'
      >
        <motion.g style={{ originX: '50%', originY: '200%', rotate: rotateOrbit }}>
          <Orbit cx='50%' cy='200%' r='150%' />
          <motion.g style={{ scale: scalePlanet }}>
            {planet}
          </motion.g>
          <motion.g style={{ originX: '50%', originY: '50%', rotate: rotateSat, scale: scaleOrbit }}>
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

RotatingPlanet.propTypes = {
  planet: PropTypes.node.isRequired,
  satellite: PropTypes.string.isRequired
}

export default RotatingPlanet
