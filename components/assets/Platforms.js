import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { openLinkInNewTabProps as newTab } from '@/lib/utlis'
import { Transformation } from 'cloudinary-react'
import xw from 'xwind'
import Image from '@/components/Image'

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
            image={logo}
            css={xw`w-24 my-2 inline-block`}
          >
            <Transformation width='100' crop='fit' />
          </Image>
          <FontAwesomeIcon icon='external-link-alt' size='xs' css={xw`inline-block ml-1`} />
        </a>
      ))}
    </>
  )
}

const mapStateToProps = (state) => ({
  platforms: state.api.us.platforms
})

export default connect(mapStateToProps, null)(Platforms)
