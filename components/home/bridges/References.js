import { useEffect, useState } from 'react'
import { Transformation } from 'cloudinary-react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useSpring } from 'framer-motion'
import styled from '@emotion/styled'
import { wrap } from '@popmotion/popcorn'
import xw from 'xwind'
import { css } from '@emotion/react'
import moment from 'moment'
import { ContentPlaceholder, Word } from '@/components/assets/ContentPlaceholder'
import { openLinkInNewTabProps as newTab } from '@/lib/utlis'
import RichTextContainer from '@/components/RichTextContainer'
import Image from '@/components/Image'

const RefsContainer = styled.div([xw`
  relative w-full select-none max-w-screen-sm mx-auto my-24 h-96 md:h-80
`, css`
  perspective: 1000px;
`])

const Avatar = styled.div(xw`
  w-12 h-12 md[w-14 h-14]
  mr-6
  flex justify-center items-center 
  rounded-full shadow overflow-hidden bg-gray-300
`)

const Content = styled.div(xw`
  flex flex-col 
  px-2
  text-gray-600
`)

const AuthorCompany = styled.a(xw`
  font-light text-sm text-darkblue-500 
  cursor-pointer 
  border-b border-dashed
  hover[text-darkblue-600 border-darkblue-600]
`)

const RefCard = styled(motion.div)(xw`
  absolute h-96 md:h-80 w-full max-w-screen-sm
  py-2 md:py-4
  rounded-md 
  bg-gray-platinum shadow-md
  flex justify-start
`)

const refCard = {
  front: {
    opacity: 1,
  },
  behind: {
    opacity: 0.4,
  },
}

const References = ({ references }) => {
  const [degree, setDegree] = useState(0)
  const [active, setActive] = useState(0)
  const rotateX = useSpring(0)
  const step = 360 / references.length

  const rotate = (direction) => {
    setDegree((v) => v + step * direction)
    setActive((v) => v - direction)
  }

  useEffect(() => {
    rotateX.set(degree)
  }, [degree])

  const sortedRefs = references.sort((a, b) => moment(b.updatedAt).diff(moment(a.updatedAt)))

  return (
    <RefsContainer>
      <motion.div
        css={xw`absolute h-full w-full`}
        style={{ transformStyle: 'preserve-3d', rotateX, z: -250 }}
        transition={{
          type: 'spring', stiffness: 300, damping: 30,
        }}
      >
        {sortedRefs.map(({ id, ...props }, i) => (
          <Reference
            key={id}
            active={wrap(0, references.length, active) === i}
            {...props}
            degree={degree}
            rotateX={i * step}
            next={() => rotate(1)}
            previous={() => rotate(-1)}
          />
        ))}
      </motion.div>
    </RefsContainer>
  )
}

const Reference = ({
  active, avatar, author, description, company, companyUrl, rotateX, next, previous,
}) => (
  <RefCard
    variants={refCard}
    style={{ opacity: 0.4, transform: `rotateX(${rotateX}deg) translateZ(250px)` }}
    animate={active ? 'front' : 'behind'}
  >
    <div css={xw`flex flex-col justify-between`}>
      <Content>
        <div css={xw`flex flex-row items-center mb-1.5 md:mb-0 px-1.5`}>
          <Avatar>
            {avatar && (
              <Image
                image={avatar}
              >
                <Transformation width='60' crop='fit' />
              </Image>
            )}
          </Avatar>
          <span css={xw`text-left font-bold text-sm md:text-base text-gray-700 w-4/5`}>
            {
          author
            ? (
              <>
                {`${author}, `}
                <AuthorCompany {...newTab} href={companyUrl}>
                  {company}
                  <FontAwesomeIcon icon='external-link-alt' size='xs' css={xw`relative bottom-0.5 ml-1`} />
                </AuthorCompany>
              </>
            )
            : (
              <div css={[xw`-mb-4 mt-3`, css`.word{${xw`bg-gray-700 h-4`}`]}>
                <Word width={85} />
                <Word width={65} />
              </div>
            )
        }
          </span>
        </div>
        {
        description
          ? (
            <RichTextContainer css={xw`h-72 py-1.5 md:h-48 md:pl-20 overflow-y-auto pr-2 md:pr-4`}>
              {description}
            </RichTextContainer>
          )
          : <ContentPlaceholder nbParagraph={2} css={[xw`md:pl-20`, css`.word{${xw`bg-gray-400`}`]} />
      }
      </Content>
      <div css={[xw`flex flex-row justify-center w-full text-sm mt-2 md:mt-4`,
        css`button{${xw`text-sm px-4 focus:outline-none text-gray-700 hover:text-gray-900`}}`]}
      >
        <button type='button' onClick={previous}>{'< Precedent'}</button>
        <button type='button' onClick={next}>{'Suivant >'}</button>
      </div>
    </div>
  </RefCard>
)

const mapStateToProps = (state) => ({
  references: state.api.references,
})

export default connect(mapStateToProps, null)(References)
