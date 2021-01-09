import PropTypes from 'prop-types'
import React from 'react'
import xw from 'xwind'
import { css } from '@emotion/react'
import { Image, Transformation } from 'cloudinary-react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { openLinkInNewTabProps as newTab } from '@/lib/constants'
import Platforms from '@/components/assets/Platforms'
import styled from '@emotion/styled'
import RichTextContainer from '@/components/RichTextContainer'

const VisitCard = ({ us }) => {
  const { profilePicture, fullname, birthday, location, currentJob, shifting, brief, email, socialNetworks, whoami, hobbies } = us
  return (
    <div css={[xw`hidden xs:block hmd[block hsm:block lg:hidden] absolute overflow-scroll h-full w-full bg-gradient-to-tl from-darkblue-600 to-orange-500 grid-cols-3`,
      css`z-index: 10000`]}
    >
      <div css={xw`grid grid-cols-3 gap-y-6 text-gray-platinum mt-2 mx-5`}>
        <div css={xw`grid grid-rows-2 items-center`}>
          <div css={xw`flex justify-center`}>
            <Image
              css={xw`h-36 w-36 lg[w-24 h-24] xl[w-32 h-32] -mb-4 select-none text-right`}
              publicId={profilePicture.provider_metadata.public_id}
              alt={profilePicture.alternativeText} width={profilePicture.width} height={profilePicture.height}
              draggable={false}
            >
              <Transformation width='150' fetchFormat='auto' crop='fill' quality='auto' dpr='2.0' />
            </Image>
          </div>
          <div css={xw`flex flex-col justify-around items-center h-5/6`}>
            <div css={xw`text-center leading-relaxed`}>
              <h2 css={xw`font-medium text-xl text-orange-900`}>{fullname}</h2>
              <span>{moment().diff(birthday, 'years')} ans</span>
              <h3 css={xw`font-medium text-lg mb-2.5 xl:mb-5`}>{currentJob}</h3>
              <h4 css={xw`font-medium mb-1 text-sm lg:text-xs xl:text-sm`}><FontAwesomeIcon icon='map-pin' /> {location}</h4>
              <h4 css={xw`text-sm lg:text-xs xl:text-sm`}>{shifting}</h4>
            </div>
          </div>
        </div>
        <div css={xw`col-span-2 grid grid-rows-3 items-end`}>
          <p css={xw`text-base text-center font-medium tracking-tight whitespace-pre-line`}>
            {brief}
          </p>
          <div css={xw`grid grid-rows-2 items-center gap-4`}>
            <form css={xw`flex justify-center`} action={`mailto:${email}`}>
              <ButtonStyled css={xw`lowercase bg-darkblue-600`} type='submit'>{email}</ButtonStyled>
            </form>
            <div css={xw`flex justify-center`}>
              <ButtonStyled
                {...newTab}
                href='CV_François_Caillet_2.pdf'
                draggable={false}
              >
                Mon CV <FontAwesomeIcon icon='file-pdf' css={xw`ml-1 mb-0.5`} size='xs' />
              </ButtonStyled>
            </div>
          </div>
          <div css={xw`grid grid-cols-2 gap-6 items-center`}>
            <div css={xw`flex flex-row w-full justify-evenly`}>
              {socialNetworks.map(({ id, title, url, icon }, index) => (
                <a
                  key={id}
                  aria-label={title} href={url} {...newTab}
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
    </div>
  )
}

const ButtonStyled = styled.button(xw`
  leading-5 px-2 py-0.5 
  rounded-md
  uppercase font-medium tracking-wide 
  bg-darkblue-600 bg-opacity-75 hover:bg-darkblue-500
`)

const mapStateToProps = (state) => ({
  us: state.api.us
})

export default connect(mapStateToProps, null)(VisitCard)

VisitCard.propTypes = {
  us: PropTypes.object
}
