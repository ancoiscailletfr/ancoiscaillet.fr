import PropTypes from 'prop-types'
import React from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Image from 'cloudinary-react/lib/components/Image'
import { Transformation } from 'cloudinary-react'
import { connect } from 'react-redux'
import { openLinkInNewTabProps as newTab } from '@/lib/constants'

const PoweredBy = ({ poweredBy }) => {
  return (
    <PoweredByContainer>
      {poweredBy.sort((a, b) => a.order - b.order).map(({ id, url, logo }) => (
        <a key={id} href={url} aria-label={logo.alternativeText} {...newTab}>
          <Image
            width={logo.width} height={logo.height}
            publicId={logo.provider_metadata?.public_id}
            alt={logo.alternativeText}
            secure='true'
          >
            <Transformation width='200' fetchFormat='auto' crop='fit' quality='auto' dpr='2.0' />
          </Image>
        </a>
      ))}
    </PoweredByContainer>
  )
}

const PoweredByContainer = styled.div([xw`
  flex flex-wrap justify-center items-center
`, css`
  a {
    flex: 0 0 calc(33.33% - 1rem);
    ${xw`p-3 m-2`}
  }
`])

const mapStateToProps = (state) => ({
  poweredBy: state.api.poweredBy
})

PoweredBy.propTypes = {
  poweredBy: PropTypes.array
}

export default connect(mapStateToProps, null)(PoweredBy)
