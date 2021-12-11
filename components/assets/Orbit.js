import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Icon } from '@/components/assets/Badges'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * orbit with skills as planets
 * @param from rotate from
 * @param duration rotation duration
 * @param skills planets
 * @param ...props css
 * @returns {JSX.Element}
 * @constructor
 */
const Orbit = ({ from, duration, skills, ...props }) => {
  const [front, setFront] = useState(false)
  const to = from + 360
  return (
    <OrbitStyled
      animate={{ rotate: [from, to] }}
      transition={{ ease: 'linear', duration: duration, repeat: Infinity }}
      style={{ zIndex: front ? 9999 : 'auto' }}
      {...props}
    >
      {skills.map((skill, index) => {
        const [hovered, setHovered] = useState(false)
        return (
          <SkillWrapper
            key={index}
            index={index}
            length={skills.length}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => {
                setHovered(true)
                setFront(true)
              }}
              onHoverEnd={() => {
                setHovered(false)
                setFront(false)
              }}
              onTap={() => {
                setHovered(v => !v)
                setFront(v => !v)
                setTimeout(() => {
                  setHovered(false)
                  setFront(false)
                }, 1500)
              }}
            >
              <motion.div
                className='bubble'
                animate={{ rotate: [-from, -to] }}
                transition={{ ease: 'linear', duration: duration, repeat: Infinity }}
              >
                {hovered && (
                  <AnimatePresence>
                    <motion.span
                      className='pop'
                      style={{ boxShadow: 'inset -0.125rem -0.125rem 0 rgba(0,0,0,0.5)', zIndex: -1 }}
                      initial={{ opacity: 0, paddingLeft: '0rem' }}
                      animate={{ opacity: 1, paddingLeft: '3.25rem' }}
                      exit={{ opacity: 0, paddingLeft: '0rem' }}
                    >
                      {skill.title}
                    </motion.span>
                  </AnimatePresence>
                )}
                <div css={xw`flex items-center text-duck-600 text-2xl font-extrabold text-center uppercase`}>
                  <Icon {...skill} />
                </div>
              </motion.div>
            </motion.div>
          </SkillWrapper>
        )
      })}
    </OrbitStyled>
  )
}

const OrbitStyled = styled(motion.div)(xw`
  border border-dashed border-duck-100 border-opacity-25 rounded-full absolute inset-0 m-auto
`)

const SkillWrapper = styled.div([xw`
  flex justify-center absolute transform -translate-x-1/2 -translate-y-1/2
`, props => css`
  left:  ${(50 - 50 * Math.cos(-0.5 * Math.PI - 2 * (1 / props.length) * props.index * Math.PI)).toFixed(4)}%;
  top: ${(50 - 50 * Math.sin(-0.5 * Math.PI - 2 * (1 / props.length) * props.index * Math.PI)).toFixed(4)}%;
  .bubble{
    ${xw`relative flex justify-center items-center
      w-12 h-12 p-2 rounded-full
      bg-gray-platinum`}
  }
  .pop{
    ${xw`absolute inset-y-0 left-0
      capitalize text-duck-700 text-xs whitespace-pre
      w-auto h-full rounded-full
      flex items-center
      pr-2 py-1 bg-gray-platinum`}
  }
`])

export default Orbit
