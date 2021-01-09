/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import AvailableStatus from '@/components/assets/AvailableStatus'
import xw from 'xwind'
import { connect } from 'react-redux'

/**
 * Copola component
 * SSR: false
 * @returns {JSX.Element}
 * @constructor
 */
const Copola = ({ available }) => {
  // capture scroll on viewport
  const { scrollYProgress } = useViewportScroll()
  const statusTooltip = useRef()

  /**
   * show tooltip
   * onMouseMove event fires when the user moves the mouse on status indicator (circle)
   * @param evt give current mouse position used to place tooltip
   */
  const showStatusTooltip = (evt) => {
    statusTooltip.current.style.display = 'block'
    statusTooltip.current.style.left = evt.pageX + 10 + 'px'
    statusTooltip.current.style.top = evt.pageY + 10 + 'px'
  }

  /**
   * hide tooltip
   * onMouseOut event fires when the mouse leaves status indicator (circle)
   */
  const hideStatusTooltip = () => {
    statusTooltip.current.style.display = 'none'
  }

  const translateTrapezoidsBotOnScroll = useTransform(scrollYProgress, [0, 0.05], [0, 50])
  const translateTrapezoidsTopOnScroll = useTransform(scrollYProgress, [0, 0.05], [0, -50])
  const reduceCopolaCircleRadiusOnScroll = useTransform(scrollYProgress, [0, 0.05], [100, 0])
  const reduceStatusCircleRadius = useTransform(scrollYProgress, [0, 0.05], [15, 0])

  // noinspection HtmlDeprecatedTag
  return (
    <CopolaWrapper>
      <CopolaSvg viewBox='0 0 400 400' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <filter id='dropShadow' y='-50%' x='-50%' width='180%' height='180%'>
            <feOffset result='offOut' in='SourceGraphic' dx='0' dy='0' />
            <motion.feGaussianBlur result='blurOut' in='offOut' animate={{ stdDeviation: [0, 4, 4, 2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>
          <mask id='clipSpace'>
            <motion.g initial={{ y: -50 }} animate={{ y: 0 }} style={{ y: translateTrapezoidsTopOnScroll }}>
              <polygon points='125,45 275,45 250,80 150,80' fill='#ffffff' />
              <polygon points='28,187 103,58 121,97 71,183' fill='#ffffff' />
              <polygon points='297,58 372,187 329,183 279,97' fill='#ffffff' />
            </motion.g>
            <motion.g initial={{ y: 50 }} animate={{ y: 0 }} style={{ y: translateTrapezoidsBotOnScroll }}>
              <polygon points='297,342 372,213 329,217 279,303' fill='#ffffff' />
              <polygon points='28,213 103,342 121,303 71,217' fill='#ffffff' />
              <polygon points='125,355 275,355 250,320 150,320' fill='#ffffff' />
            </motion.g>
          </mask>
          <mask id='clipFace'>
            <motion.circle cx='200' cy='200' style={{ r: reduceCopolaCircleRadiusOnScroll }} fill='#ffffff' />
          </mask>
        </defs>
        <image
          css={xw`h-full w-full`}
          mask='url(#clipSpace)'
          xlinkHref={Modernizr.webp ? '/images/space.webp' : '/images/space.jpg'}
          height={400} width={400}
          preserveAspectRatio='xMidYMid slice'
        />
        <image
          css={xw`h-full w-full`}
          mask='url(#clipFace)' filter='inset-shadow'
          xlinkHref={Modernizr.webp ? '/images/face.webp' : '/images/face.jpg'}
          height={400} width={400}
          preserveAspectRatio='xMidYMid slice'
        />
        <motion.circle
          css={[available ? xw`text-status-available` : xw`text-status-unavailable`, xw`fill-current`]}
          onMouseMove={(evt) => showStatusTooltip(evt)}
          onMouseOut={() => hideStatusTooltip()}
          filter='url(#dropShadow)'
          cx='271' cy='271' r='15'
          transition={{ duration: 2, repeat: Infinity }}
          style={{ r: reduceStatusCircleRadius }}
        />
      </CopolaSvg>
      <StatusTooltip ref={statusTooltip}>
        <span>
          <AvailableStatus />
        </span>
      </StatusTooltip>
    </CopolaWrapper>
  )
}

const CopolaWrapper = styled.div(xw`
  relative left-0
  h-6/12 md[h-2/3] hmd:h-full
  overflow-hidden
`)

const CopolaSvg = styled.svg(xw`
  absolute h-full max-w-md hmd:h-4/5
  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
`)

const StatusTooltip = styled.div(xw`
  fixed hidden
  text-xs text-gray-platinum tracking-tighter font-light
  rounded p-2 bg-gray-900
  shadow-lg
`)

const mapStateToProps = (state) => ({
  available: state.api.us.available
})

Copola.propTypes = {
  available: PropTypes.bool
}

export default connect(mapStateToProps, null)(Copola)
