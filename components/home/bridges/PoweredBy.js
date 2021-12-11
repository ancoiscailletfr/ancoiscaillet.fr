import xw from 'xwind'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Transformation } from 'cloudinary-react'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer'
import { openLinkInNewTabProps as newTab, random } from '@/lib/utlis'
import Image from '@/components/Image'

/**
 * Main libraries logos list used
 * @param poweredBy a list of object from store
 * @returns {JSX.Element}
 * @constructor
 */
const PoweredBy = ({ poweredBy }) => (
  <PoweredByContainer>
    {poweredBy.sort((a, b) => a.order - b.order).map(({ id, url, logo }) => (
      <a key={id} href={url} aria-label={logo.alternativeText} {...newTab}>
        <InView triggerOnce>
          {({ inView, ref }) => (
            <div css={xw`flex px-3 py-1.5 md[px-6 py-3] items-center h-20 sm:h-28 md:h-36`} ref={ref}>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={inView && { opacity: 1 }}
                transition={{ delay: random(0.1, 1), duration: 0.5 }}
              >
                <Image
                  image={logo}
                >
                  <Transformation width='200' crop='fit' />
                </Image>
              </motion.div>
            </div>
          )}
        </InView>
      </a>
    ))}
  </PoweredByContainer>
)

const PoweredByContainer = styled.div([xw`
  flex flex-wrap justify-center items-center
`, css`
  a {
    ${xw`w-1/3 my-0`}
  }
`])

const mapStateToProps = (state) => ({
  poweredBy: state.api.poweredBy,
})

export default connect(mapStateToProps, null)(PoweredBy)
