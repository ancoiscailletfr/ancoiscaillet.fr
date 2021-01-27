import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * running device(s) icon(s)
 * used in projects
 * @param title device's name
 * @param content fontawesome icon(s)
 * @returns {JSX.Element}
 * @constructor
 */
const Device = ({ title, content }) => {
  const [isHovered, setHovered] = useState(false)
  return (
    <div css={xw`relative flex flex-row mr-2`}>
      {
        (content.length > 2)
          ? content.map((icon, i) => (
            <DeviceStyled
              key={i}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onTap={() => setHovered(v => !v)}
            >
              <FontAwesomeIcon icon={icon} />
            </DeviceStyled>
            ))
          : (
            <DeviceStyled
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onTap={() => setHovered(v => !v)}
            >
              <FontAwesomeIcon icon={content.length > 1 ? content : content[0]} />
            </DeviceStyled>
            )
      }
      {isHovered && (
        <AnimatePresence>
          <Tooltip style={{ x: '-50%' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {title}
          </Tooltip>
        </AnimatePresence>
      )}
    </div>
  )
}

const DeviceStyled = styled(motion.div)(xw`
  text-center text-base p-2 select-none
`)

const Tooltip = styled(motion.div)([xw`
  absolute bottom-full left-1/2 bg-gray-300 rounded-md text-xs text-gray-platinum p-2
`, css`
  &:after{
    content: " ";
    ${xw`absolute top-full left-1/2 border-4 border-solid transform -translate-x-1/2 text-gray-300`}
    border-color: currentColor transparent transparent transparent;
  }
`])

Device.propTypes = {
  content: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired
}

export default Device
