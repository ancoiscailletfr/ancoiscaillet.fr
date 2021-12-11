import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { Transformation } from 'cloudinary-react'
import moment from 'moment'
import xw from 'xwind'
import { css } from '@emotion/react'
import RichTextContainer from '@/components/RichTextContainer'
import FlipCard from '@/components/assets/FlipCard'
import Box from '@/components/assets/Box'
import Image from '@/components/Image'

const DragSlider = dynamic(() => import('@/components/assets/DragSlider'), { ssr: false })

const DIPLOMA_BOX = xw`bg-kaki-400 border-kaki-700 text-kaki-100 bg-opacity-75 border-opacity-50 justify-between`

const Diplomas = ({ diplomas }) => {
  const sortedDiplomas = diplomas.sort((a, b) => moment(b.beginning).diff(moment(a.beginning)))
  return (
    <section className='container' css={xw`bg-kaki-400`}>
      <DragSlider childPerPage={{ _: 1, md: 2 }} sliderRatio={{ _: 2, md: 1 }} css={xw`z-20 grid grid-cols-2 md[grid-cols-1 grid-rows-2] gap-6 lg:gap-12`}>
        <div css={xw`grid grid-rows-2 md[grid-rows-1 grid-cols-2] gap-6 lg:gap-12`}>
          {sortedDiplomas.slice(0, 2).map(({ id, ...props }) => <Diploma key={id} {...props} />)}
        </div>
        <div css={xw`grid grid-rows-2 md[grid-rows-1 grid-cols-2] gap-6 lg:gap-12`}>
          {sortedDiplomas.slice(2, 4).map(({ id, ...props }) => <Diploma key={id} {...props} />)}
        </div>
      </DragSlider>
    </section>
  )
}

const Diploma = ({
  title, fullTitle, school, beginning, ending, description, stamps,
}) => {
  return (
    <FlipCard>
      <Box
        css={[DIPLOMA_BOX, css`min-height: 25vh`]}
        style={{ backgroundImage: 'url(/images/diploma_bg.png)' }}
      >
        <h5 css={[xw`uppercase text-center text-sm transform scale-75 text-kaki-900`, css`letter-spacing: 0.5rem`]}>
          République Française
        </h5>
        <h1 css={xw`uppercase text-center text-2xl font-extrabold tracking-wide`}>{title}</h1>
        {fullTitle && (
          <h6 css={xw`overflow-ellipsis overflow-hidden uppercase text-center text-xs text-kaki-900 py-0.5 px-1 md:px-3 lg:px-6`}>
            {fullTitle}
          </h6>
        )}
        <div css={xw`flex flex-row justify-between mt-1`}>
          <h2 css={xw`uppercase text-sm font-extrabold`}>{school}</h2>
          <span css={xw`text-sm font-light`}>
            {`${moment(beginning).format('YYYY')}-${moment(ending).format('YYYY')}`}
          </span>
        </div>
        <div css={xw`h-20 flex flex-row justify-between items-center`}>
          {stamps.map((stamp) => (
            <Image
              key={stamp?.id}
              image={stamp}
              css={xw`block w-auto h-auto max-h-full max-w-sm`}
            >
              <Transformation width='80' height='80' opacity='50' crop='fit' />
            </Image>
          ))}
        </div>
      </Box>
      <Box css={[DIPLOMA_BOX, xw`bg-kaki-500 bg-opacity-90`]}>
        <RichTextContainer css={[xw`text-gray-platinum flex flex-col justify-evenly`, css`p{${xw`text-xs lg:text-sm mb-1.5`}}`]}>
          {description}
        </RichTextContainer>
      </Box>
    </FlipCard>
  )
}

const mapStateToProps = (state) => ({
  diplomas: state.api.diplomas.sort((r, l) => r.id - l.id),
})

export default connect(mapStateToProps, null)(Diplomas)
