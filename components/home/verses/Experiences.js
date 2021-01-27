/* eslint-disable camelcase */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Badges from '@/components/assets/Badges'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { Transformation } from 'cloudinary-react'
import styled from '@emotion/styled'
import RichTextContainer from '@/components/RichTextContainer'
import moment from 'moment'
import xw from 'xwind'
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/components/assets/Button'
import Image from '@/components/Image'

const DragSlider = dynamic(() => import('@/components/assets/DragSlider'), { ssr: false })

const Experiences = ({ experiences }) => {
  const [active, setActive] = useState(1)
  const toggleOpen = (id) => setActive(prevId => prevId === id ? null : id)
  const visibleExperience = experiences.find(exp => exp.id === active)
  const sortedExperiences = experiences.sort((a, b) => moment(b.beginning).diff(moment(a.beginning)))
  return (
    <section className='container' css={xw`bg-grape-400`}>
      <DragSlider childPerPage={{ _: 1, md: 2 }} sliderRatio={{ _: 2, md: 1 }} css={xw`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3`}>
        <Experience key={visibleExperience.id} css={xw`col-span-1 md:col-span-3`} {...visibleExperience} visible />
        <div css={xw`w-full h-full flex flex-col justify-center sm:justify-evenly col-span-1 lg:col-span-2`}>
          {sortedExperiences.filter(({ id }) => id !== active).map(experience => (
            <Experience key={experience.id} {...experience} toggle={() => toggleOpen(experience.id)} />
          ))}
        </div>
      </DragSlider>
    </section>
  )
}

const Experience = ({ title, description, badges, logo, beginning, ending, toggle, visible, ...props }) => {
  const [selected, setSelected] = useState(false)
  const direction = visible ? -1 : 1
  return (
    <ExperienceBox
      custom={direction}
      visible={visible}
      onClick={toggle}
      style={{ boxShadow: 'inset 0.05rem 0.25rem 0 rgba(255,255,255,0.125)' }}
      whileHover={!visible && 'hover'}
      whileTap={!visible && 'tap'}
      onTapStart={() => setSelected(true)}
      onTouchEnd={() => setSelected(false)}
      onHoverStart={() => setSelected(true)}
      onHoverEnd={() => setSelected(false)}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      variants={experience}
      {...props}
    >
      <div css={[visible ? xw`px-4 border-b-4 border-grape-600 border-opacity-40` : xw`md:grid-cols-1`, xw`py-4 select-none grid grid-cols-4 lg:grid-cols-6 items-center z-10`]}>
        <div css={[xw`flex flex-row lg:col-span-2`, !visible && xw`justify-start md:justify-center lg:justify-start`]}>
          {logo.map((img, i) => (
            <LogoContainer
              visible={visible}
              key={i}
              css={(i === 0 && logo.length > 1) && xw`-mr-8 md:-mr-4`}
              initial={{ '--tw-bg-opacity': 0.75 }}
              whileHover={{ scale: 1.2, zIndex: 10, '--tw-bg-opacity': 1 }}
              whileTap={{ scale: 1.2, zIndex: 10, '--tw-bg-opacity': 1 }}
            >
              <Image image={img} css={xw`w-auto h-auto`}>
                <Transformation width='80' height='80' crop='lpad' />
              </Image>
            </LogoContainer>
          )
          )}
        </div>
        <div css={[xw`col-span-3 lg:col-span-4 relative flex flex-col justify-center ml-2 md:ml-4`, !visible && xw`md:hidden lg:flex`]}>
          <h1 css={[xw`text-base text-right font-extrabold tracking-wide leading-normal text-grape-900 uppercase`,
            !visible && [xw`truncate`, css`width: calc(100%)`]]}
          >
            {title}
          </h1>
          <div css={[xw`grid grid-cols-3 gap-x-2 items-center mt-1`, visible && xw`grid-cols-1 grid-rows-2`,
            badges.length === 0 && xw`grid-rows-1`]}
          >
            <Badges
              badges={badges}
              css={[xw`col-span-2 flex flex-row flex-wrap justify-end`, visible && xw`w-full order-2`]}
            />
            <span
              css={[xw`text-xs tracking-tighter text-right font-medium text-grape-200 flex flex-col`,
                visible && xw`w-full order-1`]}
            >
              {moment(beginning).format('MM/YYYY')} - {ending ? moment(ending).format('MM/YYYY') : 'En cours'}
              <span css={[xw`ml-1 text-grape-800 font-bold`, css`font-size: 0.5rem;`]}>
                {`(${moment.duration(moment(ending ?? moment.now())
                    .diff(beginning, 'years', true), 'years').humanize()})`}
              </span>
            </span>
          </div>
        </div>
      </div>
      {visible
        ? (
          <ExperienceDescription>
            {description}
          </ExperienceDescription>
          )
        : (
          <More selected={selected} title='En savoir plus' aria-label='En savoir plus'>
            <FontAwesomeIcon icon='angle-right' size='2x' />
          </More>
          )}
    </ExperienceBox>
  )
}

const experience = {
  hover: {
    scale: [1, 0.95, 0.975]
  },
  tap: {
    scale: [1, 0.95]
  },
  enter: (direction) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0
  })
}

const ExperienceDescription = styled(RichTextContainer)([xw`
  text-gray-platinum px-4 bg-grape-700 bg-opacity-30 pt-3
`,
css`
  h3 {${xw`text-grape-900 font-bold`}}
  li, blockquote {${xw`text-grape-900`}}
`])

const More = styled(Button)([xw`
  absolute w-8
  bg-grape-500 bg-opacity-40 hover[bg-opacity-50 bg-grape-600] active[bg-opacity-50 bg-grape-600]
  rounded-none rounded-r-md border-l border-grape-600 border-opacity-40
  right-0 inset-y-0
  text-grape-800 hover:text-grape-900
`, props => props.selected && xw`bg-opacity-50 bg-grape-600 text-grape-900`])

const LogoContainer = styled(motion.div)([xw`
  w-24
  shadow bg-grape-100 bg-opacity-75
  rounded-full
  overflow-hidden flex items-center
  select-none
`, props => props.visible && xw``])

const ExperienceBox = styled(motion.div)([xw`
  relative rounded-md
  bg-grape-400 bg-opacity-75
  mb-6 sm:mb-3
  flex flex-col
  border border-solid border-grape-700 border-opacity-50
`, props => props.visible ? xw`h-full cursor-default` : xw`h-auto cursor-pointer pr-12 pl-4`])

Experience.propTypes = {
  badges: PropTypes.array,
  beginning: PropTypes.any,
  description: PropTypes.string,
  ending: PropTypes.any,
  logo: PropTypes.array,
  open: PropTypes.bool,
  title: PropTypes.string,
  toggle: PropTypes.func,
  visible: PropTypes.bool
}

Experience.defaultProps = {
  open: false
}

Experiences.propTypes = {
  experiences: PropTypes.array
}

const mapStateToProps = (state) => ({
  experiences: state.api.experiences
})

export default connect(mapStateToProps, null)(Experiences)
