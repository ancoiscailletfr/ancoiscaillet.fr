import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useCycle } from 'framer-motion'
import Platforms from '@/components/assets/Platforms'
import { openLinkInNewTabProps as newTab } from '@/lib/constants'
import { Image, Transformation } from 'cloudinary-react'
import xw from 'xwind'
import AvailableStatus from '@/components/assets/AvailableStatus'
import { css } from '@emotion/react'

/**
 * contact infos component
 * @returns {JSX.Element}
 * @constructor
 */
const Infos = ({ us }) => {
  const { fullname, location, email, profilePicture } = us
  const linkedin = us.socialNetworks.find(social => social.title === 'Linkedin')
  const [copied, toggleCopied] = useCycle(false, true)
  const handleClickOnCopy = () => {
    toggleCopied()
    setTimeout(() => toggleCopied(), 2000)
  }
  return (
    <InfosContainer>
      <div css={xw`flex flex-col items-center`}>
        <Image
          width={profilePicture.width} height={profilePicture.height}
          loading='lazy'
          publicId={profilePicture.provider_metadata.public_id}
          alt={profilePicture.alternativeText}
          css={xw`w-32`}
          secure='true'
        >
          <Transformation width='100' fetchFormat='auto' radius='max' crop='fill' gravity='face' quality='auto' dpr='2.0' />
        </Image>
        <h3 css={xw`font-bold text-base mt-1.5`}>{fullname}</h3>
        <h4 css={xw`font-light text-sm mb-5`}>
          <AvailableStatus />
        </h4>
      </div>
      <div css={xw`flex justify-center`}>
        <div css={xw`flex flex-col items-start text-sm leading-6 mb-4`}>
          <p>
            <FontAwesomeIcon icon='map-marked-alt' />
            {`\t${location}`}
          </p>
          <div>
            <a href={`mailto:${email}`}>
              <FontAwesomeIcon icon='envelope' />
              {`\t${email}`}
            </a>
            <CopyToClipboard text={email}>
              <CopyButton onClick={handleClickOnCopy}>
                {copied
                  ? <span css={xw`px-5`}><FontAwesomeIcon icon='check-circle' /></span>
                  : 'Copier'}
              </CopyButton>
            </CopyToClipboard>
          </div>
          {linkedin && (
            <a css={xw`capitalize`} href={linkedin.url} {...newTab}>
              <FontAwesomeIcon icon={['fab', linkedin.icon]} />
              {`\t${linkedin.title}\t`}
              <FontAwesomeIcon
                icon='external-link-alt' size='xs'
                css={xw`relative bottom-0.5`}
              />
            </a>
          )}
        </div>
      </div>
      <div css={xw`flex flex-wrap flex-row w-full justify-around`}>
        <Platforms />
      </div>
    </InfosContainer>
  )
}

const InfosContainer = styled.div([xw`
  w-1/2 lg:w-1/3 h-full p-2
  lg[border-r border-solid border-gray-platinum border-opacity-75]
  flex flex-col justify-around
`, css`
  a {
    ${xw`border-b border-dashed hover:border-darkblue-800`}
  }
`])

const CopyButton = styled.button(xw`
  transform scale-75 
  py-0.5 px-1 rounded
  text-xs text-gray-platinum
  bg-orange-500 hover:bg-orange-700
  focus[outline-none ring]
`)

const mapStateToProps = (state) => ({
  us: state.api.us
})

Infos.propTypes = {
  us: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(Infos)
