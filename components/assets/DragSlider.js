import { Children, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { AnimateSharedLayout, motion } from 'framer-motion'
import xw from 'xwind'
import { css } from '@emotion/react'
import { select } from '@/lib/utlis'
import useWindowDimension from '@/lib/useWindowDimension'

const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}
/**
 * create a slider when it's necessary
 * especially for mobile and tablet devices
 * @param children list of child, each child could be a slide
 * @param childPerPage number of child per page according to viewport width, e.g. childPerPage={{ _: 1, md: 2 }}
 * @param sliderRatio slider size multiplier  e.g. {{ _: 2, md: 1 }},
 *        or with custom step e.g. {{ _: 3, md: { _: 5 / 3, step: 2 / 3 }, lg: 1 }}
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DragSlider = ({ children, childPerPage = { _: 1, md: 2, lg: 3 }, sliderRatio = { _: 3, md: 2, lg: 1 }, ...props }) => {
  const [[pageIndex], setPageIndex] = useState([0])
  const { width } = useWindowDimension()
  const itemPerPage = select(childPerPage)
  const carouselRatio = select(sliderRatio)
  const multiplier = carouselRatio._ ?? carouselRatio
  const step = carouselRatio.step ?? 1
  const nbPages = Math.ceil(Children.count(children) / itemPerPage)

  /**
   * update pageIndex
   * @param newDirection page jump
   */
  const paginate = (newDirection) => {
    const validatedPageIndex = Math.min(nbPages - 1, Math.max(pageIndex + newDirection, 0))
    setPageIndex([validatedPageIndex])
  }

  /**
   * handle swipe movement to change current page
   * @returns {function(*, {offset: *, velocity: *}): void}
   */
  const handleDragEnd = () => (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)
    // mark - prevent annoying swipe during scroll
    if (Math.abs(swipe) > 30000) {
      if (swipe < -swipeConfidenceThreshold) {
        paginate(1)
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1)
      }
    }
  }

  useEffect(() => {
    /* hack - back to first page on children change */
    setPageIndex([0])
  }, [children, nbPages])

  return (
    <div css={xw`relative sm:block`}>
      <Slider
        pagesNb={nbPages}
        css={nbPages > 1 && xw`pb-5`}
      >
        <AnimateSharedLayout>
          <SliderContainer
            ratio={multiplier}
            layout
            drag={nbPages > 1 && 'x'}
            style={{ x: -width * step * pageIndex }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1.3}
            onDragEnd={handleDragEnd()}
            {...props}
          >
            {children}
          </SliderContainer>
        </AnimateSharedLayout>
      </Slider>
      {nbPages > 1 && (
        <DotWrapper>
          <ul>
            {Array.from({ length: nbPages }, (_, i) => (
              <li key={i} onClick={() => paginate(i - pageIndex)}>
                <motion.span
                  variants={dot}
                  initial='inactive'
                  animate={pageIndex === i ? 'active' : 'inactive'}
                />
              </li>
            )
            )}
          </ul>
        </DotWrapper>
      )}
    </div>
  )
}

const Slider = styled(motion.div)([xw`
  relative w-full overflow-hidden z-10
`, prop => prop.pagesNb > 1 ? css` cursor:grab` : css` cursor:default`
])

const SliderContainer = styled(motion.div)([xw`
  flex relative top-0 px-1.5
`, props => css`width: ${100 * props.ratio}%;`])

const DotWrapper = styled.div([xw`
  absolute bottom-0 w-full text-center -mb-3 z-10
`, css`
  ul {
    ${xw`inline-block cursor-default select-none`}
  }
  li {
    ${xw`relative block cursor-pointer 
      mx-2 w-4 h-4 rounded-full 
      border-2 border-solid border-gray-platinum`};
    float: left;
  }
  span {
    ${xw`absolute top-0 left-0
      bg-gray-platinum w-full h-full 
      outline-none rounded-full focus:outline-none`}
  }
`])

const dot = {
  active: {
    scale: 0.75,
    opacity: 1
  },
  inactive: {
    scale: 0.75,
    opacity: 0
  }
}

export default DragSlider
