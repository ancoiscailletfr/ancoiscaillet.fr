import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import xw from 'xwind'
import { Transformation } from 'cloudinary-react'
import moment from 'moment'
import { css } from '@emotion/react'
import Box from '@/components/assets/Box'
import RichTextContainer from '@/components/RichTextContainer'
import ResumeButton from '@/components/assets/ResumeButton'
import Image from '@/components/Image'

const DragSlider = dynamic(() => import('@/components/assets/DragSlider'), { ssr: false })

const ME_BOX_COLOR = xw`bg-orange-400 border-orange-700 text-gray-platinum bg-opacity-75 border-opacity-50`

const Me = ({ us }) => {
  const {
    profilePicture, fullname, birthday, location, currentJob, shifting, whoami, hobbies, brief,
  } = us
  return (
    <section className='container' css={xw`bg-orange-400`}>
      <DragSlider
        sliderRatio={{ _: 3, md: { _: 5 / 3, step: 2 / 3 }, lg: 1 }}
        css={xw`grid gap-3 grid-cols-3 md[grid-cols-5 px-0] lg[grid-cols-4 grid-rows-3] xl:grid-cols-3`}
      >
        <Box css={[ME_BOX_COLOR, xw`md[col-span-2] lg[col-span-3 row-span-2 rounded-l-none] xl[col-span-2 rounded] justify-evenly`]}>
          <h1 css={xw`font-medium text-xl text-orange-900 mb-1.5 xl:mb-2.5`}>
            {'$> whoami'}
          </h1>
          <div css={xw`h-full`}>
            <RichTextContainer css={css`h2{${xw`text-orange-800`}} p{${xw`tracking-tighter xl:tracking-normal text-base`}}`}>
              {whoami}
            </RichTextContainer>
          </div>
        </Box>
        <Box css={[ME_BOX_COLOR,
          xw`items-center md[col-span-1] lg[col-start-4 col-end-4 row-span-2 rounded-r-none] xl[col-start-3 col-end-3 rounded] `]}
        >
          <Image
            css={xw`w-36 lg:w-24 xl:w-32 -mb-4 select-none text-right`}
            image={profilePicture}
          >
            <Transformation width='150' crop='fill' />
          </Image>
          <div css={xw`flex flex-col justify-around items-center h-5/6`}>
            <div css={xw`text-center leading-relaxed`}>
              <h2 css={xw`font-medium text-xl text-orange-900`}>{fullname}</h2>
              <span>
                {moment().diff(birthday, 'years')}
                {' '}
                ans
              </span>
              <h3 css={xw`font-medium text-lg mb-2.5 xl:mb-5`}>{currentJob}</h3>
              <h4 css={xw`font-medium mb-1 text-sm lg:text-xs xl:text-sm`}>
                <FontAwesomeIcon icon='map-pin' />
                {' '}
                {location}
              </h4>
              <h4 css={xw`text-sm lg:text-xs xl:text-sm`}>{shifting}</h4>
            </div>
            <p css={xw`text-base lg:text-sm text-center font-medium tracking-tight text-orange-900 whitespace-pre-line`}>
              {brief}
            </p>
            <ResumeButton />
          </div>
        </Box>
        <Box css={[ME_BOX_COLOR, xw`justify-evenly md[col-span-2] lg[row-start-3 row-end-3 col-span-full rounded-none] xl:rounded`]}>
          <h1 css={xw`font-medium text-xl lg:text-base text-orange-900 mb-1.5 xl:mb-2.5`}>
            Et quand je ne suis pas en train de coder...
          </h1>
          <div css={xw`h-full lg:h-auto`}>
            <RichTextContainer css={[
              css`h2{${xw`text-orange-800`}} p{${xw`text-base lg:text-sm`}} p:nth-of-type(2n){${xw`lg:text-orange-100`}}`,
              xw`flex flex-col justify-evenly lg[grid grid-cols-3 gap-x-6 lg:gap-x-8 xl:gap-x-12]`]}
            >
              {hobbies}
            </RichTextContainer>
          </div>
        </Box>
      </DragSlider>
    </section>
  )
}

const mapStateToProps = (state) => ({
  us: state.api.us,
})

export default connect(mapStateToProps, null)(Me)
