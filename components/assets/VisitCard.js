import xw from 'xwind'
import { Transformation } from 'cloudinary-react'
import moment from 'moment'
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { openLinkInNewTabProps as newTab } from '@/lib/utlis'
import Platforms from '@/components/assets/Platforms'
import RichTextContainer from '@/components/RichTextContainer'
import Button from '@/components/assets/Button'
import ResumeButton from '@/components/assets/ResumeButton'
import Image from '@/components/Image'

/**
 * this is my "visit card", primary infos and contact
 * mark- visit card is displayed on very small screen or on mobile horizontal direction
 * @param us
 * @returns {JSX.Element}
 * @constructor
 */
const VisitCard = ({ us }) => {
  const {
    profilePicture, fullname, birthday, location,
    currentJob, shifting, brief, email, socialNetworks, whoami, hobbies,
  } = us
  return (
    <VisitCardWrapper>
      <div css={xw`grid grid-cols-3 gap-y-6 text-gray-platinum mt-2 mx-5`}>
        <div css={xw`grid grid-rows-2 items-center`}>
          <Image
            image={profilePicture}
            css={xw`w-36 -mb-4 select-none text-right mx-auto`}
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
              <h3 css={xw`font-medium text-lg mb-2.5`}>{currentJob}</h3>
              <h4 css={xw`font-medium mb-1 text-sm`}>
                <FontAwesomeIcon icon='map-pin' />
                {' '}
                {location}
              </h4>
              <h4 css={xw`text-sm`}>{shifting}</h4>
            </div>
          </div>
        </div>
        <div css={xw`col-span-2 grid grid-rows-3 items-end`}>
          <p css={xw`text-base text-center font-medium tracking-tight whitespace-pre-line`}>
            {brief}
          </p>
          <div css={xw`grid grid-rows-2 items-center gap-4`}>
            <div css={xw`flex justify-center`}>
              <Button as='a' href={`mailto:${email}`} css={xw`lowercase`}>{email}</Button>
            </div>
            <div css={xw`flex justify-center`}>
              <ResumeButton />
            </div>
          </div>
          <div css={xw`grid grid-cols-2 gap-6 items-center`}>
            <div css={xw`flex flex-row w-full justify-evenly`}>
              {socialNetworks.map(({
                id, title, url, icon,
              }) => (
                <a
                  key={id}
                  aria-label={title}
                  href={url}
                  {...newTab}
                >
                  <FontAwesomeIcon icon={['fab', icon]} size='lg' />
                </a>
              ))}
            </div>
            <div css={xw`flex flex-row w-full justify-between`}><Platforms /></div>
          </div>
        </div>
        <div css={xw`col-span-3 px-4 mt-6`}>
          <h1 css={xw`font-black text-2xl text-center text-orange-900 mb-3`}>
            whoami
          </h1>
          <RichTextContainer css={css`p{${xw`text-base`}}`}>
            {whoami}
          </RichTextContainer>
        </div>
        <div css={xw`col-span-3 px-4`}>
          <h1 css={xw`font-black text-xl text-orange-900 mb-3`}>
            Et quand je ne suis pas en train de coder...
          </h1>
          <RichTextContainer css={css`p{${xw`text-base`}}`}>
            {hobbies}
          </RichTextContainer>
        </div>
      </div>
    </VisitCardWrapper>
  )
}

const VisitCardWrapper = styled.div([xw`
  inset-0 hidden xs:block hmd[block hsm:block lg:hidden] absolute 
  overflow-scroll h-full w-full 
  bg-gradient-to-tl from-darkblue-600 to-orange-500`,
css`z-index: 10000`])

const mapStateToProps = (state) => ({
  us: state.api.us,
})

export default connect(mapStateToProps, null)(VisitCard)
