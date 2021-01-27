import PropTypes from 'prop-types'
import React from 'react'
import Box from '@/components/assets/Box'
import SkillsSystem from '@/components/assets/SkillsSystem'
import AspectRatio from '@/components/utils/AspectRatio'
import dynamic from 'next/dynamic'
import RichTextContainer from '@/components/RichTextContainer'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import xw from 'xwind'
import { css } from '@emotion/react'

const DragSlider = dynamic(() => import('@/components/assets/DragSlider'), { ssr: false })

const Skills = ({ skills }) => {
  const { brief, ...orbits } = skills
  return (
    <section className='container' css={xw`bg-duck-400`}>
      <DragSlider childPerPage={{ _: 1, lg: 2 }} sliderRatio={{ _: 3, sm: 2, md: { _: 4 / 3, step: 1 / 3 }, lg: 1 }} css={xw`grid grid-cols-3 grid-rows-none sm:grid-cols-2 md:grid-cols-4 gap-3`}>
        <Box css={xw`bg-duck-400 border-duck-700 text-duck-100 bg-opacity-75 border-opacity-50 justify-around md:col-span-2`}>
          <RichTextContainer css={xw`flex flex-col justify-around`}>
            {brief}
          </RichTextContainer>
        </Box>
        <SkillsWrapper>
          <AspectRatio css={xw`relative w-4/5 md:w-5/6 mx-auto my-2`}>
            <SkillsSystem {...orbits} />
          </AspectRatio>
        </SkillsWrapper>
      </DragSlider>
    </section>
  )
}

const SkillsWrapper = styled.div([xw`
  col-span-2 sm:col-span-1 md:col-span-2
  w-full h-full 
  px-2 py-4 flex 
  flex-col items-center justify-center
`, css`max-height: 700px`])

const mapStateToProps = (state) => ({
  skills: state.api.skills
})

export default connect(mapStateToProps, null)(Skills)

Skills.propTypes = {
  skills: PropTypes.object
}
