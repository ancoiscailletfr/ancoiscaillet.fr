import React, { useState } from 'react'
import { AnimatePresence, motion, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import xw from 'xwind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Socials from '@/components/assets/Socials'
import { openLinkInNewTabProps as newTab } from '@/lib/constants'
import { css } from '@emotion/react'
import { Image, Transformation } from 'cloudinary-react'

/**
 * Main footer
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
  const { scrollYProgress } = useViewportScroll()
  const [showThanksMsg, setShowThanksMsg] = useState(false)
  const toggleOnScroll = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], ['0%', '100%', '100%', '0%'])
  const toggleOnScrollWrapper = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 300, 300, 0])
  const transformBoxShadowOnScroll = useTransform(scrollYProgress, [0, 0.05], ['1px -25px 50px -12px rgba(0,0,0,0.4)', '1px 0px 3px 0px rgba(0,0,0,0.2)'])

  scrollYProgress.onChange((p) => {
    p >= 0.94 ? setShowThanksMsg(true) : setShowThanksMsg(false)
  })

  return (
    <div>
      <FooterBg
        style={{ y: toggleOnScroll, boxShadow: transformBoxShadowOnScroll }}
      />
      <FooterWrapper style={{ y: toggleOnScrollWrapper }}>
        <div css={xw`relative h-full w-full`}>
          <FooterContainer>
            <AnimatePresence>
              {showThanksMsg && (
                <MessageStyled variants={message} initial='hide' animate='view' exit='hide'>
                  <Image css={xw`w-24 h-24 select-none text-right`} publicId='emoji2_sticker_b38b0af9da.png' alt='emoji François Caillet' width={421} height={444}>
                    <Transformation width='100' fetchFormat='auto' crop='fill' quality='auto' dpr='2.0' />
                  </Image>
                  <span>
                    Merci d'avoir parcouru mon site ! J'espère qu'il vous a plu 😁
                  </span>
                </MessageStyled>
              )}
            </AnimatePresence>
            <Box>
              <span css={xw`text-gray-700 font-light`}>
                <FontAwesomeIcon icon={['far', 'copyright']} />
                {' Copyright 2020, François Caillet - Tous droits réservés'}
              </span>
              <span>
                {'Développé avec ❤️️ & ☕️☕️. '}
                <span css={xw`hidden md:inline-block`}>
                  {'Réalisé avec '}
                  <a aria-label='nextjs' href='https://nextjs.org/' {...newTab}>Next.js</a>
                  {' & hébergé par '}
                  <a aria-label='vercel' href='https://vercel.com/' {...newTab}>Vercel</a>
                  .
                </span>
              </span>
            </Box>
            <Socials />
          </FooterContainer>
        </div>
      </FooterWrapper>
    </div>
  )
}

const MessageStyled = styled(motion.div)([xw`
  flex mx-auto items-center mb-10
`, css`
  img{
    ${xw``}
  }
  span{
    ${xw`relative rounded-3xl py-2 px-3 break-words bg-gray-200 text-gray-platinum text-sm md:text-base`}
  }
  
  span::before, span::after{
    ${xw`-bottom-0.5 h-4 absolute`}
    content: "";
  }

  span:before {
    border-bottom-right-radius: 0.8rem 0.7rem;
    border-left: 1rem solid #a3a3a3;
    left: -0.35rem;
    transform: translate(0, -0.1rem);
  }

  span::after {
    ${xw`bg-gray-platinum`};
    border-bottom-right-radius: 0.5rem;
    left: 20px;
    transform: translate(-30px, -2px);
    width: 10px;
  }
  
`
])

const message = {
  view: {
    opacity: 1,
    y: 0,
    transition: {
      y: {
        type: 'spring',
        stiffness: 300
      }
    }
  },
  hide: {
    opacity: 0,
    y: -100,
    transition: {
      opacity: {
        duration: 0.1
      }
    }
  }
}

const FooterBg = styled(motion.div)(xw`
    fixed z-20 bottom-0
    h-5/12 md:h-1/3 w-full hmd:h-1/2 
    bg-gray-platinum
`)

const FooterWrapper = styled(motion.footer)(xw`
  fixed z-40 bottom-0
  h-1/12 w-full
  mb-1 py-4 px-2 md:px-4
`)

const FooterContainer = styled.div([xw`
  absolute bottom-0
  w-full
  flex flex-wrap justify-between items-center
  text-xs tracking-tighter
`, css`
  a {
    ${xw`font-bold underline hover[no-underline text-gray-500]
      cursor-pointer`}
  }
`])

const Box = styled.div(xw`
  flex flex-wrap flex-col
  w-5/6 md:w-9/12
  pr-1
  leading-5 md:leading-6 text-gray-800
`)

export default Footer
