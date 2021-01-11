import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { openLinkInNewTabProps as newTab } from '@/lib/constants'
import { Image, Transformation } from 'cloudinary-react'
import xw from 'xwind'

/**
 * freelance platform
 * @param className
 * @param platforms
 * @returns {JSX.Element}
 * @constructor
 */
const Platforms = ({ platforms }) => {
  return (
    <>
      {platforms.map(({ id, url, logo }) => (
        <a key={id} href={url} aria-label={logo?.alternativeText} {...newTab}>
          <Image
            width={logo.width} height={logo.height}
            publicId={logo?.provider_metadata.public_id}
            alt={logo?.alternativeText}
            secure='true'
            loading='lazy'
            css={xw`w-24 my-2 inline-block`}
          >
            <Transformation width='100' fetchFormat='auto' crop='fit' quality='auto' dpr='2.0' />
          </Image>
          <FontAwesomeIcon icon='external-link-alt' size='xs' css={xw`inline-block ml-1`} />
        </a>
      ))}
    </>
  )
}

Platforms.propTypes = {
  className: PropTypes.string,
  platforms: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  platforms: state.api.us.platforms
})

export default connect(mapStateToProps, null)(Platforms)
